////////////////////////////////////////////////////////////////////////////////
// Util - Provide util functions
//
////////////////////////////////////////////////////////////////////////////////

var path = require("path");
var fs = require("fs");
var fse = require("fs-extra");
var _ = require("lodash");


/* ------------------------------------------------------------------------- */
/* ------------------------------- STRINGS --------------------------------- */
/* ------------------------------------------------------------------------- */

exports.sprintf = require("sprintf.js").sprintf;
exports.vsprintf = require("sprintf.js").vsprintf;

exports.string_hash = require("blueimp-md5");

exports.uuid = require("node-uuid");


/* ------------------------------------------------------------------------- */
/* -------------------------------- CLASS ---------------------------------- */
/* ------------------------------------------------------------------------- */

exports.clz = {};

exports.clz.inherit = function(parent_clz, child_clz, extend){
  function _p() {}
  if(!child_clz) {
    child_clz = function(){};
  }

  _p.prototype = parent_clz.prototype;

  child_clz.prototype = new _p();
  child_clz.prototype.constructor = child_clz;

  for(var d in extend){
    child_clz.prototype[d] = extend[d];
  }

  return child_clz;
};



/* ------------------------------------------------------------------------- */
/* -------------------------------- PATH ----------------------------------- */
/* ------------------------------------------------------------------------- */

exports.path = {};

// a/b/c.js => c.js
exports.path.basename = function(p) {
  return path.basename(p);
};

// a/b/c.js => .js
exports.path.ext = function(p) {
  return path.extname(p);
};

// a/b/c.js => c
exports.path.basename_no_ext = function(p) {
  return path.basename(p, path.extname(p));
};

// a/b/c => a/b
exports.path.dirname = function(p) {
  return path.dirname(p);
};

// a/b/c.js => b
exports.path.base_dirname = function(p) {
  return path.basename(path.dirname(p));
};

// normarlize the path for windows and linux
// a\b\c => a/b/c
exports.path.normalize = function(p) {
  return path.normalize(p).replace(/\\/g, "/");
};

// resolve with normalize for windows
exports.path.resolve = function(){
  return exports.path.normalize(path.resolve.apply(path, arguments));
};

exports.path.abs = function(relative_path, base_path, base_is_dir) {
  var base_dir;

  if(base_path){
    base_dir = base_is_dir? base_path : exports.path.dirname(base_path);
  }else{
    base_dir = exports.path.$root;
  }

  return exports.path.resolve(base_dir, relative_path);
};

exports.path.$root = exports.path.abs("../../", module.filename);

exports.path.to_root_base_abs = function(base_relative_p) {
  return exports.path.resolve(exports.path.$root, base_relative_p);
};


/* ------------------------------------------------------------------------- */
/* --------------------------------- FS ------------------------------------ */
/* ------------------------------------------------------------------------- */

exports.fs = {};
exports.fs.fse = fse;

exports.fs.path_exists = function(p) {
  return fse.existsSync(p);
};

exports.fs.file_exists = function(p) {
  return fse.existsSync(p) && fse.statSync(p).isFile();
};

exports.fs.dir_exists = function(p) {
  return fse.existsSync(p) && fse.statSync(p).isDirectory();
};

exports.fs.mkdirp = function(dir) {
  //@TODO jonathan thows exception here..
  fse.mkdirpSync(dir);
};

// @TODO to add copy_file, rm_file, ensulre_dir_exists ...


/* ---- FILE/DIRECTORY ---- */
// * able to support js file include 

// ** FSItem class, base class for FSFIle and FSDir, may other as FSDevice
function FSItem(f, base_dir) {
  this.base = exports.path.basename_no_ext(f); 
  this.name = f;
  this.ext = exports.path.ext(f);
  this.path = exports.path.abs(f, base_dir, true);
  this.type = FSItem.fetch_type(this.path);
}

// ensure we at least has 32bit
FSItem.CLEAN = 0;
FSItem.FILE = 1 << 0;
FSItem.DIR = 1 << 1;
FSItem.LINK = 1 << 2;
FSItem.SOCKET = 1 << 3;
FSItem.BLOCK = 1 << 4;
FSItem.CHAR = 1 << 5;
FSItem.PIPE = 1 << 6;

FSItem.fetch_type = function(path){
  //@TODO test other type of file
  if(exports.fs.file_exists(path)){
    return FSItem.FILE;
  }else if(exports.fs.dir_exists(path)){
    return FSItem.DIR;
  }

  return FSItem.CLEAN;
};

FSItem.prototype.is_file = function() {
  // @TODO in case someone may do 'rm f; mkdir f', we may
  // need to check it everytime call this
  return this.type | FSItem.FILE_MASK !== 0;
};
//@TODO toFSFile

FSItem.prototype.is_dir = function() {
  return this.type | FSItem.DIR_MASK !== 0;
};
//@TODO toFSDir

// @TODO is it necessary?
// ** class FSFile
var FSFile = exports.clz.inherit(FSItem, function(f, base_dir){
  //@TODO need to test if it is File
  FSItem.apply(this, arguments);
});

// @TODO is it necessary?
// ** class FSDir
var FSDir = exports.clz.inherit(FSItem, function(f, base_dir){
  //@TODO need to test if it is Dir
  FSItem.apply(this, arguments);
});
// @TODO implement has_file and has_dir
FSDir.prototype.has_file = function(p) {};
FSDir.prototype.has_dir = function(p) {};
FSDir.prototype.files = function(p) {
};

// ** class FSItemList
function FSItemList() {
  this.items = [];
}

FSItemList.prototype.files = function(ext) {
  var output_item_list = new FSItemList();
  output_item_list.items = _.filter(this.items, function(item) {
    return item.is_file() && (!ext || item.ext === ext);
  });

  return output_item_list;
};

FSItemList.prototype.dirs = function() {
  var output_item_list = new FSItemList();
  output_item_list.items = _.filter(this.items, function(item) {
    return item.is_dir();
  });

  return output_item_list;
};

FSItemList.prototype.each = function(f) {
  _.each(this.items, function(item){
    f(item);
  });

  return this;
};

FSItemList.prototype.filter = function(f) {
  var output_item_list = new FSItemList();
  output_item_list.items = _.filter(this.items, function(item){
    return f(item);
  });
  
  return output_item_list;
};

exports.fs.list = function(p){
  //@TODO $check to certify if the path is valid
  var items = fs.readdirSync(p);
  var list = new FSItemList();

  _.each(items, function(f){
    list.items.push(new FSItem(f, p));
  });
  
  return list; 
};

exports.fs.list_base_root = function(p){
  var abs_path = exports.path.to_root_base_abs(p);

  return exports.fs.list(abs_path);
};
