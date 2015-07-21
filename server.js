
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
	fs.readdir(dir, function(err,files) {
		if (err) throw err;
		var count = 0;
		files.forEach(function(file) {
			count++;
			fs.readFile(dir+file, 'utf-8', function(err,json) {
				if (err) throw err;
				data[file]=json;
				count--;
				if(count===0) {
					res.json(data);
				}
			});
		});
	});
});

app.get("/user/:name", function(req,res) {
	var name = req.params.name;
	var file = name.slice(1,name.length);
	var fileName = file + '.json';

	fs.readFile(__dirname + '/userData/' + fileName, 'utf-8', function(err, data) {
		if(err) throw err;
		console.log(data);
		res.json(data);
	});
});

app.post('/user/userPost',function(req,res){
	var userData = req.body;
	var name = req.params.name;
	var file = name.slice(1,name.length);
	var fileName = __dirname + '/userData/' + file + '.json';
	fs.exists(fileName, function(err, exists) {
		if(exists) {
			throw err
		 } 
		else {
			fs.writeFile(fileName, JSON.stringify(userData), function(err) {
				if(err) throw err;
				res.send('success user ' + file + ' was created');
			});
		}
	});
});

app.delete('/user/userDelete/:name',function(req, res) {
	var name = req.params.name;
	var file = name.slice(1,name.length);
	var fileName = __dirname + '/userData/' + file + '.json';
	fs.unlink(fileName, function(err) {
		if(err) throw err;
		res.json({msg: 'user has been deleted'});
	});
});

app.patch('/user/userPatch/:name', function(req, res) {
	var name = req.params.name;
	var file = name.slice(1,name.length);
	var newData = req.body;
	var fileName = __dirname + '/userData/' + file + '.json';
	fs.readFile(fileName, function(err,data) {
		if(err) throw err;
		var fileData = JSON.parse(data.toString());
		for(var key in newData) {
			if(newData[key] === undefined) {
				continue;
			}
			if(newData[key]!==fileData[key]) {
				fileData[key] = newData[key]
			}
		}
   fs.writeFile(fileName, JSON.stringify(fileData), function(err) {
   	if(err) throw err;
   	res.json({msg: 'User has been updated'});
   })
	});
})

app.listen(port,function(){
  console.log("Started on PORT " + port);
});















