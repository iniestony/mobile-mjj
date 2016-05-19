mobileSJD.service("sjdDialog", ["$uibModal",
  function($uibModal){

    this.open = function(type, msg){
      var instance = $uibModal.open({
        templateUrl: "/services/sjdDialog/sjdDialog" + type + ".html",
        controller: ["$scope", "$uibModalInstance", "message",
          function($scope, $uibModalInstance, message){
            $scope.message = message;

            $scope.close = function(){
              $uibModalInstance.close();
            };

        }],
        windowClass: "sjd-dialog-window",
        backdrop: "static",
        keyboard: false,
        resolve: {
          message: function(){
            return msg;
          }
        }
      });
      
      return instance.result;
    };
}]);