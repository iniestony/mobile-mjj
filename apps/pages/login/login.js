mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("login", {
    url: "/login",
    templateUrl: "/pages/login/login.html",
    controller: "loginCtrl"
  });
}])

.controller("loginCtrl", ["$scope", function($scope){

}]);