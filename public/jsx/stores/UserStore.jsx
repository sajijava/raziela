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
								this.refreshUserList(response);
						}.bind(this))
		
		},
		updateUser:function(data){
				return Api.post('/api/auth/updateUser',data)
					.then(function(response){
							this.refreshUserList(response);
						}.bind(this))

		},
		removeUser:function(id){
			return Api.delete('/api/auth/removeUser/'+id)
					.then(function(response){
							 this.refreshUserList(response);
						}.bind(this))
				
		},
		triggerChange:function(){
			this.trigger('change',this.userList)
		},
		triggerAddUser:function(){
			this.trigger('addUser',{})	
		},
		refreshUserList:function(response){
				console.log(response);
				if (response.status === 'SUCCESS') {
					this.getUserList();							
				}else{
						console.log(response.message);
					return response.message;
				}
		}
		
})