var mobileMJ=angular.module("mjApp",["ui.router","ui.bootstrap"]);mobileMJ.config(["$urlRouterProvider",function($urlRouterProvider){$urlRouterProvider.when("/","/welcome"),$urlRouterProvider.when("","/welcome"),$urlRouterProvider.otherwise("/welcome")}]),mobileMJ.config(["$stateProvider",function($stateProvider){$stateProvider.state("dashboard",{url:"/dashboard",templateUrl:"/pages/dashboard/dashboard.html",controller:"dashboardCtrl"})}]).controller("dashboardCtrl",["$scope","$state","$stateParams",function($scope,$state,$stateParams){$scope.status=0,$scope.message="当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";var messageCollection={0:"当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",1:"您的基本信息已通过审核,请正式发起贷款申请.",2:"您的贷款申请已提交,请耐心等待审核.",3:""};$scope.changeStatus=function(){$scope.status=($scope.status+1)%4,$scope.message=messageCollection[$scope.status]}}]),mobileMJ.config(["$stateProvider",function($stateProvider){$stateProvider.state("register",{url:"/register",templateUrl:"/pages/register/register.html",controller:"registerCtrl"})}]).controller("registerCtrl",["$scope","$state",function($scope,$state){$scope.register=function(){$state.go("register")}}]),mobileMJ.config(["$stateProvider",function($stateProvider){$stateProvider.state("login",{url:"/login",templateUrl:"/pages/login/login.html",controller:"loginCtrl"})}]).controller("loginCtrl",["$scope","$state",function($scope,$state){$scope.login=function(){$state.go("dashboard")},$scope.toRegister=function(){$state.go("register")}}]),mobileMJ.config(["$stateProvider",function($stateProvider){$stateProvider.state("welcome",{url:"/welcome",templateUrl:"/pages/welcome/welcome.html",controller:"welcomeCtrl"})}]).controller("welcomeCtrl",["$scope","$state",function($scope,$state){$scope.next=function(){$state.go("login")}}]),mobileMJ.directive("mjTopNavBar",[function(){return{restrict:"E",scope:{prevState:"@",prevText:"@",nextState:"@",nextText:"@",navTitle:"@"},link:function(scope,element,attrs){},controller:["$scope","$state",function($scope,$state){$scope.next=function(){$state.go($scope.nextState)},$scope.prev=function(){$state.go($scope.prevState)}}],templateUrl:"/widgets/mjTopNavBar/mjTopNavBar.html"}}]);