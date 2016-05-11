mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("dashboard", {
    url: "/dashboard",
    templateUrl: "/pages/dashboard/dashboard.html",
    controller: "dashboardCtrl"
  });
}])

.controller("dashboardCtrl", ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams){
  $scope.status = 0; //none created applied validated
  $scope.message = "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";


  //todo test only
  $scope.changeStatus = function(){
    $scope.status = $scope.status + 1;
    $scope.message = {
      0: "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",
      1: "您的基本信息已通过审核,请正式发起贷款申请.",
      2: "您的贷款申请已提交,请耐心等待审核.",
      3: ""
    }($scope.status);
  };

}]);