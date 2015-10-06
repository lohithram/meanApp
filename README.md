# meanApp
App to search available movies built using MEAN stack.

Commands to run:
- npm install
- npm run start - starts local server
- npm run unit - run the karma unit tests
- npm run e2e - run the protractor tests 
- npm run server-unit - run the backend mocha tests



### Notes

###### To keep the setup simple i have not used browserify on the front end.
###### Used Bootstrap CSS to structure the page.
###### On the front end there is MainCtrl which has dependency on DataService. MainCtrl provides the required support fo the view.
###### 2 REST apis are exposed. Both of them respect pagination parameters from the client.
###### - api/movies to get all the available movies.
###### - api/movies/search to search the movies list.
###### On the backend the MoviesController handles the above 2 apis.
###### All unit tests and integration tests are in the test folder.
###### Comments are added the code where there was need to provide explanation on decisions taken
