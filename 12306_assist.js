
		
var path = location.pathname;

		
console.log("loading");
console.log(path);
if (path == "/otsweb/main.jsp" || path == "/otsweb/") {
	console.log("main");
	

}


if ((path == "/otsweb/loginAction.do" && location.search != '?method=initForMy12306') || path == "/otsweb/login.jsp") {
	//登录页
	console.log("loginAction");
	console.log($("#UserName").val());

	
	function Login() {
		// 获取登入随机码
		$.ajax({
			url: "/otsweb/loginAction.do?method=loginAysnSuggest",
			method: "POST",
			dataType: "json",
			cache: false,
			success: function (json, code, jqXhr) {
				//{"loginRand":"211","randError":"Y"}
				if (json.randError != 'Y') {
					console.log("错误：" + json.randError);
				} else {
					console.log("登录随机码 -&gt; " + json.loginRand);
					$("#loginRand").val(json.loginRand);
					
					submitForm();
		
				}
			},
			error: function (xhr) {
					console.log("[" + errorCount + "] 网络请求错误，重试")
			}
		});
	}
	
	function submitForm() {
		// 提交登入表单
		var data = {};
		$.each($("#loginForm").serializeArray(), function () {
			if (this.name == "refundFlag" && !document.getElementById("refundFlag").checked) return;
			data[this.name] = this.value;
		});
		if (!data["loginUser.user_name"] || !data["user.password"] || !data.randCode || data.randCode.length != 4/* || (utility.regInfo.bindAcc && utility.regInfo.bindAcc != data["loginUser.user_name"])*/)
			return;
	
		$.ajax({
			type: "POST",
			url: "/otsweb/loginAction.do?method=login",
			data: data,
			timeout: 10000,
			dataType: "text",
			success: function (html) {
				
				var m = html.match(/var\s+message\s*=\s*"([^"]*)/);
				msg = m && m[1] ? m[1] : "&lt;未知信息&gt;";
	
	
				if (html.indexOf('请输入正确的验证码') > -1) {
					console.log("验证码不正确");
				} else if (msg.indexOf('密码') > -1) {
					console.log(msg);
				} else if (msg.indexOf('锁定') > -1) {
					console.log(msg);
				} else if (html.indexOf("欢迎您登录") != -1) {
					console.log('登录成功，开始查询车票吧！');
					window.location.href = "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init";
				} else {
					console.log(msg);
				}
			},
			error: function (msg) {
				console.log(msg);
			}
		});
	}
	
	$("#UserName").val("hanchao0123@hotmail.com");
	$("#password").val("chao19860123");
	
	$("#randCode").keyup(function (e) {
		e = e || event;
		if (e.charCode == 13 || $("#randCode").val().length == 4) {
			console.log("logining");
			Login();
		
		}
	});
}
