var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.promise = require('bluebird')
mongoose.set('debug',true)

var UserSchema = new Schema({
		firstName:{type:String,required:true},
		lastName:{type:String,required:true},
		lastUpdated:{type:Date,required:true,default: Date.now },
		authKey:[{
						 key:{type:String,required:true},
						 state:{type:String,required:true}
		}]
		
});

module.exports = mongoose.model('User',UserSchema,'User');