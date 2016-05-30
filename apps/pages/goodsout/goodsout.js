mobileSJD.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("goodsout", {
    url: "/goodsout",
    templateUrl: "/pages/goodsout/goodsout.html",
    controller: "goodsoutCtrl"
  });
}])
  
.controller("goodsoutCtrl", ["$scope", "$state", "$uibModal", "$http", "xhrRequestOrigin", "sjdDialog", "Constants",
  function($scope, $state, $uibModal, $http, xhrRequestOrigin, sjdDialog, Constants){

  $scope.products = [];

  $scope.estimate = 0;
  $scope.estimateTotal = Constants.estimateTotal;

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
    },function(){});
  };

  $scope.deleteProduct = function(index){
    $scope.products.splice(index, 1);
  };

  $scope.getEstimate = function(){
    $scope.estimate = 0;
    $scope.products.forEach(function(item){
      var c = isNaN(parseInt(item.count))?0:parseInt(item.count);
      $scope.estimate = $scope.estimate + parseFloat(item.dealprice) * c;
    });
  };

  $scope.submit = function(){
    var hasMorgaged = 0;
    var requestData = {
      "header": {
        "contact": $scope.contact,
        "receivingcompany": $scope.receivingcompany,
        "phone": $scope.phone,
        "stockname": $scope.stockname,
        "receivingaddress": $scope.receivingaddress,
        "memo": $scope.memo,
        "creator": "15267015541"
      },
      "details":[]
    };
    for(var i=0;i<$scope.products.length;i++){
      if($scope.products[i].mortgaged){
        hasMorgaged = 1;
      }
      requestData.details.push({
        "erpid": $scope.products[i].erpid,
        "name": $scope.products[i].name,
        "count": $scope.products[i].count,
        "mortgaged": ($scope.products[i].mortgaged)?"是":"否",
        "dealprice": $scope.products[i].dealprice
      });
    }
    var url = xhrRequestOrigin + "/stockpost/sjd/deliveryPush.do?enterpriseid=240&hasMorgaged=" + hasMorgaged;
    url = url + "&data=" + JSON.stringify(requestData);

    $http.post(url).success(function(){
      $state.go("dashboard");
    }).error(function(msg){
      sjdDialog.open("Error", msg);
    });

  };
  
}])

.controller("goodsoutAddCtrl", ["$scope", "$rootScope","$uibModalInstance", "$http", "xhrRequestOrigin", "sjdDialog",
  function($scope,$rootScope, $uibModalInstance, $http, xhrRequestOrigin, sjdDialog){

  $scope.productName = "";
  $scope.products = [];
  
  $scope.search = function(){
    var url = xhrRequestOrigin + "/stockproducts/customerproducts/list.do?enterpriseid="+$rootScope.enterpriseid;
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
