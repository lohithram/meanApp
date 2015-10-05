(function() {

    var app = angular.module('app',[]);

	// Register data service
	app.service('dataService', ['$http', DataService]);

	app.controller('MainCtrl', ['$scope', 'dataService', function($scope, dataService) {

		$scope.movies = [];
		$scope.itemsPerPage = 5;
		$scope.page = 1;
		$scope.pages = [];

		loadAllMovies();

		$scope.fetchPage = function(pageNumber){

			$scope.page = pageNumber;
			search();
		};

		$scope.setItemsPerPage = function(itemsCount){

			$scope.itemsPerPage = itemsCount;
			$scope.page = 1;
			search();
		};

		$scope.getActors = function(movie){

			var actorsList = [];


			if(movie && movie.actors && movie.actors.list){

				movie.actors.list.forEach(function(actor){

					actorsList.push(actor.name);
				});
			}
			return actorsList.join(', ');
		};

		$scope.getDuration = function(duration){

			var hours = Math.floor(duration/60/60);
			var minutes = (duration/60) - (hours*60);
			return hours + (hours == 1 ? "hr " : "hrs ") + minutes + (minutes == 1 ? "min " : "mins ");
		};

		$scope.onQueryChange = function() {

			var query = $scope.query;
			//console.log("Search string: " + query);

			$scope.userMessage = "";
			if(query && query.length < 3){

				$scope.userMessage = 'Please enter at least three characters to begin search';
			}else{

				$scope.page = 1;
				search();
			}
		};

		//----------------------------------------------
		//
		// Privates/Internals
		//
		//----------------------------------------------

		var allMovies = [];

		var search = function () {

			var query = $scope.query;
			if(query && query.length > 2){

				searchMovies();
			}
			else if(!query){

				loadAllMovies();
			}
		};

		// load data
		function loadAllMovies() {

			// There could be an additional level of indirection here by passing
			// payload without the actual knowledge of the parameters the server is expecting.
			// The service can then be concerned about constructing the right query parameters.
			// I am constructing the payload here so as to save time and also not want to pass
			// $scope the service class.

			dataService.loadAllMovies({
				params: {
					'page': $scope.page,
					'itemsPerPage': $scope.itemsPerPage
				}
			}).success(function (jsonData) {

				$scope.movies = allMovies = jsonData.movies;
				updatePaginationData(jsonData);
			}).error(function (error) {

				console.log("Error: " + error);
			});
		};

		function searchMovies(){

			dataService.searchMovies({
				params: {
					'search': $scope.query,
					'page': $scope.page,
					'itemsPerPage': $scope.itemsPerPage
				}
			}).success(function(jsonData){

				$scope.movies = jsonData.movies;
				updatePaginationData(jsonData);
			}).error(function(error){

				console.log("Error: " + error);
			});
		};

		var updatePaginationData = function(jsonData){

			var pages = [];
			pages.push(1);
			for(var i=1; jsonData.resultCount > (i*jsonData.itemsPerPage); ++i){

				pages.push(i+1);
			}
			$scope.pages = pages;
			$scope.totalCount = jsonData.totalCount;
			$scope.resultCount = jsonData.resultCount;
		};

    }]);

})();
