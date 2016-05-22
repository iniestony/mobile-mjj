mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("initial", {
    url: "/initial",
    templateUrl: "/pages/initial/initial.html",
    controller: "initialCtrl"
  });
}])

.controller("initialCtrl", ["$scope", "$state", "$uibModal", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope, $state, $uibModal, $http, xhrRequestOrigin, sjdDialog){

  $scope.regaddr = "";
  $scope.turnovers = "";
  $scope.mainBusiness = "";
  $scope.stockaddr = "";
  $scope.avgstockvalue = "";

  $http.get(xhrRequestOrigin + "/project/qulificationcheck/form.do?key=quiz&customerprojectid=170").success(function(data){
    var quiz = JSON.parse(JSON.parse(data.content).quiz);
    $scope.regaddr = quiz.regaddr;
    $scope.turnovers = quiz.turnovers;
    $scope.mainBusiness = quiz.mainBusiness;
    $scope.stockaddr = quiz.stockaddr;
    $scope.avgstockvalue = quiz.avgstockvalue;
  }).error(function(msg){
    sjdDialog.open("Error", msg);
  });


  $scope.submit = function(){
    $state.go("dashboard");
  };



  $scope.showDetail = function(){
    $uibModal.open({
      templateUrl: "/pages/initial/agreement.html",
      controller: "agreementCtrl",
      windowClass: "sjd-page-initial-agreement-window"
    });
  };
  
}])
.controller("agreementCtrl", ["$scope", function($scope){
  
}]);