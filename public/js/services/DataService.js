'use strict';

var DataService = function($http){

    return {

        loadAllMovies: function(params) {

            return $http.get('/api/movies', params);
        },
        searchMovies: function(params) {

            return $http.get('/api/movies/search', params);
        }
    };
};
