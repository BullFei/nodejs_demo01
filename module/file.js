// 读写文件
const fs = require("fs");
const querystring = require("querystring");

module.exports = {
	//1、读入磁盘图片  2、写在页面上
	//file 图片的路径  res响应对象
	readImg: function(file, res){
		/*
			第一个参数 文件路径
			第二个参数 编码
			第三个参数 回调函数
		 */
		fs.readFile(file, "binary", function(err, data){
			if(err){
				throw err;
			}
			res.writeHead(200, {"Content-type": "image/jpeg"});
			res.write(data, "binary");
			res.end();
		});
	},
	readFile: function(file, res, req){
		fs.readFile(file, "utf-8", function(err, data){
			if(err){
				throw err;
			}
			res.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
			res.write(data);
			res.end();
		})
	},
	//处理post提交过来的数据，页面显示
	postReadFile: function(file, res, req, postData){
		var urlObject = querystring.parse(postData);

		var arr = ["email", 'password'];

		fs.readFile(file, "utf-8", function(err, data){
			if(err){
				throw err;
			}
			//data  login.html
			for(var i = 0; i < arr.length; i++){
				var reg = new RegExp(`{${arr[i]}}`, "ig");
				data = data.replace(reg, urlObject[arr[i]]);
			}

			/*
				互斥处理
				判断post提交过来的数据是否有值
			 */
			if(urlObject.email && urlObject.password){
				data = data.replace(/{infoClass}/ig, "");
				data = data.replace(/{formClass}/ig, "hide");
			}else{
				data = data.replace(/{infoClass}/ig, "hide");
				data = data.replace(/{formClass}/ig, "");
			}

			res.write(data);
			res.end();

		});

	}
	
}































