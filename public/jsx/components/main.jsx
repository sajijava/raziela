var React = require('react')
var Header = require('./header')

module.exports = React.createClass({
				render:function(){
							return <div className="row"> 
												<Header />	
												{this.props.children}
										</div>
				}
			});

