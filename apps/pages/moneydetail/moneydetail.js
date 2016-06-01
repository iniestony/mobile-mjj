mobileSJD.config(["$stateProvider", "base", function($stateProvider, base) {
    $stateProvider.state("moneydetail", {
        url: "/moneydetail",
        templateUrl: base + "/pages/moneydetail/moneydetail.html",
        controller: "moneydetailCtrl"
    });
}])

.controller("moneydetailCtrl", ["$scope", "$rootScope", "$http", "$state", "xhrRequestOrigin", "base", "$uibModal",
    function($scope, $rootScope, $http, $state, xhrRequestOrigin, base, $uibModal) {

        $scope.details = [];

        function refresh() {
            $http.get(xhrRequestOrigin + "/api/loandetails/data.do?action=list_loan&loanid=" + $rootScope.project.loanid).success(function(data) {
                $scope.details = [];
                for (var i = 0; i < data.value.length; i++) {
                    var obj = {
                        "idloandetail": data.value[i].idloandetail,
                        "amount": parseFloat(parseFloat(data.value[i].amount).toFixed(2)),
                        "repaid": parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
                        "remain": parseFloat(parseFloat(data.value[i].amount).toFixed(2)) - parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),
                        "usedate": getDate(data.value[i].usedate),
                        "repaymentdate": getDate(data.value[i].repaymentdate),
                        "interest": parseFloat(data.value[i].interest),
                        "repaying": parseFloat(parseFloat(data.value[i].repaying).toFixed(2))
                    };
                    obj.current = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(data.value[i].usedate.substring(0, 10)), new Date()) + 1) / 360)).toFixed(2));
                    obj.expire = parseFloat((obj.remain + (obj.remain * obj.interest * (daysInterval(new Date(data.value[i].usedate.substring(0, 10)), new Date(data.value[i].repaymentdate.substring(0, 10))) + 1) / 360)).toFixed(2));
                    $scope.details.push(obj);
                }
            });
        }

        refresh();

        $scope.repay = function(detail) {
            $uibModal.open({
                templateUrl: base + "/pages/moneydetail/repay.html",
                controller: "repayCtrl",
                windowClass: "sjd-page-moneydetail-repay-window",
                backdrop: "static",
                keyboard: false,
                resolve: {
                    detail: function() {
                        return angular.copy(detail);
                    }
                }
            }).result.then(function() {
                refresh();
            }, function() {});
        };

        $scope.apply = function() {
            $state.go("moneyout");
        };

        function getDate(str) {
            var d = new Date(str.substring(0, 10));
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }

        function daysInterval(d1, d2) {
            return parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        }

    }
])

.controller("repayCtrl", ["$scope", "$rootScope", "$uibModalInstance", "$http", "detail", "xhrRequestOrigin", "sjdDialog",
    function($scope, $rootScope, $uibModalInstance, $http, detail, xhrRequestOrigin, sjdDialog) {

        $scope.detail = detail;

        function formatDate(str) {
            var list = str.split("-");
            list[1] = (list[1].length === 1) ? "0" + list[1] : list[1];
            list[2] = (list[2].length === 1) ? "0" + list[2] : list[2];
            return list.join("-");
        }

        $scope.date = new Date(formatDate($scope.detail.usedate));
        $scope.opened = false;
        $scope.repayAmount = 0;
        $scope.estimate = 0;

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(formatDate($scope.detail.repaymentdate)),
            minDate: new Date(formatDate($scope.detail.usedate)),
            startingDay: 1
        };

        function daysInterval(d1, d2) {
            return parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        }

        $scope.toggleDatePicker = function() {
            $scope.opened = !$scope.opened;
        };

        $scope.updateEstimate = function() {
            $scope.estimate = 0;
            if (($scope.repayAmount > 0) && $scope.date) {
                $scope.estimate = parseFloat(($scope.repayAmount + ($scope.repayAmount * $scope.detail.interest * (daysInterval(new Date(formatDate($scope.detail.usedate)), $scope.date) + 1) / 360)).toFixed(2));
            }
        };

        $scope.submit = function() {
            if (($scope.repayAmount > 0) && $scope.date) {
                var fullDate = $scope.date.getFullYear() + "/" + ($scope.date.getMonth() + 1) + "/" + $scope.date.getDate();
                $http.post(xhrRequestOrigin + "/actionon/loan/repayapply.do?enterpriseid=" + $rootScope.enterpriseid + "&loanid=" + $rootScope.project.loanid +
                    "&ref=" + $scope.detail.idloandetail +
                    "&repaying=" + $scope.repayAmount +
                    "&usedate=" + fullDate, {}, {
                        "transformResponse": function(v) {
                            return v;
                        }
                    }
                ).success(function() {
                    $uibModalInstance.close();
                }).error(function(msg) {
                    sjdDialog.open("Error", msg);
                });
            } else {
                sjdDialog.open("Info", "请为还款金额以及还款时间输入有效值");
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };


    }
]);