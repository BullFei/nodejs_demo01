//nodeJS内置模块   加载顺序：内置模块 -> node_modules -> 自定义模块(./)
const http = require("http");
const url = require("url");

//引入自定义模块
const router = require("./module/router.js");


/*
	req   request  请求对象
	res   response 响应对象
 */
http.createServer(function(req, res){
	//编写头文件，声明编码方式
	res.writeHead(200, {"Content-type": "text/html;charset=utf-8"});

	if(req.url !== "/favicon.ico"){
		//找到地址栏里面的url
		var pathname = url.parse(req.url).pathname.replace(/\//, "");
		
		/*
			处理异步信息
		 */
		try{
			//调用路由对应的函数，处理这个路由
			router[pathname](req, res);
		}catch(error){
			//如果输入不知名的路由，直接加载首页的路由
			router["home"](req, res);
		}

	}

	res.end();

}).listen(8081); //设置监听的端口号

console.log("Server running at http://localhost:8081");














