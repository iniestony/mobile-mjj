var mobileSJD=angular.module("sjdApp",["ui.router","ui.bootstrap","ui.select"]);mobileSJD.config(["$urlRouterProvider",function($urlRouterProvider){$urlRouterProvider.when("/","/welcome"),$urlRouterProvider.when("","/welcome"),$urlRouterProvider.otherwise("/welcome")}]).constant("xhrRequestOrigin","http://test.sjdbank.com:8787"),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("application",{url:"/application",templateUrl:"/pages/application/application.html",controller:"applicationCtrl"})}]).controller("applicationCtrl",["$scope","$state","$uibModal","$http","xhrRequestOrigin",function($scope,$state,$uibModal,$http,xhrRequestOrigin){$scope.personItems=[{key:"fullname",value:"",name:"姓名",show:!1,options:[]},{key:"gender",value:"",name:"性别",show:!1,options:[]},{key:"uid",value:"",name:"身份证",show:!1,options:[]},{key:"mobile",value:"",name:"手机号",show:!1,options:[]},{key:"graduate",value:"",name:"毕业院校",show:!1,options:[]},{key:"liveaddress",value:"",name:"现居住地址",show:!1,options:[]},{key:"huji",value:"",name:"户籍",show:!1,options:[]},{key:"houseproperty",value:"",name:"现居房产属性",show:!1,options:[]},{key:"carnum",value:"",name:"车辆数量",show:!1,options:[]},{key:"housenum",value:"",name:"房产数量",show:!1,options:[]},{key:"marriage",value:"",name:"婚姻状况",show:!1,options:[]},{key:"spousename",value:"",name:"配偶姓名",show:!1,options:[]},{key:"housevalue",value:"",name:"房产净值",show:!1,options:[]},{key:"spouseid",value:"",name:"配偶身份证号",show:!1,options:[]},{key:"spousework",value:"",name:"配偶从事工作",show:!1,options:[]},{key:"familynum",value:"",name:"家庭总人口",show:!1,options:[]},{key:"percourt",value:"",name:"法院执行情况",show:!1,options:[]},{key:"ispsninsurance",value:"",name:"有无人财保险",show:!1,options:[]},{key:"workinityears",value:"",name:"从事该行业年限",show:!1,options:[]},{key:"shareproportion",value:"",name:"企业占股比例",show:!1,options:[]}],$scope.enterpriseItems=[{key:"enterprisename",value:"",name:"公司全称",show:!1,options:[]},{key:"yearlysales",value:"",name:"年化销售额",show:!1,options:[]},{key:"registeredcapital",value:"",name:"注册资本",show:!1,options:[]},{key:"scope",value:"",name:"经营范围",show:!1,options:[]},{key:"legalrepresentative",value:"",name:"法人",show:!1,options:[]},{key:"operator",value:"",name:"实际经营者",show:!1,options:[]},{key:"acturaladdress",value:"",name:"实际经营地址",show:!1,options:[]},{key:"industry",value:"",name:"经济行业",show:!1,options:[]},{key:"address",value:"",name:"企业地址",show:!1,options:[]},{key:"registereddate",value:"",name:"工商注册时间",show:!1,options:[]},{key:"salestype",value:"",name:"销售类型",show:!1,options:[]},{key:"enterprisetype",value:"",name:"企业类型",show:!1,options:[]},{key:"onlinestores",value:"",name:"网上商店",show:!1,options:[]},{key:"physicalstores",value:"",name:"实体店",show:!1,options:[]},{key:"hallstores",value:"",name:"商场专柜",show:!1,options:[]},{key:"salesvolume",value:"",name:"销售规模",show:!1,options:[]},{key:"factoryproperty",value:"",name:"生产场地性质",show:!1,options:[]},{key:"salesarea",value:"",name:"主要销售地区",show:!1,options:[]},{key:"employeenum",value:"",name:"员工人数",show:!1,options:[]},{key:"orgnizationtype",value:"",name:"组织形式",show:!1,options:[]},{key:"top10operatingrate",value:"",name:"十大客户营业率",show:!1,options:[]},{key:"ledgeperiod",value:"",name:"应收款账期",show:!1,options:[]},{key:"insurance",value:"",name:"是否购买保险",show:!1,options:[]}],$scope.loanItems=[{key:"personelloan",value:"",name:"个人银行融资",show:!1,options:[]},{key:"personelguarangee",value:"",name:"个人对外担保",show:!1,options:[]},{key:"bankloanamount",value:"",name:"银行融资金额",show:!1,options:[]},{key:"guaranteednum",value:"",name:"对外担保家数",show:!1,options:[]},{key:"guranteedamount",value:"",name:"对外担保金额",show:!1,options:[]},{key:"nonbankloanamount",value:"",name:"非银行融资",show:!1,options:[]},{key:"defaultpayments",value:"",name:"违约还款",show:!1,options:[]}],$scope.extraItems=[{key:"paymentSource",value:"",name:"还款来源",show:!1,options:[]}];var preservedBean={},beanKeys=["personalinfo","enterpriseinfo","loaninfo","extrainfo"],scopeKeys=["personItems","enterpriseItems","loanItems","extraItems"];$scope.showTitle=function(array){for(var show=!1,i=0;i<array.length;i++)if(array[i].show){show=!0;break}return show},$scope.parsePerson=function(item){"marriage"===item.key&&($scope.personItems[11].show=$scope.personItems[11].preservedShow&&"已婚"===item.value,$scope.personItems[13].show=$scope.personItems[13].preservedShow&&"已婚"===item.value,$scope.personItems[14].show=$scope.personItems[14].preservedShow&&"已婚"===item.value)},$http.get(xhrRequestOrigin+"/loanapplication/app/form/getform.do?customerprojectid=147").success(function(data){preservedBean=angular.copy(data.bean);for(var i=0;i<beanKeys.length;i++)data.bean[beanKeys[i]]&&"object"==typeof data.bean[beanKeys[i]]&&($scope[scopeKeys[i]].forEach(function(item){if(item.show=data.bean[beanKeys[i]].hasOwnProperty(item.key),item.preservedShow=data.bean[beanKeys[i]].hasOwnProperty(item.key),item.value=data.bean[beanKeys[i]][item.key],data.selections&&"object"==typeof data.selections&&data.selections.hasOwnProperty(item.key)&&Object.keys(data.selections[item.key]).length>0){item.options=[];for(var k in data.selections[item.key])item.options.push({name:k,value:data.selections[item.key][k]});item.value||(item.value=item.options[0].value)}else item.options=[]}),"personItems"===scopeKeys[i]&&($scope.personItems[11].show=$scope.personItems[11].preservedShow&&"已婚"===$scope.personItems[10].value,$scope.personItems[13].show=$scope.personItems[13].preservedShow&&"已婚"===$scope.personItems[10].value,$scope.personItems[14].show=$scope.personItems[14].preservedShow&&"已婚"===$scope.personItems[10].value))}),$scope.pictures={idSrc:[],licenseSrc:[],marriageSrc:[],orgSrc:[]},$scope.upload=function(item){$uibModal.open({templateUrl:"/pages/application/upload.html",controller:"uploadCtrl",windowClass:"sjd-page-application-upload-window",backdrop:"static",keyboard:!1,resolve:{item:function(){return item},images:function(){return angular.copy($scope.pictures[item+"Src"])}}}).result.then(function(dataURIs){$scope.pictures[item+"Src"]=dataURIs},function(){})},$scope.submit=function(){for(var i=0;i<beanKeys.length;i++)preservedBean[beanKeys[i]]&&"object"==typeof preservedBean[beanKeys[i]]&&$scope[scopeKeys[i]].forEach(function(item){preservedBean[beanKeys[i]][item.key]=item.value});$http({method:"POST",url:xhrRequestOrigin+"/loanapplication/loanmobile/saveform.do?customerprojectid=147",data:preservedBean}).success(function(){$state.go("dashboard")})}}]).controller("uploadCtrl",["$scope","$uibModalInstance","item","images","imageReader",function($scope,$uibModalInstance,item,images,imageReader){var map={id:"身份证",license:"营业执照",marriage:"结婚证",org:"组织结构证"};$scope.title="上传资料:"+map[item],$scope.imageURIs=images,$scope.removeImage=function(image){$scope.imageURIs=$scope.imageURIs.reduce(function(prev,next){return image!==next&&prev.push(next),prev},[])},$scope.uploadImage=function(){$("input.origin-input").click()},$scope.getImage=function(){imageReader.readImage($scope.imageFile,this).then(function(result){$scope.imageURIs.push(result)})},$scope.submit=function(){$uibModalInstance.close($scope.imageURIs)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]).directive("customOnChange",[function(){return{restrict:"A",link:function(scope,element,attrs){element.bind("change",function(e){scope.imageFile=(event.srcElement||event.target).files[0],scope.getImage()})}}}]).factory("imageReader",["$q",function($q){var onLoad=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.resolve(reader.result)})}},onError=function(reader,deferred,scope){return function(){scope.$apply(function(){deferred.reject(reader.result)})}},getReader=function(deferred,scope){var reader=new FileReader;return reader.onload=onLoad(reader,deferred,scope),reader.onerror=onError(reader,deferred,scope),reader},readImage=function(file,scope){var deferred=$q.defer(),reader=getReader(deferred,scope);return reader.readAsDataURL(file),deferred.promise};return{readImage:readImage}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsin",{url:"/goodsin",templateUrl:"/pages/goodsin/goodsin.html",controller:"goodsinCtrl"})}]).controller("goodsinCtrl",["$scope","$state","$uibModal","$http","xhrRequestOrigin","sjdDialog",function($scope,$state,$uibModal,$http,xhrRequestOrigin,sjdDialog){$scope.products=[],$scope.stockname="",$scope.contact="",$scope.phone="",$scope.memo="",$scope.submit=function(){for(var requestData={header:{contact:$scope.contact,phone:$scope.phone,stockname:$scope.stockname,memo:$scope.memo,creator:"15267015541"},details:[]},i=0;i<$scope.products.length;i++)requestData.details.push({erpid:$scope.products[i].erpid,name:$scope.products[i].name,count:$scope.products[i].count});var url=xhrRequestOrigin+"/stockpost/sjd/entryPush.do?enterpriseid=240";url=url+"&data="+JSON.stringify(requestData),$http.post(url).success(function(){$state.go("dashboard")}).error(function(msg){sjdDialog.open("Error",msg)})},$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsin/add.html",controller:"goodsinAddCtrl",windowClass:"sjd-page-goodsin-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){for(var existingIDs=$scope.products.map(function(p){return p.erpid}),i=0;i<data.length;i++)existingIDs.indexOf(data[i].erpid)<0&&$scope.products.push({erpid:data[i].erpid,name:data[i].name,count:0})},function(){})},$scope.deleteProduct=function(index){$scope.products.splice(index,1)}}]).controller("goodsinAddCtrl",["$scope","$uibModalInstance","$http","xhrRequestOrigin","sjdDialog",function($scope,$uibModalInstance,$http,xhrRequestOrigin,sjdDialog){$scope.productName="",$scope.newProduct="",$scope.products=[],$scope.addNew=function(){var newID,ids=$scope.products.map(function(p){return p.erpid});do{var r1,r2;r1=Math.ceil(9*Math.random()),r2=Math.ceil(9*Math.random());var d=new Date;newID=d.getMonth()+1+""+d.getDate()+d.getHours()+d.getMinutes()+r1+r2}while(ids.indexOf(newID)>=0);$scope.products.push({erpid:newID,name:$scope.newProduct,selected:!0})},$scope.search=function(){var url=xhrRequestOrigin+"/stockproducts/customerproducts/list.do?enterpriseid=240";""!==$scope.productName&&(url=url+"&productname="+$scope.productName),$http.get(url).success(function(data){$scope.products=JSON.parse(data.value);for(var i=0;i<$scope.products.length;i++)$scope.products[i].selected=!1}).error(function(msg){sjdDialog.open("Error",msg)})},$scope.submit=function(){var result=$scope.products.filter(function(item){return item.selected}).map(function(n_item){return{erpid:n_item.erpid,name:n_item.name}});$uibModalInstance.close(result)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("dashboard",{url:"/dashboard",templateUrl:"/pages/dashboard/dashboard.html",controller:"dashboardCtrl"})}]).controller("dashboardCtrl",["$scope","$state","$stateParams","$uibModal","xhrRequestOrigin","$http","Constants",function($scope,$state,$stateParams,$uibModal,xhrRequestOrigin,$http,Constants){$scope.status=0,$scope.message="当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.";var messageCollection={0:"当前没有进行中的贷款申请,您可以提交一份贷款意向进行申请.",1:"您的基本信息已通过审核,请正式发起贷款申请.",2:"您的贷款申请已提交,请耐心等待审核.",3:""},callbackCollection={0:function(){},1:function(){},2:function(){},3:function(){$http.get(xhrRequestOrigin+"/api//loanstatement/data.do?loanid=152&action=loan").success(function(data){$scope.usedamount=data.value.usedamount,$scope.ratio=data.value.ratio,$scope.amount=parseFloat((data.value.amount/1e4).toFixed(2));var d=new Date(data.value.expireddate);$scope.expireddate=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),$scope.minimum=parseFloat((parseFloat($scope.usedamount)/parseFloat($scope.ratio)).toFixed(0)),$http.get(xhrRequestOrigin+"/bankvisit//loan/stockValue.do?loanid=238").success(function(data1){$scope.core=parseFloat(data1.totalvalue.toFixed(0)),$scope.out=$scope.core-$scope.minimum})})}};$scope.changeStatus=function(){$scope.status=($scope.status+1)%4,$scope.message=messageCollection[$scope.status],callbackCollection[$scope.status]()},$scope.navigate=function(state){"goodsout"===state&&(Constants.estimateTotal=$scope.out),$state.go(state)}}]).service("Constants",[function(){this.estimateTotal=0}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("goodsout",{url:"/goodsout",templateUrl:"/pages/goodsout/goodsout.html",controller:"goodsoutCtrl"})}]).controller("goodsoutCtrl",["$scope","$state","$uibModal","$http","xhrRequestOrigin","sjdDialog","Constants",function($scope,$state,$uibModal,$http,xhrRequestOrigin,sjdDialog,Constants){$scope.products=[],$scope.estimate=0,$scope.estimateTotal=Constants.estimateTotal,$scope.stockname="",$scope.contact="",$scope.phone="",$scope.receivingcompany="",$scope.receivingaddress="",$scope.memo="",$scope.addGoods=function(){$uibModal.open({templateUrl:"/pages/goodsout/add.html",controller:"goodsoutAddCtrl",windowClass:"sjd-page-goodsout-add-window",backdrop:"static",keyboard:!1}).result.then(function(data){for(var existingIDs=$scope.products.map(function(p){return p.erpid}),i=0;i<data.length;i++)existingIDs.indexOf(data[i].erpid)<0&&$scope.products.push({erpid:data[i].erpid,name:data[i].name,count:0,mortgaged:data[i].mortgaged,dealprice:data[i].dealprice,totalquantity:data[i].totalquantity})},function(){})},$scope.deleteProduct=function(index){$scope.products.splice(index,1)},$scope.getEstimate=function(){$scope.estimate=0,$scope.products.forEach(function(item){var c=isNaN(parseInt(item.count))?0:parseInt(item.count);$scope.estimate=$scope.estimate+parseFloat(item.dealprice)*c})},$scope.submit=function(){for(var hasMorgaged=0,requestData={header:{contact:$scope.contact,receivingcompany:$scope.receivingcompany,phone:$scope.phone,stockname:$scope.stockname,receivingaddress:$scope.receivingaddress,memo:$scope.memo,creator:"15267015541"},details:[]},i=0;i<$scope.products.length;i++)$scope.products[i].mortgaged&&(hasMorgaged=1),requestData.details.push({erpid:$scope.products[i].erpid,name:$scope.products[i].name,count:$scope.products[i].count,mortgaged:$scope.products[i].mortgaged?"是":"否",dealprice:$scope.products[i].dealprice});var url=xhrRequestOrigin+"/stockpost/sjd/deliveryPush.do?enterpriseid=240&hasMorgaged="+hasMorgaged;url=url+"&data="+JSON.stringify(requestData),$http.post(url).success(function(){$state.go("dashboard")}).error(function(msg){sjdDialog.open("Error",msg)})}}]).controller("goodsoutAddCtrl",["$scope","$uibModalInstance","$http","xhrRequestOrigin","sjdDialog",function($scope,$uibModalInstance,$http,xhrRequestOrigin,sjdDialog){$scope.productName="",$scope.products=[],$scope.search=function(){var url=xhrRequestOrigin+"/stockproducts/customerproducts/list.do?enterpriseid=240";""!==$scope.productName&&(url=url+"&productname="+$scope.productName),$http.get(url).success(function(data){$scope.products=JSON.parse(data.value);for(var i=0;i<$scope.products.length;i++)$scope.products[i].selected=!1}).error(function(msg){sjdDialog.open("Error",msg)})},$scope.submit=function(){var result=$scope.products.filter(function(item){return item.selected}).map(function(n_item){return{erpid:n_item.erpid,name:n_item.name,mortgaged:n_item.mortgaged,dealprice:n_item.dealprice,totalquantity:n_item.totalquantity}});$uibModalInstance.close(result)},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("initial",{url:"/initial",templateUrl:"/pages/initial/initial.html",controller:"initialCtrl"})}]).controller("initialCtrl",["$scope","$state","$uibModal","$http","xhrRequestOrigin","sjdDialog",function($scope,$state,$uibModal,$http,xhrRequestOrigin,sjdDialog){$scope.regaddr="",$scope.turnovers="",$scope.mainBusiness="",$scope.stockaddr="",$scope.avgstockvalue="";var clicked=!1;$http.get(xhrRequestOrigin+"/project/qulificationcheck/form.do?key=quiz&customerprojectid=170").success(function(data){var quiz=JSON.parse(JSON.parse(data.content).quiz);$scope.regaddr=quiz.regaddr,$scope.turnovers=quiz.turnovers,$scope.mainBusiness=quiz.mainBusiness,$scope.stockaddr=quiz.stockaddr,$scope.avgstockvalue=quiz.avgstockvalue}).error(function(msg){sjdDialog.open("Error",msg)}),$scope.submit=function(){if(!clicked){clicked=!0;var url=xhrRequestOrigin+"/project/qulificationcheck/formsave.do?customerprojectid=170",valueStr=JSON.stringify({turnovers:$scope.turnovers,regaddr:$scope.regaddr,mainBusiness:$scope.mainBusiness,stockaddr:$scope.stockaddr,avgstockvalue:$scope.avgstockvalue}),questionaire=JSON.stringify({key:"quiz",value:valueStr});url=url+"&questionaire="+questionaire,$http.post(url,{}).success(function(){$http.post(xhrRequestOrigin+"/project/qulificationcheck/formsave.do?customerprojectid=170&enterpriseid=240",{}).success(function(){$state.go("dashboard")}).error(function(msg2){clicked=!1,sjdDialog.open("Error",msg2)})}).error(function(msg){clicked=!1,sjdDialog.open("Error",msg)})}},$scope.showDetail=function(){$uibModal.open({templateUrl:"/pages/initial/agreement.html",controller:"agreementCtrl",windowClass:"sjd-page-initial-agreement-window"})}}]).controller("agreementCtrl",["$scope",function($scope){}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("login",{url:"/login",templateUrl:"/pages/login/login.html",controller:"loginCtrl"})}]).controller("loginCtrl",["$scope","$state",function($scope,$state){$scope.login=function(){$state.go("dashboard")},$scope.toRegister=function(){$state.go("register")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneydetail",{url:"/moneydetail",templateUrl:"/pages/moneydetail/moneydetail.html",controller:"moneydetailCtrl"})}]).controller("moneydetailCtrl",["$scope","$http","$state","xhrRequestOrigin","$uibModal",function($scope,$http,$state,xhrRequestOrigin,$uibModal){function refresh(){$http.get(xhrRequestOrigin+"/api/loandetails/data.do?action=list_loan&loanid=238").success(function(data){$scope.details=[];for(var i=0;i<data.value.length;i++){var obj={idloandetail:data.value[i].idloandetail,amount:parseFloat(parseFloat(data.value[i].amount).toFixed(2)),repaid:parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),remain:parseFloat(parseFloat(data.value[i].amount).toFixed(2))-parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),usedate:getDate(data.value[i].usedate),repaymentdate:getDate(data.value[i].repaymentdate),interest:parseFloat(data.value[i].interest),repaying:parseFloat(parseFloat(data.value[i].repaying).toFixed(2))};obj.current=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date)+1)/360).toFixed(2)),obj.expire=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date(obj.repaymentdate))+1)/360).toFixed(2)),$scope.details.push(obj)}})}function getDate(str){var d=new Date(str);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}function daysInterval(d1,d2){return parseInt((d2.getTime()-d1.getTime())/864e5)}$scope.details=[],refresh(),$scope.repay=function(detail){$uibModal.open({templateUrl:"/pages/moneydetail/repay.html",controller:"repayCtrl",windowClass:"sjd-page-moneydetail-repay-window",backdrop:"static",keyboard:!1,resolve:{detail:function(){return angular.copy(detail)}}}).result.then(function(){refresh()},function(){})},$scope.apply=function(){$state.go("moneyout")}}]).controller("repayCtrl",["$scope","$uibModalInstance","$http","detail","xhrRequestOrigin","sjdDialog",function($scope,$uibModalInstance,$http,detail,xhrRequestOrigin,sjdDialog){function daysInterval(d1,d2){return parseInt((d2.getTime()-d1.getTime())/864e5)}$scope.detail=detail,$scope.date=new Date($scope.detail.usedate),$scope.opened=!1,$scope.repayAmount=0,$scope.estimate=0,$scope.dateOptions={formatYear:"yy",maxDate:new Date($scope.detail.repaymentdate),minDate:new Date($scope.detail.usedate),startingDay:1},$scope.toggleDatePicker=function(){$scope.opened=!$scope.opened},$scope.updateEstimate=function(){$scope.estimate=0,$scope.repayAmount>0&&$scope.date&&($scope.estimate=parseFloat(($scope.repayAmount+$scope.repayAmount*$scope.detail.interest*(daysInterval(new Date($scope.detail.usedate),$scope.date)+1)/360).toFixed(2)))},$scope.submit=function(){if($scope.repayAmount>0&&$scope.date){var fullDate=$scope.date.getFullYear()+"/"+($scope.date.getMonth()+1)+"/"+$scope.date.getDate();$http.post(xhrRequestOrigin+"/actionon/loan/repayapply.do?enterpriseid=240&loanid=238&ref="+$scope.detail.idloandetail+"&repaying="+$scope.repayAmount+"&usedate="+fullDate,{},{transformResponse:function(v){return v}}).success(function(){$uibModalInstance.close()}).error(function(msg){sjdDialog.open("Error",msg)})}else sjdDialog.open("Info","请为还款金额以及还款时间输入有效值")},$scope.cancel=function(){$uibModalInstance.dismiss()}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyin",{url:"/moneyin",templateUrl:"/pages/moneyin/moneyin.html",controller:"moneyinCtrl"})}]).controller("moneyinCtrl",["$scope","$state","$http","xhrRequestOrigin","sjdDialog",function($scope,$state,$http,xhrRequestOrigin,sjdDialog){function getDate(str){var d=new Date(str);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}function daysInterval(d1,d2){return parseInt((d2.getTime()-d1.getTime())/864e5)}$scope.details=[],$scope.date=new Date,$scope.opened=!1,$scope.repayAmount=0,$scope.estimate=0,$scope.dateOptions={formatYear:"yy",maxDate:new Date(2020,5,27),minDate:new Date,startingDay:1},$http.get(xhrRequestOrigin+"/api/loandetails/data.do?action=list_loan&loanid=238").success(function(data){for(var i=0;i<data.value.length;i++){var obj={idloandetail:data.value[i].idloandetail,amount:parseFloat(parseFloat(data.value[i].amount).toFixed(2)),repaid:parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),remain:parseFloat(parseFloat(data.value[i].amount).toFixed(2))-parseFloat(parseFloat(data.value[i].repaid).toFixed(2)),usedate:getDate(data.value[i].usedate),repaymentdate:getDate(data.value[i].repaymentdate),interest:parseFloat(data.value[i].interest),repaying:parseFloat(parseFloat(data.value[i].repaying).toFixed(2))};obj.current=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date)+1)/360).toFixed(2)),obj.expire=parseFloat((obj.remain+obj.remain*obj.interest*(daysInterval(new Date(obj.usedate),new Date(obj.repaymentdate))+1)/360).toFixed(2)),$scope.details.push(obj)}$scope.date=new Date($scope.details[0].usedate),$scope.dateOptions.minDate=new Date($scope.details[0].usedate),$scope.dateOptions.maxDate=new Date($scope.details[0].repaymentdate),$scope.current=angular.copy($scope.details[0])}),$scope.toggleDatePicker=function(){$scope.opened=!$scope.opened},$scope.selectDetail=function(detail){$scope.date=new Date(detail.usedate),$scope.dateOptions.minDate=new Date(detail.usedate),$scope.dateOptions.maxDate=new Date(detail.repaymentdate),$scope.current=angular.copy(detail)},$scope.updateEstimate=function(){$scope.estimate=0,$scope.repayAmount>0&&$scope.date&&($scope.estimate=parseFloat(($scope.repayAmount+$scope.repayAmount*$scope.current.interest*(daysInterval(new Date($scope.current.usedate),$scope.date)+1)/360).toFixed(2)))},$scope.submit=function(){if($scope.repayAmount>0&&$scope.date){var fullDate=$scope.date.getFullYear()+"/"+($scope.date.getMonth()+1)+"/"+$scope.date.getDate();$http.post(xhrRequestOrigin+"/actionon/loan/repayapply.do?enterpriseid=240&loanid=238&ref="+$scope.current.idloandetail+"&repaying="+$scope.repayAmount+"&usedate="+fullDate,{},{transformResponse:function(v){return v}}).success(function(){$state.go("dashboard")}).error(function(msg){sjdDialog.open("Error",msg)})}else sjdDialog.open("Info","请为还款金额以及还款时间输入有效值")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("moneyout",{url:"/moneyout",templateUrl:"/pages/moneyout/moneyout.html",controller:"moneyoutCtrl"})}]).controller("moneyoutCtrl",["$scope","$state","$http","xhrRequestOrigin","sjdDialog",function($scope,$state,$http,xhrRequestOrigin,sjdDialog){$http.get(xhrRequestOrigin+"/api//loanstatement/data.do?loanid=152&action=loan").success(function(data){$scope.usedamount=parseFloat(data.value.usedamount.toFixed(2)),$scope.ratio=data.value.ratio,$scope.interest=data.value.interest,$scope.amount=parseFloat(data.value.amount.toFixed(2)),$scope.remain=$scope.amount-$scope.usedamount;var d=new Date(data.value.expireddate);$scope.expireddate=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}),$scope.applyAmount=0,$scope.remark="",$scope.durations=[{value:"3个月",name:"3个月"},{value:"6个月",name:"6个月"},{value:"12个月",name:"12个月"}],$scope.selectedDuration=$scope.durations[0].value,$scope.submit=function(){if($scope.applyAmount>0){var url=xhrRequestOrigin+"/actionafter/applyuse/loandetails.do?customerprojectid=121&amount="+$scope.applyAmount+"&reriodtime="+$scope.selectedDuration;""!==$scope.remark&&(url=url+"&remark="+$scope.remark),$http.post(url,{},{transformResponse:function(v){return v}}).success(function(){$state.go("dashboard")}).error(function(msg){sjdDialog.open("Error",msg)})}else sjdDialog.open("Info","使用额度必须大于0")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("register",{url:"/register",templateUrl:"/pages/register/register.html",controller:"registerCtrl"})}]).controller("registerCtrl",["$scope","$state",function($scope,$state){$scope.register=function(){$state.go("login")}}]),mobileSJD.config(["$stateProvider",function($stateProvider){$stateProvider.state("welcome",{url:"/welcome",templateUrl:"/pages/welcome/welcome.html",controller:"welcomeCtrl"})}]).controller("welcomeCtrl",["$scope","$state",function($scope,$state){$scope.next=function(){$state.go("login")}}]),mobileSJD.service("sjdDialog",["$uibModal",function($uibModal){this.open=function(type,msg){var instance=$uibModal.open({templateUrl:"/services/sjdDialog/sjdDialog"+type+".html",controller:["$scope","$uibModalInstance","message",function($scope,$uibModalInstance,message){$scope.message=message,$scope.close=function(){$uibModalInstance.close()}}],windowClass:"sjd-dialog-window",backdrop:"static",keyboard:!1,resolve:{message:function(){return msg}}});return instance.result}}]),mobileSJD.directive("sjdTopNavBar",[function(){return{restrict:"E",scope:{prevState:"@",prevText:"@",nextState:"@",nextText:"@",navTitle:"@"},link:function(scope,element,attrs){},controller:["$scope","$state",function($scope,$state){$scope.next=function(){$state.go($scope.nextState)},$scope.prev=function(){$state.go($scope.prevState)}}],templateUrl:"/widgets/sjdTopNavBar/sjdTopNavBar.html"}}]);