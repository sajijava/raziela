var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.promise = require('bluebird')
mongoose.set('debug',true)

var AccessControlSchema = new Schema({
		userId:{type:String,required:true},
		node:{type:String,required:true}
			
})

module.exports = mongoose.model('AccessControl',AccessControlSchema,'AccessControl');