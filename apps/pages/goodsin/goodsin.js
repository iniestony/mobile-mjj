mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("goodsin", {
    url: "/goodsin",
    templateUrl: "/pages/goodsin/goodsin.html",
    controller: "goodsinCtrl"
  });
}])
  
.controller("goodsinCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };
  
  $scope.addGoods = function(){
    $uibModal.open({
      templateUrl: "/pages/goodsin/add.html",
      controller: "goodsinAddCtrl",
      windowClass: "sjd-page-goodsin-add-window",
      backdrop: "static",
      keyboard: false
    }).result.then(function(data){
      //todo
    },function(){});
  };
  
}])

.controller("goodsinAddCtrl", ["$scope", "$uibModalInstance", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope, $uibModalInstance, $http, xhrRequestOrigin, sjdDialog){
  
  
  $scope.productName = "";
  $scope.newProduct = "";
  $scope.products = [];

  $scope.addNew = function(){
    var newID;
    var ids = $scope.products.map(function(p){
      return p.erpid;
    });

    do {
      var r1, r2;
      r1 = Math.ceil(Math.random()*9);
      r2 = Math.ceil(Math.random()*9);
      var d = new Date();
      newID = (d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + r1 + r2;
    } while(ids.indexOf(newID) >= 0);

    $scope.products.push({
      "erpid": newID,
      "name": $scope.newProduct,
      "selected": true
    });
  };

  $scope.search = function(){
    var url = xhrRequestOrigin + "/stockproducts/customerproducts/list.do?enterpriseid=240";
    if($scope.productName !== ""){
      url = url + "&productname=" + $scope.productName;
    }

    $http.get(url).success(function(data){
      $scope.products = JSON.parse(data.value);
      for(var i=0;i<$scope.products.length;i++){
        $scope.products[i].selected = false;
      }
    }).error(function(msg){
      sjdDialog.open("Error", msg);
    });
  };


  $scope.submit = function(){
    var result = $scope.products.filter(function(item){
      return item.selected;
    }).map(function(n_item){
      return {
        "erpid": n_item.erpid,
        "name": n_item.name
      };
    });
    $uibModalInstance.close(result);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };
  
  
}]);
