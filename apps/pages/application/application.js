mobileSJD.config(["$stateProvider", function($stateProvider){
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
    "idSrc": [],
    "licenseSrc": [],
    "marriageSrc": [],
    "orgSrc": []
  };

  $scope.upload = function(item){
    $uibModal.open({
      templateUrl: "/pages/application/upload.html",
      controller: "uploadCtrl",
      windowClass: "sjd-page-application-upload-window",
      backdrop: "static",
      keyboard: false,
      resolve: {
        item: function(){
          return item;
        },
        images: function(){
          return angular.copy($scope.pictures[item + "Src"]);
        }
      }
    }).result.then(function(dataURIs){
      $scope.pictures[item + "Src"] = dataURIs;
    },function(){});
  };

}])
.controller("uploadCtrl", ["$scope", "$uibModalInstance", "item", "images", "imageReader", function($scope, $uibModalInstance, item, images, imageReader){
  var map = {
    "id": "身份证",
    "license": "营业执照",
    "marriage": "结婚证",
    "org": "组织结构证"
  };
  $scope.title = "上传资料:" + map[item];

  $scope.imageURIs = images;

  // $scope.resetImage = function(){
  //   $scope.imageURI = false;
  // };
  
  $scope.uploadImage = function(){
    $("input.origin-input").click();
  };

  $scope.getImage = function(){
    imageReader.readImage($scope.imageFile, this).then(function(result){
      $scope.imageURIs.push(result);
    });
  };

  $scope.submit = function(){
    $uibModalInstance.close($scope.imageURIs);
  };
  
  $scope.cancel = function(){
    $uibModalInstance.dismiss();
  };

  
}])
.directive("customOnChange", [function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      element.bind("change", function(e){
        scope.imageFile = (event.srcElement || event.target).files[0];
        scope.getImage();
      });
    }
  };
}])
.factory("imageReader", ["$q", function($q){
  var onLoad = function(reader, deferred, scope) {
    return function (){
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };
  var onError = function (reader, deferred, scope) {
    return function (){
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };
  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    return reader;
  };
  var readImage = function(file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);
    return deferred.promise;
  };
  return {
    readImage: readImage
  };
}]);