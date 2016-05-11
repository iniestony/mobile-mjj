mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("dashboard", {
    url: "/dashboard",
    templateUrl: "/pages/dashboard/dashboard.html",
    controller: "dashboardCtrl"
  });
}])

.controller("dashboardCtrl", ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams){
  $scope.status = "none"; //none created applied validated

}]);