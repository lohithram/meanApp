describe('Test the movies service providing list and search apis', function(){

    beforeEach( function(){
        browser.driver.get('http://localhost:8000/');
    });

    it('User can initially see full list of movies', function(){

        expect(element(by.css('.match')).getText()).toBe('Matched 160 of 160 movies total');

        // Verify that there are 32 pages
        expect(element.all(by.repeater('pageNumber in pages')).count()).toEqual(32);
    });

    it('User selects 20 items per page, verify pagination is updated correctly', function(){

        element.all(by.css('.btn-default')).then(function(items){

            //console.log(items);

            items[2].click().then(function(){

                // Verify that there are 8 pages
                expect(element.all(by.repeater('pageNumber in pages')).count()).toEqual(8);
                // Verify there are 20 items in the list
                expect(element.all(by.repeater('movie in movies')).count()).toEqual(20);
            });
        });
    });

    it('User searches for "sEA" - verify the search matches 3 movies, verify the pagination is updated', function(){

        element(by.model('query')).sendKeys('sEA');

        expect(element(by.css('.match')).getText()).toBe('Matched 3 of 160 movies total');

        // Verify that there is 1 page
        expect(element.all(by.repeater('pageNumber in pages')).count()).toEqual(1);
    });

    it('User searches for "The" and selects 13th page - verify the search matches 61 movies, verify the list of items on 13th page is 1  ', function(){

        element(by.model('query')).sendKeys('The');

        expect(element(by.css('.match')).getText()).toBe('Matched 61 of 160 movies total');

        // Verify that there are 13 pages
        expect(element.all(by.repeater('pageNumber in pages')).count()).toEqual(13);

        // Click on the 13th page
        element.all(by.repeater('pageNumber in pages')).then(function(items){

            items[12].click().then(function(){

                expect(element.all(by.repeater('movie in movies')).count()).toEqual(1);
            })
        });
    });

});