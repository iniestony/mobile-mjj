mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneyout", {
    url: "/moneyout",
    templateUrl: "/pages/moneyout/moneyout.html",
    controller: "moneyoutCtrl"
  });
}])
  
.controller("moneyoutCtrl", ["$scope", "$state", "$http", "xhrRequestOrigin", 
  function($scope, $state, $http, xhrRequestOrigin){
  
  $http.get(xhrRequestOrigin + "/api//loanstatement/data.do?loanid=152&action=loan").success(function(data){
    $scope.usedamount = parseFloat(data.value.usedamount.toFixed(2));
    $scope.ratio = data.value.ratio;
    $scope.interest = data.value.interest;
    $scope.amount = parseFloat(data.value.amount.toFixed(2));
    $scope.remain = $scope.amount - $scope.usedamount;
    var d = new Date(data.value.expireddate);
    $scope.expireddate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  });
  
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
  $scope.durations = [{"value": 1, "name": "一个月"},{"value": 2, "name": "二个月"},{"value": 3, "name": "三个月"}];
  $scope.selectedDuration = $scope.durations[1].value;

  
}]);
