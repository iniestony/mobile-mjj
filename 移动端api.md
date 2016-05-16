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

<<<<<<< HEAD
* return 

> "Success": 成功

> ***其他信息为错误信息***：登陆失败，


=======
* return
>>>>>>> mjj




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

<<<<<<< HEAD

### --- 获得申请表 ---



=======
>>>>>>> mjj
