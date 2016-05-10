mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("welcome", {
    url: "/welcome",
    templateUrl: "/pages/welcome/welcome.html",
    controller: "welcomeCtrl"
  });
}])

.controller("welcomeCtrl", ["$scope", function($scope){

}]);