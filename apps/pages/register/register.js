mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("register", {
    url: "/register",
    templateUrl: "/pages/register/register.html",
    controller: "registerCtrl"
  });
}])

.controller("registerCtrl", ["$scope", "$state", function($scope, $state){
  $scope.register = function(){
    $state.go("login");
  };
  
}]);