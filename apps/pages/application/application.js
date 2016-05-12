mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("application", {
    url: "/application",
    templateUrl: "/pages/application/application.html",
    controller: "applicationCtrl"
  });
}])

.controller("applicationCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };

  $scope.durations = [{"value": 1, "name": "一个月"},{"value": 2, "name": "二个月"},{"value": 3, "name": "三个月"}];
  $scope.usages = [{"value": "normal", "name": "一般资金周转"}];
  $scope.marriages = [{"value": "yes", "name": "已婚"},{"value": "no", "name": "未婚"}];

  $scope.selectedDuration = $scope.durations[1].value;
  $scope.selectedUsage = $scope.usages[0].value;
  $scope.selectedMarriage = $scope.marriages[0].value;
  
  $scope.pictures = {
    "idSrc": false,
    "licenseSrc": false,
    "marriageSrc": false,
    "orgSrc": false
  };

  $scope.showDetail = function(){
    $uibModal.open({
      templateUrl: "/pages/initial/agreement.html",
      controller: "agreementCtrl"
    });
  };

}]);