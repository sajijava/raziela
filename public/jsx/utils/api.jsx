//var fetch = require('whatwg-fetch')
var Axios = require('axios')

module.exports={
	get:function(url){
		return Axios.get(url)
		.catch(function (error) {
		  console.log(error);
		});
	},
	post:function(url,data){
		return Axios.post(url, data)
					.catch(function (error) {
							console.log(error);
					});
	},
	delete:function(url){
		return Axios.delete(url)
					.catch(function (error) {
							console.log(error);
					});
	}

}