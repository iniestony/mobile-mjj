mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("goodsin", {
    url: "/goodsin",
    templateUrl: "/pages/goodsin/goodsin.html",
    controller: "goodsinCtrl"
  });
}])
  
.controller("goodsinCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
  $scope.addGoods = function(){
    $uibModal.open({
      templateUrl: "/pages/goodsin/add.html",
      controller: "goodsinAddCtrl",
      windowClass: "sjd-page-goodsin-add-window",
      backdrop: "static",
      keyboard: false
    }).result.then(function(data){
      //todo
    },function(){});
  };
  
}])

.controller("goodsinAddCtrl", ["$scope", "$uibModalInstance", function($scope, $uibModalInstance){
  
  
  $scope.submit = function(){
    $uibModalInstance.close($scope.imageURI);
  };
  
  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };
  
  
}]);
