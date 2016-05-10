var A = {};
module.exports = A;

A.App = App;

//@TODO record all App stored for debug or manage
var vm = require("vm");
var fs = require("fs");
var _path = require("path");

var express = require("express");

var log = require("./log");

A.plugNewAppInto = function(abs_path, base_path, karasServer, prefix){
  return new A.App(abs_path, base_path, karasServer.$modules).plugInto(karasServer, prefix);
}


function App(abs_path, base_path, modules) {
  this.path_main_js = abs_path;
  this.$path = _path.dirname(abs_path);

  this.$id = _path.relative(base_path, this.$path);
  this.$type = "App";

  // @TODO read 'default configuration' and 'interface.json'

  this.modules = modules;
  this.api_router = new APIRouter(this);
  this.app_in_sandbox = new AppInSandbox(this);

  // @TODO internal event system, for debug, etc..
}

// register the router to web server
App.prototype.registerRouter = function(webServer, prefix) {
  if( !prefix ) { prefix = "/api/"; }
  webServer.app.use( prefix + this.$id, this.api_router.router );
};

App.prototype.plugInto = function(karasServer, prefix) {
  // set router from based on the path_main_js
  // @TODO, here base folder is /lib/core/app.js
  vm.runInNewContext(fs.readFileSync(this.path_main_js), new Sandbox(this), this.path_main_js);

  // register the router to outside server
  this.registerRouter(karasServer.webServer, prefix);

  // return this for chain usage
  return this;
};


// @TODO provide final for each attribute
function AppInSandbox(app) {
  this.$id = app.$id;
  this.$path = app.$path;
  this.$type = app.$type;

  this.router = app.api_router;
}

// works as global enviroment
function Sandbox(app) {
  //@TODO add global environment into sandbox
  // now provide:
  // modules -> app.modules

  this.$Module = app.modules;
  this.$Log = log;
  this.console = log;
  this.require = require;
  this.App = app.app_in_sandbox;
}

function APIRouter(app) {
  this.router = express.Router();
  this.app = app;
  this.internalPrefix = ""; // set v1/v2
}

// handler as function(req, res, next) format
APIRouter.prototype.use = function(path, handler) { // jshint ignore:line
  this.router.use.apply(this.router, arguments);
};

APIRouter.prototype.get = function(path, handler) { // jshint ignore:line
  this.router.get.apply(this.router, arguments);
};

APIRouter.prototype.post = function(path, handler) { // jshint ignore:line
  this.router.post.apply(this.router, arguments);
};

APIRouter.prototype.put = function(path, handler) { // jshint ignore:line
  this.router.put.apply(this.router, arguments);
};

APIRouter.prototype.delete = function(path, handler) { // jshint ignore:line
  this.router.delete.apply(this.router, arguments);
};

APIRouter.prototype.all = function(path, handler) { // jshint ignore:line
  this.router.all.apply(this.router, arguments);
};

APIRouter.prototype.route =  function(path) {
  return new PartialAPIRouter(this.router, path);
};

function PartialAPIRouter(router, path){
  this.router = router;
  this.path = path;
}

PartialAPIRouter.prototype.use = function(handler){ // jshint ignore:line
  this.router.use.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.get = function(handler){ // jshint ignore:line
  this.router.get.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.post = function(handler){ // jshint ignore:line
  this.router.post.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.put = function(handler){ // jshint ignore:line
  this.router.put.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.delete = function(handler){ // jshint ignore:line
  this.router.delete.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.all = function(handler){ // jshint ignore:line
  this.router.all.apply(this.router, unshiftArg(arguments, this.path));
  return this;
};

PartialAPIRouter.prototype.route = function(path) {
  return new PartialAPIRouter(this.router, _path.resolve(this.path, path));
};

function unshiftArg(args, value){
  var argArray = [value];

  for(var d in args){
    argArray.push(args[d]);
  }

  return argArray;
}
