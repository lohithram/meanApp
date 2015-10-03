(function() {

    var app = angular.module('app', ['ngResource'])


    app.controller('MainCtrl', ['$scope', function($scope) {

    	// load data
    	$scope.friends = [
		    { name: "Peter",   age: 20 },
		    { name: "Pablo",   age: 55 },
		    { name: "Linda",   age: 20 },
		    { name: "Marta",   age: 37 },
		    { name: "Othello", age: 20 },
		    { name: "Markus",  age: 32 }
		  ];

  $scope.filterFunction = function(element) {
    return element.name.match(/^Ma/) ? true : false;
  };


    }]);

})();
