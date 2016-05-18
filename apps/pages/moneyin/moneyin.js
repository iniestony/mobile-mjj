mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneyin", {
    url: "/moneyin",
    templateUrl: "/pages/moneyin/moneyin.html",
    controller: "moneyinCtrl"
  });
}])
  
.controller("moneyinCtrl", ["$scope", "$state", "$http", "xhrRequestOrigin", function($scope, $state, $http, xhrRequestOrigin){

  $scope.details = [];
  $scope.date = new Date();
  $scope.opened = false;
  $scope.repayAmount = 0;
  
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 27),
    minDate: new Date(),
    startingDay: 1
  };

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
      obj.current = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(obj.usedate), new Date) + 1) / 360)).toFixed(2));
      obj.expire = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(obj.usedate), new Date(obj.repaymentdate)) + 1) / 360)).toFixed(2));
      $scope.details.push(obj);
    }
    $scope.date = new Date($scope.details[0].usedate);
    $scope.dateOptions.minDate = new Date($scope.details[0].usedate);
    $scope.dateOptions.maxDate = new Date($scope.details[0].repaymentdate);
    $scope.current = angular.copy($scope.details[0]);
  });

  function getDate(str){
    var d = new Date(str);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function daysInterval(d1, d2){
    return parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }

  $scope.toggleDatePicker = function(){
    $scope.opened = !$scope.opened;
  };

  $scope.selectDetail = function(detail){
    $scope.date = new Date(detail.usedate);
    $scope.dateOptions.minDate = new Date(detail.usedate);
    $scope.dateOptions.maxDate = new Date(detail.repaymentdate);
    $scope.current = angular.copy(detail);
  };
  
  
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
}]);
