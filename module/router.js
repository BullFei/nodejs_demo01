// router == 路由  路由 分发
const file = require("./file.js");
const url = require("url");
const querystring = require("querystring");


//CommonJS规范
module.exports = {
	login: function(req, res){
		/*
			处理post提交过来的数据
		 */
		var postData = '';
		req.on("data", function(chunk){
			postData += chunk;
		})
		req.on("end", function(){
			/*var urlObject = querystring.parse(postData);
			console.log(urlObject.email);
			console.log(urlObject.password);*/
			file.postReadFile("./views/login.html", res, req, postData);
		})
	},
	registor: function(req, res){
		res.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
		res.write("注册页面");
		res.end();
	},
	home: function(req, res){
		file.readFile("./views/index.html", res, req);
	},
	img: function(req, res){
		file.readImg("./images/pet.jpg", res);
	}
}