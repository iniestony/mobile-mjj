mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("login", {
    url: "/login",
    templateUrl: "/pages/login/login.html",
    controller: "loginCtrl"
  });
}])

.controller("loginCtrl", ["$scope", "$state", function($scope, $state){
  $scope.login = function(){
    $state.go("dashboard");
  };

  $scope.toRegister = function(){
    $state.go("register");
  };

}]);