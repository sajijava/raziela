var UserAuthModel = require('./model/UserAuth');
var response = require('./ResponseView');
var url = require('./URLs');
var _ = require('lodash')

//console.log(response)
var addUser = function(req, res){
	var userInfo = req.body;
	var validationMsg = validateUser(userInfo);
	if (validationMsg.length == 0) {
		try{
			
			var id = new Date().getTime();
			var newUser  =  new UserAuthModel();
			newUser.firstName = userInfo.firstName;
			newUser.lastName = userInfo.lastName;
			
			newUser.save(function(err){
				if (err) {
					console.log(err);
					res.json(response.failureResponse(null,err))
				}else{
					console.log('saved')
					res.json(response.successResponse(newUser))
				}
			})
		}catch(e){
			
			res.json(response.failureResponse(null,e))
		}
	}else{
		
		res.json(response.failureResponse(null,validationMsg))
	}
	
}

var getUserList = function(req, res){

	UserAuthModel.find().exec()
	.then(function(da){
			
			res.json(response.successResponse(da));
		})
}

var validateUser = function(userInfo){
	var message = "";
	
	if (!userInfo.firstName
		 || !_.isString(userInfo.firstName
	 	 || userInfo.firstName.length == 0)) {
				message = "User's first name is empty."
	}
	if (!userInfo.lastName
		 || !_.isString(userInfo.lastName
	 	 || userInfo.lastName.length == 0)) {
				message += "User's last name is empty"
	}
	
		
	return message;
}

var updateUser = function(req, res){
	
}

var removeUser = function(req, res){
	
	var id = req.params.id;
	console.log(id);
	if (id) {
		try{		
				UserAuthModel.findOneAndRemove({'_id':id},function(err){
						console.log(err)
					if (err) {
						console.log(err);
						res.json(response.failureResponse(null,err))
					}else{
						console.log('removed')
						res.json(response.successResponse({}))
					}
				})
		}catch(e){
			res.json(response.failureResponse(null,e))
		}
	}
}

exports.setRoutes = function(app){
	app.post(url.user.ADD_USER, addUser)
	app.put(url.user.UPDATE_USER, updateUser)
	app.delete(url.user.REMOVE_USER, removeUser)
	app.get(url.user.GET_USER_LIST, getUserList)
}