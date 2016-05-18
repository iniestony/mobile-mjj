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

### --- 获得申请表 ---


* url: /app/form/getform.do

* request params：

> customerprojectid: int, 必填

* return example

> http://test.sjdbank.com:8787/loanapplication/app/form/getform.do?customerprojectid=147

### ---申请表保存---

* post

* loanapplication/loan/saveform.do

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

* 备注

> 1. 返回的"value"为 String格式，需要转换为json

> 2. 入库请求时，如添加新商品，则自动生成erpid，规则为：MMDDHHmm+2位随机。
> 可参考test.sjdbank.com:8787  登陆：15267015541 密码：1234567890

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














