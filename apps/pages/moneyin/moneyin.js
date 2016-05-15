mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneyin", {
    url: "/moneyin",
    templateUrl: "/pages/moneyin/moneyin.html",
    controller: "moneyinCtrl"
  });
}])
  
.controller("moneyinCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
  $scope.date = new Date();
  $scope.opened = false;

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 27),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.toggleDatePicker = function(){
    $scope.opened = !$scope.opened;
  };
  
  // $scope.addGoods = function(){
  //   $uibModal.open({
  //     templateUrl: "/pages/moneyout/add.html",
  //     controller: "goodsoutAddCtrl",
  //     windowClass: "mj-page-goodsout-add-window",
  //     backdrop: "static",
  //     keyboard: false
  //   }).result.then(function(data){
  //     //todo
  //   },function(){});
  // };
  
}]);
