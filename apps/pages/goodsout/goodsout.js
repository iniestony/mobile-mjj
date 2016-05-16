mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("goodsout", {
    url: "/goodsout",
    templateUrl: "/pages/goodsout/goodsout.html",
    controller: "goodsoutCtrl"
  });
}])
  
.controller("goodsoutCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };

  $scope.addGoods = function(){
    $uibModal.open({
      templateUrl: "/pages/goodsout/add.html",
      controller: "goodsoutAddCtrl",
      windowClass: "sjd-page-goodsout-add-window",
      backdrop: "static",
      keyboard: false
    }).result.then(function(data){
      //todo
    },function(){});
  };
  
}])

.controller("goodsoutAddCtrl", ["$scope", "$uibModalInstance", function($scope, $uibModalInstance){
  

  $scope.submit = function(){
    $uibModalInstance.close($scope.imageURI);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };


}]);
