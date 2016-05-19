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
    
  $scope.applyAmount = 0;
  $scope.remark = "";

  $scope.durations = [{"value": "3个月", "name": "3个月"},{"value": "6个月", "name": "6个月"},{"value": "12个月", "name": "12个月"}];
  $scope.selectedDuration = $scope.durations[0].value;

  $scope.submit = function(){
    if($scope.applyAmount > 0){
      var url = xhrRequestOrigin + "/actionafter/applyuse/loandetails.do?customerprojectid=121" +
        "&amount=" + $scope.applyAmount +
        "&reriodtime=" + $scope.selectedDuration;
      if($scope.remark !== ""){
        url = url + "&remark=" + $scope.remark;
      }
      $http.post(url, {}, {"transformResponse": function(v){ return v; }}
      ).success(function(){
        $state.go("dashboard");
      });
    }
  };
  
}]);
