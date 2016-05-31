mobileSJD.config(["$stateProvider", function($stateProvider) {
    $stateProvider.state("goodsin", {
        url: "/goodsin",
        templateUrl: "/pages/goodsin/goodsin.html",
        controller: "goodsinCtrl"
    });
}])

.controller("goodsinCtrl", ["$scope", "$rootScope", "$state", "$uibModal", "$http", "xhrRequestOrigin", "sjdDialog",
    function($scope, $rootScope, $state, $uibModal, $http, xhrRequestOrigin, sjdDialog) {

        $scope.products = [];

        $scope.stockname = "";
        $scope.contact = "";
        $scope.phone = "";
        $scope.memo = "";

        $scope.submit = function() {
            var requestData = {
                "header": {
                    "contact": $scope.contact,
                    "phone": $scope.phone,
                    "stockname": $scope.stockname,
                    "memo": $scope.memo,
                    "creator": $rootScope.user.name
                },
                "details": []
            };
            for (var i = 0; i < $scope.products.length; i++) {
                requestData.details.push({
                    "erpid": $scope.products[i].erpid,
                    "name": $scope.products[i].name,
                    "count": $scope.products[i].count
                });
            }
            var url = xhrRequestOrigin + "/stockpost/sjd/entryPush.do?enterpriseid=" + $rootScope.enterpriseid;
            url = url + "&data=" + JSON.stringify(requestData);

            $http.post(url).success(function() {
                $state.go("dashboard");
            }).error(function(msg) {
                sjdDialog.open("Error", msg);
            });
        };

        $scope.addGoods = function() {
            $uibModal.open({
                templateUrl: "/pages/goodsin/add.html",
                controller: "goodsinAddCtrl",
                windowClass: "sjd-page-goodsin-add-window",
                backdrop: "static",
                keyboard: false
            }).result.then(function(data) {
                var existingIDs = $scope.products.map(function(p) {
                    return p.erpid;
                });
                for (var i = 0; i < data.length; i++) {
                    if (existingIDs.indexOf(data[i].erpid) < 0) {
                        $scope.products.push({
                            "erpid": data[i].erpid,
                            "name": data[i].name,
                            "count": 0
                        });
                    }
                }
            }, function() {});
        };

        $scope.deleteProduct = function(index) {
            $scope.products.splice(index, 1);
        };



    }
])

.controller("goodsinAddCtrl", ["$scope", "$rootScope", "$uibModalInstance", "$http", "xhrRequestOrigin", "sjdDialog",
    function($scope, $rootScope, $uibModalInstance, $http, xhrRequestOrigin, sjdDialog) {


        $scope.productName = "";
        $scope.newProduct = "";
        $scope.products = [];

        $scope.addNew = function() {
            var newID;
            var ids = $scope.products.map(function(p) {
                return p.erpid;
            });

            do {
                var r1, r2;
                r1 = Math.ceil(Math.random() * 9);
                r2 = Math.ceil(Math.random() * 9);
                var d = new Date();
                newID = (d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + r1 + r2;
            } while (ids.indexOf(newID) >= 0);

            $scope.products.push({
                "erpid": newID,
                "name": $scope.newProduct,
                "selected": true
            });
        };

        $scope.search = function() {
            var url = xhrRequestOrigin + "/stockproducts/customerproducts/list.do?enterpriseid=" + $rootScope.enterpriseid;
            if ($scope.productName !== "") {
                url = url + "&productname=" + $scope.productName;
            }

            $http.get(url).success(function(data) {
                $scope.products = JSON.parse(data.value);
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.products[i].selected = false;
                }
            }).error(function(msg) {
                sjdDialog.open("Error", msg);
            });
        };


        $scope.submit = function() {
            var result = $scope.products.filter(function(item) {
                return item.selected;
            }).map(function(n_item) {
                return {
                    "erpid": n_item.erpid,
                    "name": n_item.name
                };
            });
            $uibModalInstance.close(result);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };


    }
]);