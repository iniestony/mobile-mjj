/**
 * Created by iniestony on 16/5/10.
 */

var mobileMJ = angular.module("mjApp", ["ui.router", "ui.bootstrap"]);

mobileMJ.config(["$urlRouterProvider", function($urlRouterProvider){
  $urlRouterProvider.when("/", "/welcome");
  $urlRouterProvider.when("", "/welcome");

  $urlRouterProvider.otherwise("/welcome");
}]);