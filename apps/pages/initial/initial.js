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

  $scope.durations = [{"value": "一个月", "name": "一个月"},{"value": "二个月", "name": "二个月"},{"value": "三个月", "name": "三个月"}];

  $scope.selectedDuration = $scope.durations[0].value;

  $scope.showDetail = function(){
    $uibModal.open({
      templateUrl: "/pages/initial/agreement.html",
      controller: "agreementCtrl"
    });
  };
  
}])
.controller("agreementCtrl", ["$scope", function($scope){
  
}]);