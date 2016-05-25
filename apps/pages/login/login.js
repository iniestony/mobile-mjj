mobileSJD.config(["$stateProvider", function($stateProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "/pages/login/login.html",
        controller: "loginCtrl"
    });
}])

.controller("loginCtrl", ["$scope", "$state", "$http", "$rootScope", "xhrRequestOrigin", "sjdDialog",
    function($scope, $state, $http, $rootScope, xhrRequestOrigin, sjdDialog) {
        $scope.login = function() {
            var url = "http://localhost:8080/sjdTest" + "/default/mobilelogin.do";
            $http({　　
                method: 'POST',
                　　url: url,
                params: {
                    "username": $scope.username,
                    "password": $scope.password
                }
            }).success(function(data) {
                if (data != null) {
                    $rootScope.user = {};
                    console.log(data);
                    $rootScope.user = data;
                    if (data.typeid == 9) { //借款用户
                        $rootScope.enterpriseid = 250;
                    }
                    $state.go("dashboard");
                };

            }).error(function(msg) {
                sjdDialog.open("Error", msg);
            });
        };
        $scope.toRegister = function() {
            $state.go("register");
        };
    }
]);