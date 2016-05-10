var K = {};
module.exports = K;

//@TODO provide global base path
var W = require("./webserver");
var A = require("./app");
var R = require("../util/resource")
var fs = require("fs");
var path = require("path");
var express =require("express");

// CONSTANT VALUES
var DEFAULT_CONFIG = {
  "apps_path" : "apps",
  "modules_path" : "modules",

  "webserver_port" : 8080,
  "webserver_static_path" : "../apps"
};


K.newServer = function(config) {
  if(!config) {
    config = DEFAULT_CONFIG;
  }

  return new Karas(config);
};

function Karas(config) {

  this.$config = config;
  this.$modules = {};
  this.$apps = {};
  
  this.init();

  this.loadModules();
  this.loadApps();

  this.prepareWebServerStaticPath();
}

Karas.prototype.loadModules = function() {
    var _karas = this;
    var modules_path = this.$config.modules_path;

    if(!modules_path){
      //@WARN
      return;
    }

    console.log("\nScan and Load Modules from folder :", modules_path);
    R.newDirectory(modules_path).files().each(function(module_path, base_path, file_name){
      var module_extname = path.extname(module_path);
      var module_name = path.basename(module_path, module_extname);

      switch(module_extname) {
        case ".js" :
        case ".json" :
          var module = require(module_path);
          if(module.init && module.init instanceof Function){
            module.init();
          }

          console.log(" - Load Module Successful : ", module_name);

          _karas.$modules[module_name] = module;
      }
    })
};

Karas.prototype.loadApps = function() {

  var _karas = this;
  var apps_path = this.$config.apps_path;

  if(!apps_path){
    //@WARN
    return;
  }

  console.log("\nScan and Load Applications from folder :", apps_path);
  // recursively to visit all directories to support version control
  R.newDirectory(apps_path).globSync("**/main.js").forEach(function(app_abs_path){
    var app = A.plugNewAppInto(app_abs_path, apps_path, _karas, "/api/");

    console.log(" - Load App Successful :", app.$id);

    _karas.$apps[app.$id] = app;
  });
};

Karas.prototype.init = function() {
  this.webServer = W.newServer(8080);
  this.webServer.init();
};

Karas.prototype.prepareWebServerStaticPath = function() {
  console.log("\nRegister Web Static Path : ", path.resolve(__dirname, "../../", this.$config.webserver_static_path));
  this.webServer.app.use("/", express.static(path.resolve(__dirname, "../../", this.$config.webserver_static_path)));
};


Karas.prototype.start = function() {
  this.webServer.listen();
  console.log("\nMock Server is started and listens in port :", this.webServer.port);
  console.log("\nPress 'Ctrl + C' to stop Server");
};
