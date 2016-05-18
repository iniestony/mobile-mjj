mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("dashboard", {
    url: "/dashboard",
    templateUrl: "/pages/dashboard/dashboard.html",
    controller: "dashboardCtrl"
  });
}])

.controller("dashboardCtrl", ["$scope", "$state", "$stateParams", "$uibModal", function($scope, $state, $stateParams, $uibModal){
  $scope.status = 0; //none created applied validated
  $scope.message = "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";

  var messageCollection = {
    0: "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",
    1: "您的基本信息已通过审核,请正式发起贷款申请.",
    2: "您的贷款申请已提交,请耐心等待审核.",
    3: ""
  };

  //todo test only
  $scope.changeStatus = function(){
    $scope.status = ($scope.status + 1)%4;
    $scope.message = messageCollection[$scope.status];
  };

  $scope.showDetail = function(){
    $uibModal.open({
      templateUrl: "/pages/dashboard/detail.html",
      controller: "detailCtrl",
      windowClass: "sjd-page-dashboard-detail-window",
      backdrop: "static",
      keyboard: false
    }).result.then(function(){
      $state.go("moneyout");
    },function(){});
  };
  
  $scope.navigate = function(state){
    $state.go(state);
  };

}])

.controller("detailCtrl", ["$scope", "$uibModalInstance", function($scope, $uibModalInstance){

  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };


}]);