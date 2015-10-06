var expect = require('chai').expect;
var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Movies API', function(){

    var  server;

    beforeEach(function(done) {

        server = require('./../../server/index');
        setTimeout(done(), 1000);
    });

    afterEach(function(done){

        server.close(done);
    });

    it('Test /api/movies', function(){

        var API = '/api/movies';
        chai.request(server)
            .get(API)
            .query({page:1, itemsPerPage: 33})
            .end(function(err, res) {

                expect(err).to.be.null;

                log(res.body);

                expect(res).to.be.json;
                expect(res).to.have.status(200);

                expect(res.body.page).to.equal('1');
                expect(res.body.itemsPerPage).to.equal(33);

            });
    });


    it('Test /api/movies/search', function(){

        var API = '/api/movies/search';
        chai.request(server)
            .get(API)
            .query({page:1, itemsPerPage: 12, search: 'SanTa'})
            .end(function(err, res) {

                expect(err).to.be.null;

                log(res.body);

                expect(res).to.be.json;
                expect(res).to.have.status(200);

                expect(res.body.page).to.equal('1');
                expect(res.body.movies).to.have.length(3);
                expect(res.body.resultCount).to.equal(3);
                expect(res.body.totalCount).to.equal(160);
                expect(res.body.itemsPerPage).to.equal(12);
            });
    });

    function log(body){

        for(var key in body){

            console.log(key);
            console.log(body[key]);
        }
    }
});
