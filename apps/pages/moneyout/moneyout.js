mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneyout", {
    url: "/moneyout",
    templateUrl: "/pages/moneyout/moneyout.html",
    controller: "moneyoutCtrl"
  });
}])
  
.controller("moneyoutCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
  $scope.durations = [{"value": 1, "name": "一个月"},{"value": 2, "name": "二个月"},{"value": 3, "name": "三个月"}];
  $scope.selectedDuration = $scope.durations[1].value;
  
  // $scope.addGoods = function(){
  //   $uibModal.open({
  //     templateUrl: "/pages/moneyout/add.html",
  //     controller: "goodsoutAddCtrl",
  //     windowClass: "sjd-page-goodsout-add-window",
  //     backdrop: "static",
  //     keyboard: false
  //   }).result.then(function(data){
  //     //todo
  //   },function(){});
  // };
  
}]);
