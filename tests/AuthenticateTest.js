process.env.NODE_ENV = 'test'

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../app');
var url = require('../routes/URLs');

chai.use(chaiHttp);
var should  = chai.should();

//console.log(app)
describe('User Authentication', function(){

	describe('Adding user',function(){
		it('should add a new user',function(done){
			chai.request(app)
			.post(url.user.ADD_USER)
			.send({'firstName':'s','lastName':'m'})
			.end(function(err, res){
				console.log(" a"+JSON.stringify(res.body))
					res.should.have.status(200)
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('message');
					res.body.should.have.property('data');
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('lastUpdated');
					res.body.data.lastUpdated.should.not.be.null;
					res.body.status.should.equal('SUCCESS');
					res.body.message.should.equal('');
					done();
				})
		});
		
		it('should error when last name are missing',function(done){
			chai.request(app)
			.post(url.user.ADD_USER)
			.send({'firstName':'s'})
			.end(function(err, res){
					res.should.have.status(200)
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('message');
					res.body.should.have.property('data');
					res.body.status.should.equal('FAILURE');
					res.body.message.should.not.null;
					done();
				})
		});
		
		it('should error when first name are missing',function(done){
			chai.request(app)
			.post(url.user.ADD_USER)
			.send({'lastName':'s'})
			.end(function(err, res){
					res.should.have.status(200)
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('message');
					res.body.should.have.property('data');
					res.body.status.should.equal('FAILURE');
					res.body.message.should.not.null;
					done();
				})

		});
		it('should error when names are missing',function(done){
						chai.request(app)
			.post(url.user.ADD_USER)
			.send({'lastName':'s'})
			.end(function(err, res){
					res.should.have.status(200)
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('message');
					res.body.should.have.property('data');
					res.body.status.should.equal('FAILURE');
					res.body.message.should.not.null;
					done();
				})
		});
		
		it('should get a list of users',function(done){
		
		
			chai.request(app)
			.get(url.user.GET_USER_LIST)
			.end(function(err, res){
					res.should.have.status(200)
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('message');
					res.body.should.have.property('data');
					res.body.status.should.equal('SUCCESS');
					res.body.data.should.not.null;
					done()
				})
			
		})
		
	})
})

