
		
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

	$("#UserName").val("hanchao0123@hotmail.com");
	$("#password").val("chao19860123");
}
