mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("moneyin", {
    url: "/moneyin",
    templateUrl: "/pages/moneyin/moneyin.html",
    controller: "moneyinCtrl"
  });
}])
  
.controller("moneyinCtrl", ["$scope", "$state", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope, $state, $http, xhrRequestOrigin, sjdDialog){

  $scope.details = [];
  $scope.date = new Date();
  $scope.opened = false;
  $scope.repayAmount = 0;
  $scope.estimate = 0;
  
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date("2020-05-27"),
    minDate: new Date(),
    startingDay: 1
  };

  function getDate(str){
    var d = new Date(str.substring(0, 10));
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function daysInterval(d1, d2){
    return parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  }

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
      obj.current = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(data.value[i].usedate.substring(0, 10)), new Date()) + 1) / 360)).toFixed(2));
      obj.expire = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(data.value[i].usedate.substring(0, 10)), new Date(data.value[i].repaymentdate.substring(0, 10))) + 1) / 360)).toFixed(2));
      $scope.details.push(obj);
    }
    $scope.date = new Date(formatDate($scope.details[0].usedate));
    $scope.dateOptions.minDate = new Date(formatDate($scope.details[0].usedate));
    $scope.dateOptions.maxDate = new Date(formatDate($scope.details[0].repaymentdate));
    $scope.current = angular.copy($scope.details[0]);
  });

  $scope.toggleDatePicker = function(){
    $scope.opened = !$scope.opened;
  };

  $scope.selectDetail = function(detail){
    $scope.date = new Date(formatDate(detail.usedate));
    $scope.dateOptions.minDate = new Date(formatDate(detail.usedate));
    $scope.dateOptions.maxDate = new Date(formatDate(detail.repaymentdate));
    $scope.current = angular.copy(detail);
  };

  $scope.updateEstimate = function(){
    $scope.estimate = 0;
    if(($scope.repayAmount > 0) && $scope.date){
      $scope.estimate = parseFloat(($scope.repayAmount + ($scope.repayAmount * $scope.current.interest * (daysInterval(new Date(formatDate($scope.current.usedate)), $scope.date) + 1) / 360)).toFixed(2));
    }
  };
  
  $scope.submit = function(){
    if(($scope.repayAmount > 0) && $scope.date){
      var fullDate = $scope.date.getFullYear() + "/" + ($scope.date.getMonth() + 1) + "/" + $scope.date.getDate();
      $http.post(xhrRequestOrigin + "/actionon/loan/repayapply.do?enterpriseid=240&loanid=238" +
        "&ref=" + $scope.current.idloandetail +
        "&repaying=" + $scope.repayAmount +
        "&usedate=" + fullDate, {}, {"transformResponse": function(v){ return v; }}
      ).success(function(){
        $state.go("dashboard");
      }).error(function(msg){
        sjdDialog.open("Error", msg);
      });
    }
    else{
      sjdDialog.open("Info", "请为还款金额以及还款时间输入有效值");
    }
  };

  function formatDate(str){
    var list = str.split("-");
    list[1] = (list[1].length === 1) ? "0" + list[1] : list[1];
    list[2] = (list[2].length === 1) ? "0" + list[2] : list[2];
    return list.join("-");
  }
  
}]);
