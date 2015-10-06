var express = require('express');
var moviesController = require('./controllers/moviesController');

var app = express();

app.use(express.static(__dirname + '/../public'));


// create routing...
// the REST Apis could be registered by the controller itself by passing the app to the controller.
// Since this is small application i am happy for it to be here.

app.get('/api/movies', moviesController.movieList);
app.get('/api/movies/search', moviesController.searchMovies);

var server = app.listen(8000, function(){
	console.log('App started on port 8000!');
});

module.exports = server;
