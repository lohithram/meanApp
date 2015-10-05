describe('MainCtrl', function() {

    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('Testing MainCtrl', function() {

        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('MainCtrl', { $scope: $scope });
        });

        it('Test initial state of MainCtrl', function() {

            expect($scope.page).toEqual(1);
            // other checks can follow here..
        });

        it('Check user message is set if sufficient characters are not entered', function() {

            $scope.query = 'a';
            $scope.onQueryChange();

            expect($scope.userMessage).toBeTruthy();
            expect($scope.userMessage).toEqual('Please enter at least three characters to begin search');

            $scope.query = 'ab';
            $scope.onQueryChange();
            expect($scope.userMessage).toBeTruthy();

            $scope.query = 'abc';
            $scope.onQueryChange();
            expect($scope.userMessage).toBeFalsy();
        });

        it('Test formatting of getDuration', function() {

            var formattedDuration = $scope.getDuration(33300);

            expect(formattedDuration).toEqual('9hrs 15mins');

            formattedDuration = $scope.getDuration(7260);
            expect(formattedDuration).toEqual('2hrs 1min');

            formattedDuration = $scope.getDuration(6000);
            expect(formattedDuration).toEqual('1hr 40mins');

        });

        it('Test formatting of getActors', function() {

            var actors = $scope.getActors({actors: { list: [
                                            {name: 'Robert Carlyle'},
                                            {name: 'Jeremy Renner'}, {name: 'Rose Byrne'}]}});

            expect(actors).toEqual('Robert Carlyle, Jeremy Renner, Rose Byrne');
        });

        it('Test setItemsPerPage', function() {

            $scope.setItemsPerPage(50);

            expect($scope.itemsPerPage).toEqual(50);
            expect($scope.page).toEqual(1);
        });

        it('Test fetchPage', function() {

            $scope.fetchPage(4);

            expect($scope.page).toEqual(4);
        });

    });
});