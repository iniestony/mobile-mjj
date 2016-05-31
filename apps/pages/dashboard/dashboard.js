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
                $scope.message = messageCollection[$scope.status];
                $rootScope.project.intention = {};
                if (response.othersObject!=undefined&&response.othersObject.amount!=undefined) {
                    $rootScope.project.intention.amount = response.othersObject.amount;
                    $rootScope.project.intention.duration = response.othersObject.duration;
                    $rootScope.project.intention.usage = response.othersObject.usereason;
                }
                callbackCollection[$scope.status]();
            });


            var messageCollection = {
                1: "请填写初步调查问卷并提交",
                2: "您的基本情况已提交，请等待工作人员的核实",
                18: "您的贷款申请已提交,请耐心等待审核",
                12: "您的贷款申请已提交,请耐心等待审核",
                19: "您的贷款申请已提交,请耐心等待审核",
                16: "您的贷款申请已提交,请耐心等待审核",
                181: "很抱歉，我们暂时无法为您提供服务",
                20: "恭喜您！您的贷款意向已通过数据贷评估，请发起正式申请",
                21: "您正在进行贷款申请，请填写完整的申请表并提交",
                22: "您的贷款资料审核不通过，请补充、修改贷款资料",
                262: "非常抱歉, 您的贷款申请被拒绝",
                8: "非常抱歉, 您的贷款申请被拒绝",
                23: "您的贷款申请已提交资金方审批，请耐心等候",
                260: "您的贷款申请已提交资金方审批，请耐心等候",
                26: "您的贷款申请已提交资金方审批，请耐心等候",
                27: "恭喜您！您的贷款已通过资金方审批",
                5: "",
                35: "",
                79: ""

            };

            var callbackCollection = {
                1: function() {},
                2: function() {},
                18: function() {},
                12: function() {},
                19: function() {},
                16: function() {},
                181: function() {},
                20: function() {},
                21: function() {},
                22: function() {},
                262: function() {},
                8: function() {},
                23: function() {},
                260: function() {},
                26: function() {},
                27: function() {},
                5: function() {
                    $http.get(xhrRequestOrigin + "/api//loanstatement/data.do?action=loan&loanid=" + $rootScope.project.loanid).success(function(data) {
                        $scope.usedamount = data.value.usedamount;
                        $scope.ratio = data.value.ratio;
                        $scope.amount = parseFloat((data.value.amount / 10000).toFixed(2));
                        var d = new Date(data.value.expireddate);
                        $scope.expireddate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                        $scope.minimum = parseFloat((parseFloat($scope.usedamount) / parseFloat($scope.ratio)).toFixed(0));

                        $http.get(xhrRequestOrigin + "/bankvisit//loan/stockValue.do?loanid=" + $rootScope.project.loanid).success(function(data1) {
                            $scope.core = parseFloat(data1.totalvalue.toFixed(0));
                            $scope.out = $scope.core - $scope.minimum;
                        });

                    });
                },
                35: function() {},
                79: function() {},
            };

            // //todo test only
            // $scope.changeStatus = function() {
            //     $scope.status = ($scope.status + 1) % 4;
            //    
            //     callbackCollection[$scope.status]();
            // };



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