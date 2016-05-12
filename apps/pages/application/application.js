mobileMJ.config(["$stateProvider", function($stateProvider){
  $stateProvider.state("application", {
    url: "/application",
    templateUrl: "/pages/application/application.html",
    controller: "applicationCtrl"
  });
}])

.controller("applicationCtrl", ["$scope", "$state", "$uibModal", function($scope, $state, $uibModal){
  $scope.submit = function(){
    $state.go("dashboard");
  };

  $scope.durations = [{"value": 1, "name": "一个月"},{"value": 2, "name": "二个月"},{"value": 3, "name": "三个月"}];
  $scope.usages = [{"value": "normal", "name": "一般资金周转"}];
  $scope.marriages = [{"value": "yes", "name": "已婚"},{"value": "no", "name": "未婚"}];

  $scope.selectedDuration = $scope.durations[1].value;
  $scope.selectedUsage = $scope.usages[0].value;
  $scope.selectedMarriage = $scope.marriages[0].value;
  
  $scope.pictures = {
    "idSrc": false,
    "licenseSrc": false,
    "marriageSrc": false,
    "orgSrc": false
  };

  $scope.upload = function(item){
    $uibModal.open({
      templateUrl: "/pages/application/upload.html",
      controller: "uploadCtrl",
      windowClass: "mj-page-application-upload-window",
      backdrop: "static",
      keyboard: false,
      resolve: {
        item: function(){
          return item;
        }
      }
    }).result.then(function(dataURI){
      $scope.pictures[item + "Src"] = dataURI;
    },function(){});
  };

}])
.controller("uploadCtrl", ["$scope", "$uibModalInstance", "item", function($scope, $uibModalInstance, item){
  var map = {
    "id": "身份证",
    "license": "营业执照",
    "marriage": "结婚证",
    "org": "组织结构证"
  };
  $scope.title = "上传资料:" + map[item];

  $scope.imageURI = false;

  $scope.resetImage = function(){
    $scope.imageURI = false;
  };

  $scope.submit = function(){
    $uibModalInstance.close($scope.imageURI);
  };
  
  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };

  
}]);