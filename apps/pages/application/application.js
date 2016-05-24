mobileSJD.config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("application", {
            url: "/application",
            templateUrl: "/pages/application/application.html",
            controller: "applicationCtrl"
        });
    }])
    .controller("applicationCtrl", ["$scope", "$state", "$uibModal", "$http", "xhrRequestOrigin", function($scope, $state, $uibModal, $http, xhrRequestOrigin) {
        $scope.personItems = [
            { "key": "fullname", "value": "", "name": "姓名", "show": false, "options": [] },
            { "key": "gender", "value": "", "name": "性别", "show": false, "options": [] },
            { "key": "uid", "value": "", "name": "身份证", "show": false, "options": [] },
            { "key": "mobile", "value": "", "name": "手机号", "show": false, "options": [] },
            { "key": "graduate", "value": "", "name": "毕业院校", "show": false, "options": [] },
            { "key": "liveaddress", "value": "", "name": "现居住地址", "show": false, "options": [] },
            { "key": "huji", "value": "", "name": "户籍", "show": false, "options": [] },
            { "key": "houseproperty", "value": "", "name": "现居房产属性", "show": false, "options": [] },
            { "key": "carnum", "value": "", "name": "车辆数量", "show": false, "options": [] },
            { "key": "housenum", "value": "", "name": "房产数量", "show": false, "options": [] },
            { "key": "marriage", "value": "", "name": "婚姻状况", "show": false, "options": [] },
            { "key": "spousename", "value": "", "name": "配偶姓名", "show": false, "options": [] },
            { "key": "housevalue", "value": "", "name": "房产净值", "show": false, "options": [] },
            { "key": "spouseid", "value": "", "name": "配偶身份证号", "show": false, "options": [] },
            { "key": "spousework", "value": "", "name": "配偶从事工作", "show": false, "options": [] },
            { "key": "familynum", "value": "", "name": "家庭总人口", "show": false, "options": [] },
            { "key": "percourt", "value": "", "name": "法院执行情况", "show": false, "options": [] },
            { "key": "ispsninsurance", "value": "", "name": "有无人财保险", "show": false, "options": [] },
            { "key": "workinityears", "value": "", "name": "从事该行业年限", "show": false, "options": [] },
            { "key": "shareproportion", "value": "", "name": "企业占股比例", "show": false, "options": [] }
        ];

        $scope.enterpriseItems = [
            { "key": "enterprisename", "value": "", "name": "公司全称", "show": false, "options": [] },
            { "key": "yearlysales", "value": "", "name": "年化销售额", "show": false, "options": [] },
            { "key": "registeredcapital", "value": "", "name": "注册资本", "show": false, "options": [] },
            { "key": "scope", "value": "", "name": "经营范围", "show": false, "options": [] },
            { "key": "legalrepresentative", "value": "", "name": "法人", "show": false, "options": [] },
            { "key": "operator", "value": "", "name": "实际经营者", "show": false, "options": [] },
            { "key": "acturaladdress", "value": "", "name": "实际经营地址", "show": false, "options": [] },
            { "key": "industry", "value": "", "name": "经济行业", "show": false, "options": [] },
            { "key": "address", "value": "", "name": "企业地址", "show": false, "options": [] },
            { "key": "registereddate", "value": "", "name": "工商注册时间", "show": false, "options": [] },
            { "key": "salestype", "value": "", "name": "销售类型", "show": false, "options": [] },
            { "key": "enterprisetype", "value": "", "name": "企业类型", "show": false, "options": [] },
            { "key": "onlinestores", "value": "", "name": "网上商店", "show": false, "options": [] },
            { "key": "physicalstores", "value": "", "name": "实体店", "show": false, "options": [] },
            { "key": "hallstores", "value": "", "name": "商场专柜", "show": false, "options": [] },
            { "key": "salesvolume", "value": "", "name": "销售规模", "show": false, "options": [] },
            { "key": "factoryproperty", "value": "", "name": "生产场地性质", "show": false, "options": [] },
            { "key": "salesarea", "value": "", "name": "主要销售地区", "show": false, "options": [] },
            { "key": "employeenum", "value": "", "name": "员工人数", "show": false, "options": [] },
            { "key": "orgnizationtype", "value": "", "name": "组织形式", "show": false, "options": [] },
            { "key": "top10operatingrate", "value": "", "name": "十大客户营业率", "show": false, "options": [] },
            { "key": "ledgeperiod", "value": "", "name": "应收款账期", "show": false, "options": [] },
            { "key": "insurance", "value": "", "name": "是否购买保险", "show": false, "options": [] }
        ];

        $scope.loanItems = [
            { "key": "personelloan", "value": "", "name": "个人银行融资", "show": false, "options": [] },
            { "key": "personelguarangee", "value": "", "name": "个人对外担保", "show": false, "options": [] },
            { "key": "bankloanamount", "value": "", "name": "银行融资金额", "show": false, "options": [] },
            { "key": "guaranteednum", "value": "", "name": "对外担保家数", "show": false, "options": [] },
            { "key": "guranteedamount", "value": "", "name": "对外担保金额", "show": false, "options": [] },
            { "key": "nonbankloanamount", "value": "", "name": "非银行融资", "show": false, "options": [] },
            { "key": "defaultpayments", "value": "", "name": "违约还款", "show": false, "options": [] }
        ];

        $scope.extraItems = [
            { "key": "paymentSource", "value": "", "name": "还款来源", "show": false, "options": [] }
        ];

        var preservedBean = {};
        var beanKeys = ["personalinfo", "enterpriseinfo", "loaninfo", "extrainfo"];
        var scopeKeys = ["personItems", "enterpriseItems", "loanItems", "extraItems"];

        $scope.showTitle = function(array) {
            var show = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i].show) {
                    show = true;
                    break;
                }
            }
            return show;
        };

        $scope.parsePerson = function(item) {
            if (item.key === "marriage") {
                $scope.personItems[11].show = $scope.personItems[11].preservedShow && item.value === "已婚";
                $scope.personItems[13].show = $scope.personItems[13].preservedShow && item.value === "已婚";
                $scope.personItems[14].show = $scope.personItems[14].preservedShow && item.value === "已婚";
            }
        };


        $http.get(xhrRequestOrigin + "/loanapplication/app/form/getform.do?customerprojectid=147").success(function(data) {
            preservedBean = angular.copy(data.bean);
            for (var i = 0; i < beanKeys.length; i++) {
                if (data.bean[beanKeys[i]] && typeof data.bean[beanKeys[i]] === "object") {
                    $scope[scopeKeys[i]].forEach(function(item) {
                        item.show = data.bean[beanKeys[i]].hasOwnProperty(item.key);
                        item.preservedShow = data.bean[beanKeys[i]].hasOwnProperty(item.key); //为了联动
                        item.value = data.bean[beanKeys[i]][item.key];
                        if (data.selections && typeof data.selections === "object" &&
                            data.selections.hasOwnProperty(item.key) &&
                            Object.keys(data.selections[item.key]).length > 0
                        ) {
                            item.options = [];
                            for (var k in data.selections[item.key]) {
                                item.options.push({ "name": k, "value": data.selections[item.key][k] });
                            }
                            if (!item.value) {
                                item.value = item.options[0].value;
                            }
                        } else {
                            item.options = [];
                        }
                    });
                    //init marriage options
                    if (scopeKeys[i] === "personItems") {
                        $scope.personItems[11].show = $scope.personItems[11].preservedShow && $scope.personItems[10].value === "已婚";
                        $scope.personItems[13].show = $scope.personItems[13].preservedShow && $scope.personItems[10].value === "已婚";
                        $scope.personItems[14].show = $scope.personItems[14].preservedShow && $scope.personItems[10].value === "已婚";
                    }
                }
            }
        });

        $scope.pictures = {

        };
        $scope.keys = [];

        $scope.upload = function(item) {
            $uibModal.open({
                templateUrl: "/pages/application/upload.html",
                controller: "uploadCtrl",
                windowClass: "sjd-page-application-upload-window",
                backdrop: "static",
                keyboard: false,
                resolve: {
                    item: function() {
                        return item;
                    },
                    images: function() {
                        return angular.copy($scope.pictures[item + "Src"].images);
                    }
                }
            }).result.then(function(dataURIs) {
                $scope.pictures[item + "Src"].images = dataURIs;
            }, function() {});
        };
        $scope.toStep2 = function() {
            $scope.step = 2;
        };
        $scope.toStep1 = function() {
            saveForm();
            $scope.step = 1;
        };
        $scope.toStep3 = function() {
            saveForm();
            $scope.step = 3;
            $scope.pictures = {};
            $scope.keys = [];
          $http.get(xhrRequestOrigin + "/loanapplicationdoc/app/loandocs/show.do?customerprojectid=147").success(function(data) {
            $scope.keys = Object.keys(data);
            $scope.keys.forEach(function(k){
              $scope.pictures[k + "Src"] = {
                "name": data[k].name,
                "images": []
              };
              for(var i in data[k].files){
                $scope.pictures[k + "Src"].images.push({
                  "name": i,
                  "uri": xhrRequestOrigin + "/" + data[k].files[i]
                });
              }
            });
          });
        };



        var saveForm = function() {
            for (var i = 0; i < beanKeys.length; i++) {
                if (preservedBean[beanKeys[i]] && typeof preservedBean[beanKeys[i]] === "object") {
                    $scope[scopeKeys[i]].forEach(function(item) {
                        preservedBean[beanKeys[i]][item.key] = item.value;
                    });
                }
            }
            $http({
                "method": "POST",
                "url": xhrRequestOrigin + "/loanapplication/loanmobile/saveform.do?customerprojectid=147",
                "data": preservedBean
            });
            // .success(function() {
            //     $state.go("dashboard");
            // });
        }
        $scope.submit = function() {
            // saveForm();
          var locks = {};
          for(var i=0;i<$scope.keys.length;i++){
            (function (index){
              locks[$scope.keys[index]] = false;
              var files = {};
              for(var j=0;j<$scope.pictures[$scope.keys[index] + "Src"].images.length;j++){
                files[$scope.pictures[$scope.keys[index] + "Src"].images[j].name] = $scope.pictures[$scope.keys[index] + "Src"].images[j].uri;
              }
              var url = xhrRequestOrigin + "/loanapplicationdoc/app/applydoc/upload.do?customerprojectid=147&idchecklist=" +
                $scope.keys[index] + "&files=" + JSON.stringify(files);
              $http({
                "method": "POST",
                "url": url
              }).success(function(){
                locks[$scope.keys[index]] = true;
                var checked = true;
                for(var l in locks){
                  checked = checked && locks[l];
                }
                if(checked){
                  $state.go("dashboard");
                }
              });
            })(i);
          }
        };
    }])
    .controller("uploadCtrl", ["$scope", "$uibModalInstance","$http","xhrRequestOrigin","item", "images", "imageReader", function($scope, $uibModalInstance,$http,xhrRequestOrigin, item, images, imageReader) {
        $scope.title = "上传资料";

        $scope.images = images;

        $scope.removeImage = function(image) {
            $scope.images = $scope.images.reduce(function(prev, next) {
                if (image.name !== next.name) {
                    prev.push(next);
                }
                return prev;
            }, []);
        };

        $scope.uploadImage = function() {
            $("input.origin-input").click();
        };

        $scope.getImage = function() {
            imageReader.readImage($scope.imageFile, this).then(function(result) {
                $scope.images.push({
                  "name": $scope.imageFile.name,
                  "uri": result
                });
            });
        };

        $scope.submit = function() {
            $uibModalInstance.close($scope.images);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };


    }])
    .directive("customOnChange", [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.bind("change", function(e) {
                    scope.imageFile = (event.srcElement || event.target).files[0];
                    scope.getImage();
                });
            }
        };
    }])
    .factory("imageReader", ["$q", function($q) {
        var onLoad = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
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