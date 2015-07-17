var chai = require("chai");
var expect = require("chai").expect;
var chaiHttp = require("chai-http");
var app = require('../server.js');

chai.use(chaiHttp);

describe('/users', function() {
	it('should respond to a get request', function(done) {
	chai.request('localhost:8000')
  .get('/users')
  .end(function (err, res) {
     expect(err).to.be.null;
     expect(res).to.have.status(200);
     done();
  });
	})
})

describe('/user/:name', function() {
	it('should respond to a get request', function(done) {
		chai.request('localhost:8000')
		.get('/user/:Tyler')
		.end(function (err,res) {
			expect(res).to.have.status(200)
			expect(res).to.be.a('object');
			done();
		})
	})
})

describe('/user/userPost/:Dylan', function(done) {
	it('should respond with a message that user was created', function(done) {
    chai.request('localhost:8000')
        .post('user/userPost:Dylan')
        .send('{"name":"Dylan", "message":"a new message"}')
        .end(function(err,res) {
        	expect(err).to.be.null;
        	expect(res).to.have.status(200);
      })
	})
})














