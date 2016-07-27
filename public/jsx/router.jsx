var ReactRouter = require('react-router')
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var main = require('./components/main');
var manageUser = require('./components/manageUser');
var addUser = require('./components/addUser');

module.exports = (
	<Router>
		<Route path="/" component={main}>
			<Route path="manageUser" component={manageUser}>
			</Route>
			<Route path="addUser" component={addUser}>
			</Route>
		</Route>
	</Router>
)

