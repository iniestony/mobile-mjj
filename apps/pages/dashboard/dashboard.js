mobileSJD.config(["$stateProvider", function($stateProvider) {
    $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "/pages/dashboard/dashboard.html",
        controller: "dashboardCtrl"
    });
}])

.controller("dashboardCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$uibModal", "xhrRequestOrigin", "$http", "Constants",
        function($scope, $rootScope, $state, $stateParams, $uibModal, xhrRequestOrigin, $http, Constants) {
            if ($rootScope.enterpriseid == undefined || $rootScope.user == undefined) {
                $state.go("login");
            }


            $scope.status = 0; //none created applied validated
            $scope.message = "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";

            var currentproject_url = xhrRequestOrigin + "/customerproject/isactive.do?enterpriseid=" + $rootScope.enterpriseid;
            $http.get(currentproject_url, {}, {}).success(function(response) {
                $rootScope.project = {};
                $rootScope.project.id = response.idcustomerproject;
                $rootScope.project.status = response.status;
                $rootScope.project.loanid = response.loanid;
                $scope.status = response.status;
            });


            var messageCollection = {
                0: "当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",
                1: "您的基本信息已通过审核,请正式发起贷款申请.",
                2: "您的贷款申请已提交,请耐心等待审核.",
                3: ""
            };

            var callbackCollection = {
                0: function() {},
                1: function() {},
                2: function() {},
                3: function() {
                    $http.get(xhrRequestOrigin + "/api//loanstatement/data.do?action=loan&loanid=" + $rootScope.project.id).success(function(data) {
                        $scope.usedamount = data.value.usedamount;
                        $scope.ratio = data.value.ratio;
                        $scope.amount = parseFloat((data.value.amount / 10000).toFixed(2));
                        var d = new Date(data.value.expireddate);
                        $scope.expireddate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                        $scope.minimum = parseFloat((parseFloat($scope.usedamount) / parseFloat($scope.ratio)).toFixed(0));

                        $http.get(xhrRequestOrigin + "/bankvisit//loan/stockValue.do?loanid=" + $rootScope.project.id).success(function(data1) {
                            $scope.core = parseFloat(data1.totalvalue.toFixed(0));
                            $scope.out = $scope.core - $scope.minimum;
                        });

                    });
                }
            };

            //todo test only
            $scope.changeStatus = function() {
                $scope.status = ($scope.status + 1) % 4;
                $scope.message = messageCollection[$scope.status];
                callbackCollection[$scope.status]();
            };



            $scope.navigate = function(state) {
                if (state === "goodsout") {
                    Constants.estimateTotal = $scope.out;
                }
                $state.go(state);
            };

        }
    ])
    .service("Constants", [function() {
        this.estimateTotal = 0;
    }]);