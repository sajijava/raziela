var React = require('react')
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
				render:function(){
						return <nav className="navbar navbar-inverse header">
										<div className="container-fluid">
											<Link to="/" className="navbar-brand">Raziela - <i>my secret is God</i></Link>
											
											<ul  className="nav navbar-nav navbar-right">
												<li><Link to="/manageUser">Manage User</Link></li>
											</ul>
										</div>
									</nav>
						
				}
			})

