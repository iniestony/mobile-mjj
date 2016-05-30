mobileSJD.config(["$stateProvider", function($stateProvider) {
    $stateProvider.state("moneyout", {
        url: "/moneyout",
        templateUrl: "/pages/moneyout/moneyout.html",
        controller: "moneyoutCtrl"
    });
}])

.controller("moneyoutCtrl", ["$scope", "$rootScope", "$state", "$http", "xhrRequestOrigin", "sjdDialog",
    function($scope, $rootScope, $state, $http, xhrRequestOrigin, sjdDialog) {

        $http.get(xhrRequestOrigin + "/api//loanstatement/data.do?action=loan&loanid=" + $rootScope.project.loanid).success(function(data) {
            $scope.usedamount = parseFloat(data.value.usedamount.toFixed(2));
            $scope.ratio = data.value.ratio;
            $scope.interest = data.value.interest;
            $scope.amount = parseFloat(data.value.amount.toFixed(2));
            $scope.remain = $scope.amount - $scope.usedamount;
            var d = new Date(data.value.expireddate);
            $scope.expireddate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        });

        $scope.applyAmount = 0;
        $scope.remark = "";

        $scope.durations = [{ "value": "3个月", "name": "3个月" }, { "value": "6个月", "name": "6个月" }, { "value": "12个月", "name": "12个月" }];
        $scope.selectedDuration = $scope.durations[0].value;

        $scope.submit = function() {
            if ($scope.applyAmount > 0) {
                var url = xhrRequestOrigin + "/actionafter/applyuse/loandetails.do?customerprojectid=" + $rootScope.project.id +
                    "&amount=" + $scope.applyAmount +
                    "&reriodtime=" + $scope.selectedDuration;
                if ($scope.remark !== "") {
                    url = url + "&remark=" + $scope.remark;
                }
                $http.post(url, {}, {
                    "transformResponse": function(v) {
                        return v;
                    }
                }).success(function() {
                    $state.go("dashboard");
                }).error(function(msg) {
                    sjdDialog.open("Error", msg);
                });
            } else {
                sjdDialog.open("Info", "使用额度必须大于0");
            }
        };

    }
]);