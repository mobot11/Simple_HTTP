
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
var port = 8000;

// app.use(express.static(__dirname + '/lib'));

app.get("/user", function(req, res) {
	res.write('<h1>user page</h1>')
})
app.post('/userPost', function(req, res) {
	var userData = req.body;
	var fileName = userData.name +'.json';
	fileName = fileName.replace(/\s+/g, '')
	console.log(fileName);
	fs.exists(fileName, function(exists) {
		if(exists) {
			fs.appendFile(__dirname + '/userData/' + fileName, JSON.stringify(userData), function(err) {
				if(err) return(console.log('your append fucked up!'));
			});
		}
		else fs.writeFile(__dirname + '/userData/' + fileName, JSON.stringify(userData), function(err) {
		if (err) return console.log('your write fucked up!');
	});
});
	res.end("yes");
});


app.listen(port,function(){
  console.log("Started on PORT " + port);
})

















