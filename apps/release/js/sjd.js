var mobileSJD=angular.module("sjdApp",["ui.router","ui.bootstrap","ui.select","camera"]);mobileSJD.config(["$urlRouterProvider",function($urlRouterProvider){$urlRouterProvider.when("/","/welcome"),$urlRouterProvider.when("","/welcome"),$urlRouterProvider.otherwise("/welcome")}]).constant("xhrRequestOrigin","http://test.sjdbank.com:8787"),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("application",{url:"/application",templateUrl:"/pages/application/application.html",controller:"applicationCtrl"})}]).controller("applicationCtrl",["$scope","$state","$uibModal","$http","xhrRequestOrigin",function($scope,$state,$uibModal,$http,xhrRequestOrigin){$scope.personItems=[{key:"fullname",value:"",name:"姓名",show:!1,options:[]},{key:"gender",value:"",name:"性别",show:!1,options:[]},{key:"uid",value:"",name:"身份证",show:!1,options:[]},{key:"mobile",value:"",name:"手机号",show:!1,options:[]},{key:"graduate",value:"",name:"毕业院校",show:!1,options:[]},{key:"liveaddress",value:"",name:"现居住地址",show:!1,options:[]},{key:"huji",value:"",name:"户籍",show:!1,options:[]},{key:"houseproperty",value:"",name:"现居房产属性",show:!1,options:[]},{key:"carnum",value:"",name:"车辆数量",show:!1,options:[]},{key:"housenum",value:"",name:"房产数量",show:!1,options:[]},{key:"marriage",value:"",name:"婚姻状况",show:!1,options:[]},{key:"spousename",value:"",name:"配偶姓名",show:!1,options:[]},{key:"housevalue",value:"",name:"房产净值",show:!1,options:[]},{key:"spouseid",value:"",name:"配偶身份证号",show:!1,options:[]},{key:"spousework",value:"",name:"配偶从事工作",show:!1,options:[]},{key:"familynum",value:"",name:"家庭总人口",show:!1,options:[]},{key:"percourt",value:"",name:"法院执行情况",show:!1,options:[]},{key:"ispsninsurance",value:"",name:"有无人财保险",show:!1,options:[]},{key:"workinityears",value:"",name:"从事该行业年限",show:!1,options:[]},{key:"shareproportion",value:"",name:"企业占股比例",show:!1,options:[]}],$scope.enterpriseItems=[{key:"enterprisename",value:"",name:"公司全称",show:!1,options:[]},{key:"yearlysales",value:"",name:"年化销售额",show:!1,options:[]},{key:"registeredcapital",value:"",name:"注册资本",show:!1,options:[]},{key:"scope",value:"",name:"经营范围",show:!1,options:[]},{key:"legalrepresentative",value:"",name:"法人",show:!1,options:[]},{key:"operator",value:"",name:"实际经营者",show:!1,options:[]},{key:"acturaladdress",value:"",name:"实际经营地址",show:!1,options:[]},{key:"industry",value:"",name:"经济行业",show:!1,options:[]},{key:"address",value:"",name:"企业地址",show:!1,options:[]},{key:"registereddate",value:"",name:"工商注册时间",show:!1,options:[]},{key:"salestype",value:"",name:"销售类型",show:!1,options:[]},{key:"enterprisetype",value:"",name:"企业类型",show:!1,options:[]},{key:"onlinestores",value:"",name:"网上商店",show:!1,options:[]},{key:"physicalstores",value:"",name:"实体店",show:!1,options:[]},{key:"hallstores",value:"",name:"商场专柜",show:!1,options:[]},{key:"salesvolume",value:"",name:"销售规模",show:!1,options:[]},{key:"factoryproperty",value:"",name:"生产场地性质",show:!1,options:[]},{key:"salesarea",value:"",name:"主要销售地区",show:!1,options:[]},{key:"employeenum",value:"",name:"员工人数",show:!1,options:[]},{key:"orgnizationtype",value:"",name:"组织形式",show:!1,options:[]},{key:"top10operatingrate",value:"",name:"十大客户营业率",show:!1,options:[]},{key:"ledgeperiod",value:"",name:"应收款账期",show:!1,options:[]},{key:"insurance",value:"",name:"是否购买保险",show:!1,options:[]}],$scope.loanItems=[{key:"personelloan",value:"",name:"个人银行融资",show:!1,options:[]},{key:"personelguarangee",value:"",name:"个人对外担保",show:!1,options:[]},{key:"bankloanamount",value:"",name:"银行融资金额",show:!1,options:[]},{key:"guaranteednum",value:"",name:"对外担保家数",show:!1,options:[]},{key:"guranteedamount",value:"",name:"对外担保金额",show:!1,options:[]},{key:"nonbankloanamount",value:"",name:"非银行融资",show:!1,options:[]},{key:"defaultpayments",value:"",name:"违约还款",show:!1,options:[]}],$scope.extraItems=[{key:"paymentSource",value:"",name:"还款来源",show:!1,options:[]}];var preservedBean={},beanKeys=["personalinfo","enterpriseinfo","loaninfo","extrainfo"],scopeKeys=["personItems","enterpriseItems","loanItems","extraItems"];$scope.showTitle=function(array){for(var show=!1,i=0;i<array.length;i++)if(array[i].show){show=!0;break}return show},$scope.parsePerson=function(item){"marriage"===item.key&&($scope.personItems[11].show=$scope.personItems[11].preservedShow&&"已婚"===item.value,$scope.personItems[13].show=$scope.personItems[13].preservedShow&&"已婚"===item.value,$scope.personItems[14].show=$scope.personItems[14].preservedShow&&"已婚"===item.value)},$http.get(xhrRequestOrigin+"/loanapplication/app/form/getform.do?customerprojectid=147").success(function(data){preservedBean=angular.copy(data.bean);for(var i=0;i<beanKeys.length;i++)data.bean[beanKeys[i]]&&"object"==typeof data.bean[beanKeys[i]]&&($scope[scopeKeys[i]].forEach(function(item){if(item.show=data.bean[beanKeys[i]].hasOwnProperty(item.key),item.preservedShow=data.bean[beanKeys[i]].hasOwnProperty(item.key),item.value=data.bean[beanKeys[i]][item.key],data.selections&&"object"==typeof data.selections&&data.selections.hasOwnProperty(item.key)&&Object.keys(data.selections[item.key]).length>0){item.options=[];for(var k in data.selections[item.key])item.options.push({name:k,value:data.selections[item.key][k]});item.value||(item.value=item.options[0].value)}else item.options=[]}),"personItems"===scopeKeys[i]&&($scope.personItems[11].show=$scope.personItems[11].preservedShow&&"已婚"===$scope.personItems[10].value,$scope.personItems[13].show=$scope.personItems[13].preservedShow&&"已婚"===$scope.personItems[10].value,$scope.personItems[14].show=$scope.personItems[14].preservedShow&&"已婚"===$scope.personItems[10].value))}),$scope.pictures={idSrc:[],licenseSrc:[],marriageSrc:[],orgSrc:[]},$scope.upload=function(item){$uibModal.open({templateUrl:"/pages/application/upload.html",controller:"uploadCtrl",windowClass:"sjd-page-application-upload-window",backdrop:"static",keyboard:!1,resolve:{item:function(){return item},images:function(){return angular.copy($scope.pictures[item+"Src"])}}}).result.then(function(dataURIs){$scope.pictures[item+"Src"]=dataURIs},function(){})},$scope.submit=function(){for(var i=0;i<beanKeys.length;i++)preservedBean[beanKeys[i]]&&"object"==typeof preservedBean[beanKeys[i]]&&$scope[scopeKeys[i]].forEach(function(item){preservedBean[beanKeys[i]][item.key]=item.value});$http({method:"POST",url:xhrRequestOrigin+"/loanapplication/loanmobile/saveform.do?customerprojectid=147",data:preservedBean}).success(function(){$state.go("dashboard")})}}]).controller("uploadCtrl",["$scope","$uibModalInstance","item","images","imageReader",function($scope,$uibModalInstance,item,images,imageReader){var map={id:"身份证",license:"营业执照",marriage:"结婚证",org:"组织结构证"};$scope.title="上传资料:"+map[item],$scope.imageURIs=images,$scope.removeImage=function(image){$scope.imageURIs=$scope.imageURIs.reduce(function(prev,next){return image!==next&&prev.push(next),prev},[])},$scope.uploadImage=function(){$("input.origin-input").click()},$scope.getImage=function(){imageReader.readImage($scope.imageFile,this).then(function(result){$scope.imageURIs.push(result)})},$scope.submit=function(){$uibModalInstance.close($scope.imageURIs)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]).directive("customOnChange",[function(){return{restrict:"A",link:function(scope,element,attrs){element.bind("change",function(e){scope.imageFile=(event.srcElement||event.target).files[0],scope.getImage()})}}}]).factory("imageReader",["$q",function($q){var onLoad=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.resolve(reader.result)})}},onError=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.reject(reader.result)})}},getReader=function(deferred,scope){var reader=new FileReader;return reader.onload=onLoad(reader,deferred,scope),reader.onerror=onError(reader,deferred,scope),reader},readImage=function(file,scope){var deferred=$q.defer(),reader=getReader(deferred,scope);return reader.readAsDataURL(file),deferred.promise};return{readImage:readImage}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("dashboard",{url:"/dashboard",templateUrl:"/pages/dashboard/dashboard.html",controller:"dashboardCtrl"})}]).controller("dashboardCtrl",["$scope","$state","$stateParams","$uibModal","xhrRequestOrigin","$http",function($scope,$state,$stateParams,$uibModal,xhrRequestOrigin,$http){$scope.status=0,$scope.message="当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";var messageCollection={0:"当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",1:"您的基本信息已通过审核,请正式发起贷款申请.",2:"您的贷款申请已提交,请耐心等待审核.",3:""},callbackCollection={0:function(){},1:function(){},2:function(){},3:function(){$http.get(xhrRequestOrigin+"/api//loanstatement/data.do?loanid=152&action=loan").success(function(data){$scope.usedamount=data.value.usedamount,$scope.ratio=data.value.ratio,$scope.amount=parseFloat((data.value.amount/1e4).toFixed(2));var d=new Date(data.value.expireddate);$scope.expireddate=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),$scope.minimum=parseFloat((parseFloat($scope.usedamount)/parseFloat($scope.ratio)).toFixed(0)),$http.get(xhrRequestOrigin+"/bankvisit//loan/stockValue.do?loanid=238").success(function(data1){$scope.core=parseFloat(data1.totalvalue.toFixed(0)),$scope.out=$scope.core-$scope.minimum})})}};$scope.changeStatus=function(){$scope.status=($scope.status+1)%4,$scope.message=messageCollection[$scope.status],callbackCollection[$scope.status]()},$scope.navigate=function(state){$state.go(state)}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsin",{url:"/goodsin",templateUrl:"/pages/goodsin/goodsin.html",controller:"goodsinCtrl"})}]).controller("goodsinCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsin/add.html",controller:"goodsinAddCtrl",windowClass:"sjd-page-goodsin-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){},function(){})}}]).controller("goodsinAddCtrl",["$scope","$uibModalInstance",function($scope,$uibModalInstance){$scope.submit=function(){$uibModalInstance.close($scope.imageURI)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("initial",{url:"/initial",templateUrl:"/pages/initial/initial.html",controller:"initialCtrl"})}]).controller("initialCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.agree=!1,$scope.durations=[{value:1,name:"一个月"},{value:2,name:"二个月"},{value:3,name:"三个月"}],$scope.selectedDuration=$scope.durations[1].value,$scope.showDetail=function(){$uibModal.open({templateUrl:"/pages/initial/agreement.html",controller:"agreementCtrl",windowClass:"sjd-page-initial-agreement-window"})}}]).controller("agreementCtrl",["$scope",function($scope){}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsout",{url:"/goodsout",templateUrl:"/pages/goodsout/goodsout.html",controller:"goodsoutCtrl"})}]).controller("goodsoutCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsout/add.html",controller:"goodsoutAddCtrl",windowClass:"sjd-page-goodsout-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){},function(){})}}]).controller("goodsoutAddCtrl",["$scope","$uibModalInstance",function($scope,$uibModalInstance){$scope.submit=function(){$uibModalInstance.close($scope.imageURI)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("login",{url:"/login",templateUrl:"/pages/login/login.html",controller:"loginCtrl"})}]).controller("loginCtrl",["$scope","$state",function($scope,$state){$scope.login=function(){$state.go("dashboard")},$scope.toRegister=function(){$state.go("register")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneydetail",{url:"/moneydetail",templateUrl:"/pages/moneydetail/moneydetail.html",controller:"moneydetailCtrl"})}]).controller("moneydetailCtrl",["$scope","$http","$state","xhrRequestOrigin",function($scope,$http,$state,xhrRequestOrigin){function getDate(str){var d=new Date(str);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}function daysInterval(d1,d2){return parseInt((d2.getTime()-d1.getTime())/864e5)}$scope.details=[],$http.get(xhrRequestOrigin+"/api/loandetails/data.do?action=list_loan&loanid=238").success(function(data){for(var i=0;i<data.value.length;i++){var obj={idloandetail:data.value[i].idloandetail,amount:parseFloat(parseFloat(data.value[i].amount).toFixed(2)),repaid:parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),remain:parseFloat(parseFloat(data.value[i].amount).toFixed(2))-parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),usedate:getDate(data.value[i].usedate),repaymentdate:getDate(data.value[i].repaymentdate),interest:parseFloat(data.value[i].interest),repaying:parseFloat(parseFloat(data.value[i].repaying).toFixed(2))};obj.current=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date)+1)/360).toFixed(2)),obj.expire=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date(obj.repaymentdate))+1)/360).toFixed(2)),$scope.details.push(obj)}}),$scope.apply=function(){$state.go("moneyout")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyin",{url:"/moneyin",templateUrl:"/pages/moneyin/moneyin.html",controller:"moneyinCtrl"})}]).controller("moneyinCtrl",["$scope","$state","$http","xhrRequestOrigin",function($scope,$state,$http,xhrRequestOrigin){function getDate(str){var d=new Date(str);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}function daysInterval(d1,d2){return parseInt((d2.getTime()-d1.getTime())/864e5)}$scope.details=[],$scope.date=new Date,$scope.opened=!1,$scope.repayAmount=0,$scope.dateOptions={formatYear:"yy",maxDate:new Date(2020,5,27),minDate:new Date,startingDay:1},$http.get(xhrRequestOrigin+"/api/loandetails/data.do?action=list_loan&loanid=238").success(function(data){for(var i=0;i<data.value.length;i++){var obj={idloandetail:data.value[i].idloandetail,amount:parseFloat(parseFloat(data.value[i].amount).toFixed(2)),repaid:parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),remain:parseFloat(parseFloat(data.value[i].amount).toFixed(2))-parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),usedate:getDate(data.value[i].usedate),repaymentdate:getDate(data.value[i].repaymentdate),interest:parseFloat(data.value[i].interest),repaying:parseFloat(parseFloat(data.value[i].repaying).toFixed(2))};obj.current=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date)+1)/360).toFixed(2)),obj.expire=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date(obj.repaymentdate))+1)/360).toFixed(2)),$scope.details.push(obj)}$scope.date=new Date($scope.details[0].usedate),$scope.dateOptions.minDate=new Date($scope.details[0].usedate),$scope.dateOptions.maxDate=new Date($scope.details[0].repaymentdate),$scope.current=angular.copy($scope.details[0])}),$scope.toggleDatePicker=function(){$scope.opened=!$scope.opened},$scope.selectDetail=function(detail){$scope.date=new Date(detail.usedate),$scope.dateOptions.minDate=new Date(detail.usedate),$scope.dateOptions.maxDate=new Date(detail.repaymentdate),$scope.current=angular.copy(detail)},$scope.submit=function(){if($scope.repayAmount>0&&$scope.date){var fullDate=$scope.date.getFullYear()+"-"+($scope.date.getMonth()+1)+"-"+$scope.date.getDate()+"  00:00:00";$http.post(xhrRequestOrigin+"/actionon/loan/repayapply.do?enterpriseid=118&loanid=238&ref="+$scope.current.idloandetail+"&repaying="+$scope.repayAmount+"&usedate="+fullDate,{}).success(function(){$state.go("dashboard")})}}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyout",{url:"/moneyout",templateUrl:"/pages/moneyout/moneyout.html",controller:"moneyoutCtrl"})}]).controller("moneyoutCtrl",["$scope","$state","$uibModal",function($scope,$state,$uibModal){$scope.submit=function(){$state.go("dashboard")},$scope.durations=[{value:1,name:"一个月"},{value:2,name:"二个月"},{value:3,name:"三个月"}],$scope.selectedDuration=$scope.durations[1].value}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("register",{url:"/register",templateUrl:"/pages/register/register.html",controller:"registerCtrl"})}]).controller("registerCtrl",["$scope","$state",function($scope,$state){$scope.register=function(){$state.go("login")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("welcome",{url:"/welcome",templateUrl:"/pages/welcome/welcome.html",controller:"welcomeCtrl"})}]).controller("welcomeCtrl",["$scope","$state",function($scope,$state){$scope.next=function(){$state.go("login")}}]),mobileSJD.directive("sjdTopNavBar",[function(){return{restrict:"E",scope:{prevState:"@",prevText:"@",nextState:"@",nextText:"@",navTitle:"@"},link:function(scope,element,attrs){},controller:["$scope","$state",function($scope,$state){$scope.next=function(){$state.go($scope.nextState)},$scope.prev=function(){$state.go($scope.prevState)}}],templateUrl:"/widgets/sjdTopNavBar/sjdTopNavBar.html"}}]);