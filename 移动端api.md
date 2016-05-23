## 移动端api

测试服务器前缀：http://test.sjdbank.com:8787/

### ---RSA 密钥获取---
* url: default/RSA.do

* POST

* return: Map<String, String> <br>
"modulus"<br>
"exponent"<br>


### --- 登陆 ---

* url: default/mobilelogin.do

* POST

* 表单提交内容：<br>

> username,
> password

* return 

> User对象: 成功

> *null*：登陆失败，

* 元素解释
> typeid,用户类型，typeid=9表示企业客户<br>
> typeref, 用户类型所对应的角色id，当typeid=9时。。typeref即enterpriseid

* 备注
登陆后记录enterpriseid，并同时查询当前是否有运行中的项目



### --- 注册 ---
* url: default/mobileregister.do

* POST

* request params：

> from: 必填，固定。动产质押项目(from=HDD)

> code: 必填，填入的短信验证号

* 表单提交内容：<br>

> username, 即手机号
> password,
> title, 称呼（添加选择：先生/女士）

* return：

* 备注
注册后自动登录



### --- 获得短信验证码 ---
* url: default/mobileverify.do

* request params：

> mobile: string,必填， 手机号

* return： 6位验证码


### ---获得基本调查(原贷款意向)---
* url: /project/qulificationcheck/form.do

* get

* request params:
> key:quiz<br>
> customerprojectid <br>

* example:
> http://test.sjdbank.com:8787/project/qulificationcheck/form.do?key=quiz&customerprojectid=126

* return example:
>{"idquestionaire":33,"note":null,"enterpriseid":282,"parkid":null,"hascommit":true,"createtime":1463733637000,"content":"{\"quiz\":\"{\\\"avgstockvalue\\\":\\\"100万\\\",\\\"stockaddr\\\":\\\"杭州\\\",\\\"turnovers\\\":\\\"100万\\\",\\\"mainBusiness\\\":\\\"电子产品、联想\\\",\\\"regaddr\\\":\\\"杭州\\\"}\"}","customerprojectid":170,"type":null,"committime":null}

"content"的"quiz"中为有用信息：

|内容|key|
|-|-|
|企业注册地址|regaddr|
|平均营业额|turnovers|
|主要商品的种类、品牌|mainBusiness|
|货品存放地址|stockaddr|
|平均库存价值|avgstockvalue|


### ---保存基本调查--- 
* post

* /project/qulificationcheck/formsave.do

* request params:

> customerprojectid <br>
> questionaire ：string,即调查内容

* Content-Type:application/x-www-form-urlencoded; charset=UTF-8

* parsed example:

> customerprojectid=170&questionaire=%7B%22key%22%3A%22quiz%22%2C%22value%22%3A%7B%22turnovers%22%3A%22100%E4%B8%87%22%2C%22regaddr%22%3A%22%E6%9D%AD%E5%B7%9E%22%2C%22mainBusiness%22%3A%22%E7%94%B5%E5%AD%90%E4%BA%A7%E5%93%81%E3%80%81%E8%81%94%E6%83%B3%22%2C%22stockaddr%22%3A%22%E6%9D%AD%E5%B7%9E%22%2C%22avgstockvalue%22%3A%22100%E4%B8%87%22%7D%7D <br>

>customerprojectid:170<br>
>questionaire:{"key":"quiz","value":{"turnovers":"100万","regaddr":"杭州","mainBusiness":"电子产品、联想","stockaddr":"杭州","avgstockvalue":"100万"}}

### ---提交基本调查---

* post

* /project/completeAuthorization.do

* request parms:

>customerprojectid<br>
>enterpriseid

* example:
> http://test.sjdbank.com:8787/project/completeAuthorization.do?customerprojectid=170&enterpriseid=282

### --- 获得申请表 ---


* url: loanapplication/app/form/getform.do

* request params：

> customerprojectid: int, 必填

* return example

> http://test.sjdbank.com:8787/loanapplication/app/form/getform.do?customerprojectid=147

### ---申请表保存---

* post

* loanapplication/loanmoblie/saveform.do

* query string params:
> customerprojectid

* form data:
> memo:<br>
> personalinfo:<br>
> enterpriseinfo:<br>
> extrainfo:<br>

### --- 提交申请表 ---
* post

* loanapplication/form/saveform.do




### --- 获得证件列表 ---
* url: /loanapplicationdoc//app/loandocs/show.do

* request params：

> customerprojectid: int, 必填

* return: json

key为docid，即主键；<br>
“reason”为拒绝原因；<br>

* return example

>{"610":{"files":{},"reason":null,"name":"经营合同、经营场所租赁协议（房屋租赁合同）","isPass":false},"612":{"files":{},"reason":null,"name":"户口本","isPass":false},"611":{"files":{},"reason":null,"name":"配偶身份证","isPass":false},"614":{"files":{},"reason":null,"name":"结婚证复印件","isPass":false},"613":{"files":{},"reason":null,"name":"身份证","isPass":false},"563":{"files":{},"reason":null,"name":"营业执照正副本","isPass":false}}

>http://test.sjdbank.com:8787/loanapplicationdoc//app/loandocs/show.do?customerprojectid=147

### --- 上传证件 ---
* ur: /app/applydoc/upload.do

* request params：

> customerprojectid: int, 必填

> idchecklist:int，主键，必填

> files: 提交的文件，必填

* return: String

> "Success": 提交成功，response-code=200

> response_code=802：提交失败，并有显示错误原因。

### ---获取当前项目---
* url: /customerproject/isactive.do

* request params：

> enterpriseid: int, 必填

* return: 

> *json对象*：当前项目 <br>
 	重要字段：idcustomerprojectid - 主键<br>
 	status - 当前状态<br>
 	loanid - 贷款申请id<br>

> *null*: 当前无项目

* exp:
> http://test.sjdbank.com:8787/project//customerproject/isactive.do?enterpriseid=118


### --- 获取贷款信息 ---
* url: api/loanstatement/data.do

* request params:

> action: action=loan

> loanid: int, 贷款申请id

* return exp:

> http://test.sjdbank.com:8787/api//loanstatement/data.do?loanid=152&action=loan

* return 元素解释
amount - 授信额度 <br>
usedamount - 用款总额 <br>
idloanstatement - 主键 <br>
deposit - 保证金<br>
loantime - 开始时间 <br>
expireddate - 截止时间 <br>
interest -  利率 <br>
ratio - 质押率<br>
最低值 = ratio/usedamount
可出值 = 核价值-最低值
### --- 获取当前核价价值---
* url: bankvisit/loan/stockValue.do

* request params:

> loanid: int, 贷款申请id

* return 
> {"result":"Success","totalvalue":553333.3333333334}

* return exp:
http://test.sjdbank.com:8787/bankvisit//loan/stockValue.do?loanid=238

### --- 选择出库（入库）商品 ---
* url: stockproducts/customerproducts/list.do

* params：
> enterpriseid: 必填,int

> productname:商品名称，选填，不填返回所有

> startrow: 开始行数，选填，from 1 

> count: 返回的行数，选填 


* return exp:
>{"result": "Success","value": "[{\"alias\":\"\",\"dealprice\":\"0.0\",\"isNew\":true,\"marketprice\":\"\",\"pid\":\"263\",\"dealpriceEst\":\"0.00\",\"cost\":\"0.0\",\"totalValue\":\"0.0\",\"stockValue\":\"0.0\",\"totalquantity\":\"2\",\"id\":\"196408\",\"category\":\"一体机\",\"price\":\"0.0\",\"mortgaged\":false,\"name\":\"TCL洗衣机XQB70-150JSZ亮灰色（JD)\",\"brand\":\"联想/ThinkCentre\",\"quantity\":\"0\",\"erpid\":\"35274\"}]"}

* exp:
> http://test.sjdbank.com:8787/stockproducts/customerproducts/list.do?enterpriseid=240&productname=z

* 名称解释：
> dealprice - 核价价值<br>
> totalquantity - 库存总数<br>
> mortgaged - 是否抵押中<br>
> erpid - 需要该id作为货品识别
> name - 货品名称

* 备注

> 1. 返回的"value"为 String格式，需要转换为json

> 2. 入库请求时，如添加新商品，则自动生成erpid，规则为：MMDDHHmm+2位随机。
> 可参考test.sjdbank.com:8787  登陆：15267015541 密码：1234567890



### ---提交出库申请---

* POST

* stockpost/sjd/deliveryPush.do

* request params:
> hasMorgaged: 0/1。当出库明细中有一个抵押物，则hasMorgaged=1<br>
> enterpriseid<br>
> data:出库单对象

* data example:
>data={"header":{"contact":"联XXX","receivingcompany":"","phone":"ddd","stockname":"颐高仓","receivingaddress":"","memo":"","creator":"15267015541"},"details":[{"erpid":"36659","name":"华硕5寸膜","count":"0","mortgaged":"是","dealprice":"1000.0 "}]}<br>

>"header"中为出库单基本信息:<br>
>contact:联系人 <br>
>receivingcompany:收款方<br>
>phone:联系电话<br>
>stockname:出库仓库<br>
>receivingaddress:收货地址<br>
>memo:备注信息<br>
>creator: =username<br>
>"details"中为出库明细，为jsonarray：<br>
>erpid: 所选商品的erpid<br>
>name:商品名称<br>
>count:出库数量，由客户填写<br>
>mortgaged<br>
>dealprice<br>
>details中的每条明细除了count都是来自所选的商品


### ---提交入库申请---

* POST

* stockpost/sjd/entryPush.do

* request params:
> enterpriseid<br>
> data:入库单对象

* data example:
>data={"header":{"contact":"联XXX","stockname":"颐高仓","phone":"ddd","memo":"ddd","creator":"15267015541"},"details":[{"erpid":"0518223070","name":"2","count":"2"}]}<br>

>"header"中为出库单基本信息:<br>
>contact:联系人 <br>
>phone:联系电话<br>
>stockname:入库仓库<br>
>memo:备注信息<br>
>creator: =username<br>
>"details"中为出库明细，为jsonarray：<br>
>erpid: 所选商品的erpid<br>
>name:商品名称<br>
>count:出库数量，由客户填写<br>


### --- 申请用款 ---

* POST

* url: actionafter/applyuse/loandetails.do

* request params:
> customerprojectid,必填<br>
> amount:申请的金额（元为单位）<br>
> periodtime: 用款期限 <br>
> remark:备注<br>

### --- 申请还款 ---
* POST

* url:actionon/loan/repayapply.do

* request params:
> enterpriseid<br>
> loanid <br>
> ref - 所选择的那个需要还款的条目的主键（idloandetail）
> repaying - 申请还款的金额
> usedate - 还款日期

### --- 获得用款详情列表 ---
* get

* url:api/loandetails/data.do

* request params:
> action - action=list_loan <br>
> loanid

* exp:
> http://test.sjdbank.com:8787/api/loandetails/data.do?action=list_loan&loanid=238

* 元素解释：
> loanstatementid - 贷款详情主键（外键） <br>
> idloandetail - 用款条目主键 <br>
> interest - 利息 <br>
> amount -  用款金额 <br>
> repaid - 已还款 <br>
> repaymentdate - 截止还款时间 <br>
> repaying - 申请中的还款金额 <br>
> usedate - 用款时间 <br>


### ---各状态名称及显示内容---

“当前贷款”页面根据当前customerproject的status显示不同内容与操作

|状态码|显示名称|显示详情|当前操作|图标|
|-|-|-|
|1|初步调查|请填写初步调查问卷并提交|【初步调查】|pre-check.png
|2、18、12、19、16|资质审核|您的基本情况已提交，请等待工作人员的核实||qulificationcheck.png
|181|资质审核未通过|很抱歉，我们暂时无法为您提供服务。||fail.png
|20|资质审核通过|恭喜您！您的贷款意向已通过数据贷评估，请发起正式申请！|【贷款申请】|Success.png
|21|贷款填写中|您正在进行贷款申请，请填写完整的申请表并提交|【贷款填写】|write.png
|22|资料补充|您的贷款资料审核不通过，请补充、修改贷款资料！|【申请表修改】【申请资料修改】|write.png
|262、8|申请失败|非常抱歉, 您的贷款申请被拒绝||fail.png
|23、260、26|贷款审核|您的贷款申请已提交资金方审批，请耐心等候|【申请表查看】【申请资料查看】|check.png
|27|贷款成功|恭喜您！您的贷款已通过资金方审批||pass.png
|5|{贷款详情}|{贷款详情}|【出库申请】【入库申请】【用款申请】【还款申请】|
|35、79|项目结束|||





