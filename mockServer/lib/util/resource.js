module.exports = Resource;

var fs = require("fs");
var path = require("path");
var express =require("express");
var _ = require("lodash");

var glob = require("glob");

// stores all Directory or File need to navigate
function Resource(basePath) {
	this.list = [];
}

Resource.newDirectory = function(targetPath) {
	return new Resource.Directory(path.dirname(targetPath), path.basename(targetPath));
}

Resource.newFile = function(targetPath) {
	return new Resource.File(path.dirname(targetPath), path.basename(targetPath));
}

Resource.prototype.append = function(item) {
	this.list.push(item);
}

//@TODO
Resource.prototype.resolve = function(targetPath, filter) {

}

// iterator all items in the directory
Resource.prototype.each = function(f) {
	return _.each(this.list, function(item){
		f(item.path, item.basePath, item.fileName);
	});
}

// input item as callback function f's arguments
Resource.prototype.eachItem = function(f) {
	return _.each(this.list, function(item){
		f(item);
	});
}

// store Directory
Resource.Directory = function(basePath, fileName) {
	this.basePath = basePath;
	this.fileName = fileName;
	this.path = path.resolve(basePath, fileName);
	this.isFile = false;
	this.isDirectory = true;
}

Resource.Directory.prototype.all = function(filter) {
	var items = fs.readdirSync(this.path);
	var resource = new Resource();

	for(var d in items){
		var itemName = items[d];
		var itemPath = path.resolve(this.path, itemName);
		var itemStat = fs.statSync(itemPath);

		if(filter && !filter(this.path, itemName, itemStat)){ continue; }

		if(itemStat.isDirectory()) {
			resource.append(new Resource.Directory(this.path, itemName));
		}else if(itemStat.isFile()) {
			resource.append(new Resource.File(this.path, itemName));
		}
	}

	return resource;
}

Resource.Directory.prototype.dirs = function(filter) {
	var inputFilter;
	if(!filter) {
		inputFilter = function(basePath, fileName, fileStat) {
			return fileStat.isDirectory();
		}
	}else{
		inputFilter = function(basePath, fileName, fileStat) {
			return filter(basePath, fileName, fileStat) && fileStat.isDirectory();
		}
	}

	return this.all(inputFilter);
}

Resource.Directory.prototype.files = function(filter) {
	var inputFilter;
	if(!filter) {
		inputFilter = function(basePath, fileName, fileStat) {
			return fileStat.isFile();
		}
	}else{
		inputFilter = function(basePath, fileName, fileStat) {
			return filter(basePath, fileName, fileStat) && fileStat.isFile();
		}
	}

	return this.all(inputFilter);
}

// sync version
Resource.Directory.prototype.glob = function(pattern, callback) {
	return glob(path.resolve(this.path, pattern), callback);
}

Resource.Directory.prototype.globSync = function(pattern) {
	return glob.sync(path.resolve(this.path, pattern));
}

Resource.File = function(basePath, fileName) {
	this.basePath = basePath;
	this.fileName = fileName;
	this.path = path.resolve(basePath, fileName);
	this.isFile = true;
	this.isDirectory = false;
}

