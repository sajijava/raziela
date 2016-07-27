var Api = require('../utils/api');
var Reflux = require('reflux')
var Actions = require('../Actions')


module.exports = Reflux.createStore({
		listenables:[Actions],
		getUserList:function(){
			return Api.get('/api/auth/getUserList')
					.then(function(json){
							this.userList = json.data;
							this.triggerChange();
						}.bind(this))
		
		},
		addUser:function(data){
			return Api.post('/api/auth/addUser',data)
					.then(function(response){
							if (response.status === 'SUCCESS') {
								this.getUserList();							
							}else{
								return response.message;
							}
						}.bind(this))
		
		},
		triggerChange:function(){
			this.trigger('change',this.userList)
		}
		
})