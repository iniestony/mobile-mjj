/**
 * Created by iniestony on 16/5/10.
 */

var mobileMJ = angular.module("sjdApp", ["ui.router", "ui.bootstrap", "ui.select", "camera"]);

mobileMJ.config(["$urlRouterProvider", function($urlRouterProvider){
  $urlRouterProvider.when("/", "/welcome");
  $urlRouterProvider.when("", "/welcome");

  $urlRouterProvider.otherwise("/welcome");
}]);