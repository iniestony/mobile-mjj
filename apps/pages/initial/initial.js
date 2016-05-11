mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("initial", {
    url: "/initial",
    templateUrl: "/pages/initial/initial.html",
    controller: "initialCtrl"
  });
}])

.controller("initialCtrl", ["$scope", "$state", function($scope, $state){
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
}]);