var React = require('react');
var UserStore = require('../stores/UserStore')

module.exports = React.createClass({
	getInitialState:function(){
		return {
			firstName:"",
			lastName:"",
			email:""
			}
	},
	render : function(){
					return <div className="form-horizontal">
									
								<div className="form-group">
									<label className="col-sm-2 control-label">First Name :</label>
									<div className="col-sm-10"> 
										<input type="text" className="form-control"  value={this.state.firstName}
										onChange={this.handelFirstNameChange}/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-2 control-label">Last Name :</label>
									<div className="col-sm-10"> 
										<input type="text" className="form-control" value={this.state.lastName}
										onChange={this.handelLastNameChange}/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-2 control-label">Email :</label>
									<div className="col-sm-10"> 
										<input type="text" className="form-control" value={this.state.email}
										onChange={this.handelEmailChange}/>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-10">
										<button className="btn btn-primary" type="button" onClick={this.addEm}>Add</button>&nbsp;
										<button className="btn btn-primary" type="button" onClick={this.clearEm}>Clear</button>
									</div>
								</div>

						</div>
	},
	handelFirstNameChange:function(event){		this.setState({firstName:event.target.value})	},
	handelLastNameChange:function(event){		this.setState({lastName:event.target.value})	},
	handelEmailChange:function(event){		this.setState({email:event.target.value})	},
	addEm:function(){
		console.log(this.state.firstName+" "+this.state.lastName+" "+this.state.email);
		UserStore.addUser(this.state)
		/*.then(function(err{
			console.log(err)
		})*/
	},
	clearEm:function(){
		this.setState({
				firstName:'',
				lastName:'',
				email:''
				})
	}
	
})
