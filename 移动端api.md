## 移动端api

测试服务器前缀：http://test.sjdbank.com:8787/

### ---RSA 密钥获取---
* url: default/RSA.do

* POST

* return: Map<String, String> <br>
"modulus"<br>
"exponent"<br>


### --- 登陆 ---

* url: default/logincheck.do

* POST

* 表单提交内容：<br>

> username,
> password

* return 

> "Success": 成功

> ***其他信息为错误信息***：登陆失败，




### --- 注册 ---
* url: default/register.do

* POST

* request params：

> from: 必填，固定。动产质押项目(from=HDD)

> code: 必填，填入的短信验证号

* 表单提交内容：<br>

> mobile,
> password,
> title

* return： 6位验证码


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


