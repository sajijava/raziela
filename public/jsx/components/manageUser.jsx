var react = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore')
var Actions = require('../Actions')
var Reflux = require('reflux');
var UserItem = require('./userItem')
var AddUser = require('./addUser')


module.exports = React.createClass({
	getInitialState:function(){
		return{
			showEdit:false
		};
	},
	render: function(){
					return <div className="row">
									  <div className="page-header">
											<h3>Manage User </h3>
										</div>
										<div  className="row">
											<span ><a onClick={this.handelAddUser}>Add User</a></span>
											<AddUser showEdit={this.state.showEdit}></AddUser>
										</div>
										<div className="row">
										  <div className="list-group">
												<UserList />
											</div>
										</div>
									</div>
					},
	triggerAddUser:function(){
		
		Actions.triggerAddUser();
	},
	handelAddUser:function(){
		this.setState({showEdit:true})
		console.log(this.state.showEdit);
	}
	
});


var UserList = React.createClass({
	mixins:[
		Reflux.listenTo(UserStore,'onChange')
	]	,
	getInitialState:function(){
		return {
				userList:{}
		}
	},
	componentWillMount:function(){
		Actions.getUserList();
	},
	
	render:function(){
		//console.log(this.state.userList)
		return <div className="list-group">
							{this.getUserList()}
						</div>
	},
	getUserList:function(){
		
		return (this.state.userList.data)
						?	this.state.userList.data.map(function(m){
								//console.log(m)
								return <UserItem key={m._id} item={m}/>
								//return m.firstName;
							})
						: <h4>No user exist yet!!</h4>;	
	},
	userSelected:function(d){
		console.log(d)
	},
	onChange:function(event, userList){
		console.log(event)
		if (event == 'addUser') {
			console.log('add a user')
			this.state.userList.data.push({});
			this.setState({userList :this.state.userList})
		}else{
			this.setState({userList :userList})
		}
		
	}
})
