module.exports = (function(){


	var success = function(data){
		return {'status':'SUCCESS', 'message':'', 'data':data}
	}
	var failure = function(data,message){
		return {'status':'FAILURE', 'message':message, 'data':data}
	}

	return {
		successResponse: success,
		failureResponse: failure
	}
})()