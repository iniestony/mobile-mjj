/**
 * Created by iniestony on 16/5/10.
 */

var mobileSJD = angular.module("sjdApp", ["ui.router", "ui.bootstrap", "ui.select"]);

mobileSJD.config(["$urlRouterProvider", function($urlRouterProvider) {
    $urlRouterProvider.when("/", "/welcome");
    $urlRouterProvider.when("", "/welcome");

    $urlRouterProvider.otherwise("/welcome");
}])

.constant("xhrRequestOrigin", "http://test.sjdbank.com:8787/")
.constant("base", "/apps");