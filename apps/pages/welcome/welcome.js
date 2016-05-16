mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("welcome", {
    url: "/welcome",
    templateUrl: "/pages/welcome/welcome.html",
    controller: "welcomeCtrl"
  });
}])

.controller("welcomeCtrl", ["$scope", "$state", function($scope, $state){
  $scope.next = function(){
    $state.go("login");
  };
}]);