mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneydetail", {
    url: "/moneydetail",
    templateUrl: "/pages/moneydetail/moneydetail.html",
    controller: "moneydetailCtrl"
  });
}])
  
.controller("moneydetailCtrl", ["$scope", "$http", "$state", function($scope, $http, $state){
  
  $scope.apply = function(){
    $state.go("moneyout");
  };
  
  
  
  
}]);