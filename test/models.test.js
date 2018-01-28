//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Movie = require('./../server/movie');

/* Require the dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server/index');
const should = chai.should();

chai.use(chaiHttp);
const request = chai.request(server);

//Our parent block
describe('Movies', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        Movie.remove({}, (err) => {
            done();
        });
    });
    after(done => done());
    /*
     * Test the /GET route
     */
    describe('/GET /api/movies', () => {
        it('it should GET all the movies', (done) => {
            request
                .get('/api/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST /api/movies', () => {
        it('it should POST a movie ', (done) => {
            let movie = {
                name: "Guardians of the Galaxy: Vol II",
                description: "intresting movie",
                rating: "9.0",
                image: "guardiansofthegalaxy.jpg"
            }
            request
                .post('/api/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id /api/movies', () => {
        it('it should GET a movie by the given id', (done) => {
            let movie = new Movie({ name: "Geek Charming", description: "romantic movie", rating: "6.0", image: "geekcharming.jpg" });
            movie.save((err, movie) => {
                request
                    .get('/api/movies/' + movie.id)
                    .send(movie)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('description');
                        res.body.should.have.property('rating');
                        res.body.should.have.property('image');
                        res.body.should.have.property('_id').eql(movie.id);
                        done();
                    });
            });

        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id /api/movies', () => {
        it('it should UPDATE a movie given the id', (done) => {
            let movie = new Movie({ name: "The Chronicles of Narnia", description: "C.S. Lewis", rating: "1948", image: "778" })
            movie.save((err, movie) => {
                request
                    .put('/api/movies/' + movie.id)
                    .send({ name: "The Chronicles of Narnia", description: "C.S. Lewis", rating: "1950", image: "778" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('rating').eql("1950");
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id /api/movies', () => {
        it('it should DELETE a movies given the id', (done) => {
            let movie = new Movie({ name: "The Chronicles of Narnia", description: "C.S. Lewis", rating: "1948", image: "778" })
            movie.save((err, movie) => {
                request
                    .delete('/api/movies/' + movie.id)
                    .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
});