mobileSJD.config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("register", {
            url: "/register",
            templateUrl: "/pages/register/register.html",
            controller: "registerCtrl"
        });
    }])
    .controller("registerCtrl", ["$scope", "$rootScope", "$state", "$http", "xhrRequestOrigin", "sjdDialog",
        function($scope, $rootScope, $state, $http, xhrRequestOrigin, sjdDialog) {

            var isMobile = function(mobile) {
                if (mobile == undefined) return false;
                if (!angular.isNumber(mobile)) return false;
                if ((mobile + '').length != 11) return false;
                if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(mobile + '')) return false;
                return true;
            }

            $scope.mobilevalid_check = function() {
                    if (!isMobile($scope.mobile)) {
                        $scope.code_send = false;
                    } else {
                        $scope.code_send = true;
                    }
                }
                /**
                 *发送手机验证码
                 **/
            $scope.sendMobileCode = function() {
                var mobilecode_url = xhrRequestOrigin + "/default/mobileverify.do?"; //TODO 手机验证码发送url
                $http.get(mobilecode_url + 'mobile=' + $scope.mobile)
                    .success(function(response) {
                        console.log(response);
                        $scope.code = response;
                    })
                    .error(function(response, status) {
                        console.log(response);
                    });
            };

            $scope.register = function() {
                var registerUrl = xhrRequestOrigin + "/default/mobileregister.do?from=HDD&"; //货抵贷注册
                var formData = {}
                formData.title = $scope.name + $scope.title;
                formData.mobile = $scope.mobile;
                formData.password = $scope.pwd;
                formData.code = $scope.mobile_checknum;
                $http({　　
                        method: 'POST',
                        　　url: registerUrl,
                        params: formData
                    }).success(function(response) {
                        //直接登录
                        var url = xhrRequestOrigin + "/default/mobilelogin.do";
                        $http({　　
                            method: 'POST',
                            　　url: url,
                            params: {
                                "username": $scope.mobile,
                                "password": $scope.pwd
                            }
                        }).success(function(data) {
                            if (data != null) {
                                $rootScope.user = {};
                                console.log(data);
                                $rootScope.user = data;
                                if (data.typeid == 9) { //借款用户
                                    $rootScope.enterpriseid = data.typeref;
                                }
                                $state.go("dashboard");
                            };

                        }).error(function(msg) {
                            sjdDialog.open("Error", msg);
                        });
                    })
                    .error(function(response, status) {
                        sjdDialog.open("Error", response);
                    });

            }


            // $scope.register = function() {
            //     $state.go("login");
            // };

        }
    ]);