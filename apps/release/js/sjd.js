var mobileSJD=angular.module("sjdApp",["ui.router","ui.bootstrap","ui.select","camera"]);mobileSJD.config(["$urlRouterProvider",function($urlRouterProvider){$urlRouterProvider.when("/","/welcome"),$urlRouterProvider.when("","/welcome"),$urlRouterProvider.otherwise("/welcome")}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("application",{url:"/application",templateUrl:"/pages/application/application.html",controller:"applicationCtrl"})}]).controller("applicationCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.durations=[{value:1,name:"一个月"},{value:2,name:"二个月"},{value:3,name:"三个月"}],$scope.usages=[{value:"normal",name:"一般资金周转"}],$scope.marriages=[{value:"yes",name:"已婚"},{value:"no",name:"未婚"}],$scope.selectedDuration=$scope.durations[1].value,$scope.selectedUsage=$scope.usages[0].value,$scope.selectedMarriage=$scope.marriages[0].value,$scope.pictures={idSrc:[],licenseSrc:[],marriageSrc:[],orgSrc:[]},$scope.upload=function(item){$uibModal.open({templateUrl:"/pages/application/upload.html",controller:"uploadCtrl",windowClass:"sjd-page-application-upload-window",backdrop:"static",keyboard:!1,resolve:{item:function(){return item},images:function(){return angular.copy($scope.pictures[item+"Src"])}}}).result.then(function(dataURIs){$scope.pictures[item+"Src"]=dataURIs},function(){})}}]).controller("uploadCtrl",["$scope","$uibModalInstance","item","images","imageReader",function($scope,$uibModalInstance,item,images,imageReader){var map={id:"身份证",license:"营业执照",marriage:"结婚证",org:"组织结构证"};$scope.title="上传资料:"+map[item],$scope.imageURIs=images,$scope.uploadImage=function(){$("input.origin-input").click()},$scope.getImage=function(){imageReader.readImage($scope.imageFile,this).then(function(result){$scope.imageURIs.push(result)})},$scope.submit=function(){$uibModalInstance.close($scope.imageURIs)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]).directive("customOnChange",[function(){return{restrict:"A",link:function(scope,element,attrs){element.bind("change",function(e){scope.imageFile=(event.srcElement||event.target).files[0],scope.getImage()})}}}]).factory("imageReader",["$q",function($q){var onLoad=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.resolve(reader.result)})}},onError=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.reject(reader.result)})}},getReader=function(deferred,scope){var reader=new FileReader;return reader.onload=onLoad(reader,deferred,scope),reader.onerror=onError(reader,deferred,scope),reader},readImage=function(file,scope){var deferred=$q.defer(),reader=getReader(deferred,scope);return reader.readAsDataURL(file),deferred.promise};return{readImage:readImage}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsin",{url:"/goodsin",templateUrl:"/pages/goodsin/goodsin.html",controller:"goodsinCtrl"})}]).controller("goodsinCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsin/add.html",controller:"goodsinAddCtrl",windowClass:"sjd-page-goodsin-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){},function(){})}}]).controller("goodsinAddCtrl",["$scope","$uibModalInstance",function($scope,$uibModalInstance){$scope.submit=function(){$uibModalInstance.close($scope.imageURI)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("dashboard",{url:"/dashboard",templateUrl:"/pages/dashboard/dashboard.html",controller:"dashboardCtrl"})}]).controller("dashboardCtrl",["$scope","$state","$stateParams",function($scope,$state,$stateParams){$scope.status=0,$scope.message="当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";var messageCollection={0:"当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",1:"您的基本信息已通过审核,请正式发起贷款申请.",2:"您的贷款申请已提交,请耐心等待审核.",3:""};$scope.changeStatus=function(){$scope.status=($scope.status+1)%4,$scope.message=messageCollection[$scope.status]},$scope.navigate=function(state){$state.go(state)}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("initial",{url:"/initial",templateUrl:"/pages/initial/initial.html",controller:"initialCtrl"})}]).controller("initialCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.agree=!1,$scope.durations=[{value:1,name:"一个月"},{value:2,name:"二个月"},{value:3,name:"三个月"}],$scope.selectedDuration=$scope.durations[1].value,$scope.showDetail=function(){$uibModal.open({templateUrl:"/pages/initial/agreement.html",controller:"agreementCtrl",windowClass:"sjd-page-initial-agreement-window"})}}]).controller("agreementCtrl",["$scope",function($scope){}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsout",{url:"/goodsout",templateUrl:"/pages/goodsout/goodsout.html",controller:"goodsoutCtrl"})}]).controller("goodsoutCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsout/add.html",controller:"goodsoutAddCtrl",windowClass:"sjd-page-goodsout-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){},function(){})}}]).controller("goodsoutAddCtrl",["$scope","$uibModalInstance",function($scope,$uibModalInstance){$scope.submit=function(){$uibModalInstance.close($scope.imageURI)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("login",{url:"/login",templateUrl:"/pages/login/login.html",controller:"loginCtrl"})}]).controller("loginCtrl",["$scope","$state",function($scope,$state){$scope.login=function(){$state.go("dashboard")},$scope.toRegister=function(){$state.go("register")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyin",{url:"/moneyin",templateUrl:"/pages/moneyin/moneyin.html",controller:"moneyinCtrl"})}]).controller("moneyinCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.date=new Date,$scope.opened=!1,$scope.dateOptions={formatYear:"yy",maxDate:new Date(2020,5,27),minDate:new Date,startingDay:1},$scope.toggleDatePicker=function(){$scope.opened=!$scope.opened}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyout",{url:"/moneyout",templateUrl:"/pages/moneyout/moneyout.html",controller:"moneyoutCtrl"})}]).controller("moneyoutCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.durations=[{value:1,name:"一个月"},{value:2,name:"二个月"},{value:3,name:"三个月"}],$scope.selectedDuration=$scope.durations[1].value}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("welcome",{url:"/welcome",templateUrl:"/pages/welcome/welcome.html",controller:"welcomeCtrl"})}]).controller("welcomeCtrl",["$scope","$state",function($scope,$state){$scope.next=function(){$state.go("login")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("register",{url:"/register",templateUrl:"/pages/register/register.html",controller:"registerCtrl"})}]).controller("registerCtrl",["$scope","$state",function($scope,$state){$scope.register=function(){$state.go("login")}}]),mobileSJD.directive("sjdTopNavBar",[function(){return{restrict:"E",scope:{prevState:"@",prevText:"@",nextState:"@",nextText:"@",navTitle:"@"},link:function(scope,element,attrs){},controller:["$scope","$state",function($scope,$state){$scope.next=function(){$state.go($scope.nextState)},$scope.prev=function(){$state.go($scope.prevState)}}],templateUrl:"/widgets/sjdTopNavBar/sjdTopNavBar.html"}}]);