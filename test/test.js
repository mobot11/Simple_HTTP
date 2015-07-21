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
     expect(err).to.be.null
     expect(res).to.have.status(200)
     done();
  });
	});
});

describe('/user/:name', function() {
	it('should respond to a get request', function(done) {
		chai.request('localhost:8000')
		.get('/user/:Tyler')
		.end(function (err,res) {
			expect(res).to.have.status(200)
			expect(res).to.be.a('object')
			done()
		});
	});
});

describe('/user/userPost', function(done) {
	it('should respond to a post request', function(done) {
    chai.request('localhost:8000')
        .post('user/userPosts')
        .send('{"name":"Dylan", "message":"a new message"}')
        .end(function(err,res) {
           expect(res).to.eql(undefined)
           done();
     });
	});
});

// describe('/user/userDelete/:name', function () {
// 	it('should respond to a delete request', function (done) {
// 		chai.request('localhost:8000')
// 		.delete('/user/userDelete/:Tyler')
// 		.send( {name: 'Tyler'})
// 		.end(function (err, res) {
// 			expect(err).to.be.null
// 			expect(res).to.have.status(200)
// 			expect(res.body).to.eql({ msg: 'user has been deleted'})
// 			done()
// 		});
// 	});
// });

describe('/user/userPatch/:name', function() {
	it('should respond to a patch request', function (done) {
		chai.request('localhost:8000')
		.patch('/user/userPatch/:Tyler')
		.send({email: "tyler@tyler.tyelr"})
		.end(function (err,res) {
			expect(err).to.be.null
			expect(res).to.have.status(200)
			expect(res.body).to.eql({msg: 'User has been updated'})
			done()
		})
	})
})











