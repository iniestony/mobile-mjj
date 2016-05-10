var W = {};
module.exports = W;

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

W.newServer = function(port){
  var app = express();
  var server = new WebServer(app, port);

  server.init();

  return server;
};

function WebServer(app, port){
  this.app = app;
  this.port = port;
}

WebServer.prototype.init = function() {
  this.app.use(bodyParser.urlencoded({extended: true}));
  this.app.use(bodyParser.json());
  this.app.use(cookieParser());
};

WebServer.prototype.listen = function(port) {
  if(port) { this.port = port; }

  return this.app.listen(this.port);
};
