mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneydetail", {
    url: "/moneydetail",
    templateUrl: "/pages/moneydetail/moneydetail.html",
    controller: "moneydetailCtrl"
  });
}])
  
.controller("moneydetailCtrl", ["$scope", "$http", "$state", "xhrRequestOrigin",
  function($scope, $http, $state, xhrRequestOrigin){

  $scope.details = [];

  $http.get(xhrRequestOrigin + "/api/loandetails/data.do?action=list_loan&loanid=238").success(function(data){
    for(var i=0;i<data.value.length;i++){
      $scope.details.push({
        "amount": parseFloat(parseFloat(data.value[i].amount).toFixed(2)),
        "repaid": parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
        "remain": parseFloat(parseFloat(data.value[i].amount).toFixed(2)) - parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
        "usedate": data.value[i].usedate,
        "repaymentdate": data.value[i].repaymentdate,
        "interest": parseFloat(data.value[i].interest),
        "repaying": parseFloat(parseFloat(data.value[i].repaying).toFixed(2))
      });
    }
  });
  
  $scope.apply = function(){
    $state.go("moneyout");
  };
  
}]);