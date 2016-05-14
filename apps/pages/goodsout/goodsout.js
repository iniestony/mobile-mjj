mobileMJ.config(["$stateProvider", function($stateProvider){
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
  
}]);