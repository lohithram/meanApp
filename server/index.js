var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../public'));


// creating routing...

app.listen(8000, function(){
	console.log('App started on port 8000!');
});