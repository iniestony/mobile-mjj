mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("initial", {
    url: "/initial",
    templateUrl: "/pages/initial/initial.html",
    controller: "initialCtrl"
  });
}])

.controller("initialCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };

  $scope.agree = false;

  $scope.durations = [{"value": 1, "name": "一个月"},{"value": 2, "name": "二个月"},{"value": 3, "name": "三个月"}];

  $scope.selectedDuration = $scope.durations[1].value;

  $scope.showDetail = function(){
    $uibModal.open({
      templateUrl: "/pages/initial/agreement.html",
      controller: "agreementCtrl",
      windowClass: "mj-page-initial-agreement-window"
    });
  };
  
}])
.controller("agreementCtrl", ["$scope", function($scope){
  
}]);