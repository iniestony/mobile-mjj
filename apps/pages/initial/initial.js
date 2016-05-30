mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("initial", {
    url: "/initial",
    templateUrl: "/pages/initial/initial.html",
    controller: "initialCtrl"
  });
}])

.controller("initialCtrl", ["$scope","$rootScope", "$state", "$uibModal", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope,$rootScope, $state, $uibModal, $http, xhrRequestOrigin, sjdDialog){

  $scope.regaddr = "";
  $scope.turnovers = "";
  $scope.mainBusiness = "";
  $scope.stockaddr = "";
  $scope.avgstockvalue = "";
  var clicked = false;

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
    if(clicked){
      return;
    }
    clicked = true;
    var url = xhrRequestOrigin + "/project/qulificationcheck/formsave.do?customerprojectid="+$rootScope.customerprojectid;
    var valueStr = JSON.stringify({
      "turnovers": $scope.turnovers,
      "regaddr": $scope.regaddr,
      "mainBusiness": $scope.mainBusiness,
      "stockaddr": $scope.stockaddr,
      "avgstockvalue": $scope.avgstockvalue
    });
    var questionaire = JSON.stringify({
      "key": "quiz",
      "value": valueStr
    });
    url = url + "&questionaire=" + questionaire;

    $http.post(url, {}).success(function(){
      $http.post(xhrRequestOrigin + "/project/qulificationcheck/formsave.do?customerprojectid=170&enterpriseid=240", {}).success(function(){
        $state.go("dashboard");
      }).error(function(msg2){
        clicked = false;
        sjdDialog.open("Error", msg2);
      });
    }).error(function(msg){
      clicked = false;
      sjdDialog.open("Error", msg);
    });
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