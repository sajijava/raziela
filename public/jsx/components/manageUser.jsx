var react = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore')
var Actions = require('../Actions')
var Reflux = require('reflux');


module.exports = React.createClass({
	render: function(){
					return <div>
									  <div className="page-header">
											<h3>Manage User </h3>
										</div>
										<div >
										  <div className="list-group">
												<UserList />
											</div>
										</div>
									</div>
					}
});



var UserItem = React.createClass({
	getInitialState : function(){
		//console.log(this.props)
		return {
			canShowIcon:false,
			user: this.props.item
		}
	},
	render:function(){
		//return <h2>hi</h2>
		return <div className="list-group-item" onMouseEnter={this.handleShowIcons} onMouseLeave={this.handleHideIcons}>
												<div className="row">
													<div className="col-sm-10">{this.state.user.firstName} {this.state.user.lastName}</div>
													{this.showIcons()}
												</div>
												<div className="row">more details</div>
								
								</div>
	},
	handleShowIcons :function(){
			this.setState({canShowIcon: true});
	},
	handleHideIcons :function(){
			this.setState({canShowIcon: false});
	},
	showIcons:function()
	{
		return  (this.state.canShowIcon)?<div className="col-sm-2 btn-toolbar ">
							<span className="btn-group btn-group-sm glyphicon glyphicon-trash pull-right"></span>&nbsp;
							<span className="btn-group btn-group-sm glyphicon glyphicon-pencil pull-right"></span>
						</div>
						:<div className="col-sm-2 btn-toolbar ">&nbsp;</div>

	}
})


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
		console.log(this.state.userList)
		return <div className="list-group">
							{this.getUserList()}
						</div>
	},
	getUserList:function(){
		
		return (this.state.userList.data)
						?	this.state.userList.data.map(function(m){
								console.log(m)
								return <UserItem key={m._id} item={m}/>
								//return m.firstName;
							})
						: <h4>No user exist yet!!</h4>;	
	},
	userSelected:function(d){
		console.log(d)
	},
	onChange:function(event, userList){
		console.log("onChange "+event)
		this.setState({userList :userList})
	}
})
