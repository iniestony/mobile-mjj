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
      var obj = {
        "idloandetail": data.value[i].idloandetail,
        "amount": parseFloat(parseFloat(data.value[i].amount).toFixed(2)),
        "repaid": parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
        "remain": parseFloat(parseFloat(data.value[i].amount).toFixed(2)) - parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
        "usedate": getDate(data.value[i].usedate),
        "repaymentdate": getDate(data.value[i].repaymentdate),
        "interest": parseFloat(data.value[i].interest),
        "repaying": parseFloat(parseFloat(data.value[i].repaying).toFixed(2))
      };
      obj.current = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(obj.usedate), new Date()) + 1) / 360)).toFixed(2));
      obj.expire = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(obj.usedate), new Date(obj.repaymentdate)) + 1) / 360)).toFixed(2));
      $scope.details.push(obj);
    }
  });
  
  $scope.apply = function(){
    $state.go("moneyout");
  };

  function getDate(str){
    var d = new Date(str);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function daysInterval(d1, d2){
    return parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }
  
}]);