
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = 8000;

app.get("/users", function(req, res) {
	var dir = __dirname + "/userData/";
	var data = {};
	console.log(req.params);

	fs.readdir(dir, function(err,files) {
		if (err) throw err;
		var count = 0;
		files.forEach(function(file) {
			count++
			fs.readFile(dir+file, 'utf-8', function(err,json) {
				if (err) throw err;
				data[file]=json;
				count--;
				if(count===0) {
					console.log(data);
				}
			});
		});
	});
});

app.get("/user:name", function(req,res) {
	var name = req.params.name;
	var file = name.slice(1,name.length);
	var fileName = file + '.json';

	fs.readFile(__dirname + '/userData/' + fileName, 'utf-8', function(err, data) {
		if(err) throw err;
		console.log(data);
	});
});

app.post('/login',function(req,res){
	console.log(req.body);
  // var user_name=req.body.user;
  // var password=req.body.password;
  // console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});


app.listen(port,function(){
  console.log("Started on PORT " + port);
})

















