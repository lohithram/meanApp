'use strict';

var fs = require('fs');


exports.movieList = function(req, res){

    var movieList = getPageSet(req, allMoviesList);

    sendResponse(req, res, movieList, allMoviesList.length);
};

exports.searchMovies = function(req, res){

    // get search query parameter
    var searchStr = req.query.search;
    searchStr = searchStr && searchStr.toLowerCase();

    console.log("Search string: " + searchStr);

    var matchingMovies = [];
    allMoviesList.forEach(function(element){

        if(element.title.toLowerCase().indexOf(searchStr) >= 0){
            matchingMovies.push(element);
        }
    });

    var resultCount = matchingMovies.length;
    console.log("Search result count: " + resultCount);

    matchingMovies = getPageSet(req, matchingMovies);
    // return the set based on noOfItemsOnPage
    sendResponse(req, res, matchingMovies, resultCount);
}

function getPageSet(req, movieList){

    var pageSet = [];
    var pageNumber = req.query.page && Number(req.query.page);
    var itemsCount = req.query.itemsPerPage && Number(req.query.itemsPerPage);

    if(pageNumber > 0) {

        var startIndex = (pageNumber-1)*itemsCount;
        var endIndex = Math.min(movieList.length, startIndex + itemsCount);
        pageSet = movieList.slice(startIndex, endIndex);
    }

    return pageSet;
}


// store the complete list of movies
// which is fine since we have a non-dynamic list of movies here
// contains sorted list(improves performance);
var allMoviesList;

/**
 * Loads the movies from the data file.
 *
 */
function loadList(){

    fs.readFile('./server/data.json', 'utf8', function(err, data){

        if(err){
            console.log("ERROR: " + err);
        }
        else{
            var allMoviesListString = data;
            allMoviesList = JSON.parse(allMoviesListString).movies;
            allMoviesList = allMoviesList.sort(sortByMovieTitle);
            //console.log("Complete movie list - " + allMoviesListString);
        }
    });

};

function sortByMovieTitle(movie1, movie2){

    return movie1.title.localeCompare(movie2.title);
}

function sendResponse(req, res, movies, resultCount){

    res.status(200);
    res.json({"movies": movies,
        "resultCount": resultCount,
        "page": req.query.page,
        "totalCount": allMoviesList.length,
        "itemsPerPage": req.query.itemsPerPage
        });
}


loadList();

