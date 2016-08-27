var React = require('react');
var UserStore = require('../stores/UserStore')
var Actions = require('../Actions')

module.exports = React.createClass({
	getInitialState : function(){
		//console.log(this.props)
		return {
			canShowIcon:false,
			editUser:false,
			user: this.props.item
		}
	},
	render:function(){
		//return <h2>hi</h2>
		return (this.state.editUser)?this.editable():this.viewable();
	},
	editable : function(){
		return <div className="row list-group-item" >
										<div className="row">
											<div className="col-sm-10">
												<input type="text" id="firstName"  value={this.state.user.firstName} onChange={this.handleChange}/>
												<input type="text" id="lastName" value={this.state.user.lastName} onChange={this.handleChange}/>
											</div>
											<div className="col-sm-2 btn-toolbar ">
												{this.showEditIcons()}
											</div>
										</div>
										<div className="row">more details</div>
						
						</div>
	},
	showEditIcons:function()
	{
			return <div className="">
							<a onClick={this.handleUpdate} ><span className="btn-group btn-group-sm glyphicon glyphicon-ok"></span></a>&nbsp;
							<a onClick={this.handleReset} ><span className="btn-group btn-group-sm glyphicon glyphicon-remove"></span></a>
						</div>
						

	},
	handleUpdate : function(){
			console.log("update it");
	},
	handleReset : function(){
			this.setState({editUser:false})
	},
	handleChange:function(event){
			var edited = this.state.user;
			edited[event.target.id]=event.target.value;
			this.setState({user:edited});
	},
	viewable :function(){
		return <div className="row list-group-item" onMouseEnter={this.handleShowIcons} onMouseLeave={this.handleHideIcons}>
												<div className="row">
													<div className="col-sm-10">{this.state.user.firstName} {this.state.user.lastName}</div>
													<div className="col-sm-2 btn-toolbar ">
														{this.showIcons()}
													</div>
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
		return  (this.state.canShowIcon)?<div className="pull-right">
							<a onClick={this.handleRemove} ><span className="btn-group btn-group-sm glyphicon glyphicon-trash pull-right"></span></a>&nbsp;
							<a onClick={this.handleEdit} ><span className="btn-group btn-group-sm glyphicon glyphicon-pencil pull-right"></span></a>
						</div>
						:<span>&nbsp;</span>

	},
	handleRemove:function(){
		console.log("remove it")
		UserStore.removeUser(this.state.user._id);
		
	},
	handleEdit:function(){
		this.setState({editUser:true})
	}
	
})

