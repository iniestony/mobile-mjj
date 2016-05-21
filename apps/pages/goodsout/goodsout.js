mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("goodsout", {
    url: "/goodsout",
    templateUrl: "/pages/goodsout/goodsout.html",
    controller: "goodsoutCtrl"
  });
}])
  
.controller("goodsoutCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };

  $scope.products = [];

  $scope.estimate = 0;
  $scope.estimateTotal = 0;

  $scope.stockname = "";
  $scope.contact = "";
  $scope.phone = "";
  $scope.receivingcompany = "";
  $scope.receivingaddress = "";
  $scope.memo = "";

  $scope.addGoods = function(){
    $uibModal.open({
      templateUrl: "/pages/goodsout/add.html",
      controller: "goodsoutAddCtrl",
      windowClass: "sjd-page-goodsout-add-window",
      backdrop: "static",
      keyboard: false
    }).result.then(function(data){
      var existingIDs = $scope.products.map(function(p){
        return p.erpid;
      });
      for(var i=0;i<data.length;i++){
        if(existingIDs.indexOf(data[i].erpid) < 0){
          $scope.products.push({
            "erpid": data[i].erpid,
            "name": data[i].name,
            "count": 0,
            "mortgaged": data[i].mortgaged,
            "dealprice": data[i].dealprice,
            "totalquantity": data[i].totalquantity
          });
        }
      }
      getEstimateTotal();
    },function(){});
  };

  $scope.deleteProduct = function(index){
    $scope.products.splice(index, 1);
    getEstimateTotal();
  };

  $scope.getEstimate = function(){
    $scope.estimate = 0;
    $scope.products.forEach(function(item){
      var c = isNaN(parseInt(item.count))?0:parseInt(item.count);
      $scope.estimate = $scope.estimate + parseFloat(item.dealprice) * c;
    });
  };

  function getEstimateTotal(){
    $scope.estimateTotal = 0;
    $scope.products.forEach(function(item){
      $scope.estimateTotal = $scope.estimateTotal + parseFloat(item.dealprice) * parseInt(item.totalquantity);
    });
  }
  
}])

.controller("goodsoutAddCtrl", ["$scope", "$uibModalInstance", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope, $uibModalInstance, $http, xhrRequestOrigin, sjdDialog){

  $scope.productName = "";
  $scope.products = [];
  
  $scope.search = function(){
    var url = xhrRequestOrigin + "/stockproducts/customerproducts/list.do?enterpriseid=240";
    if($scope.productName !== ""){
      url = url + "&productname=" + $scope.productName;
    }

    $http.get(url).success(function(data){
      $scope.products = eval("(" + data.value + ")");
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
        "name": n_item.name,
        "mortgaged": n_item.mortgaged,
        "dealprice": n_item.dealprice,
        "totalquantity": n_item.totalquantity
      };
    });
    $uibModalInstance.close(result);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };


}]);
