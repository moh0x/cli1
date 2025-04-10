const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		token:{
			type:String,
			default:null
		},
        role:{
            type:String,
			enum:['user','company']
        },
		phoneNumber:{
			type:String,
			required:true
		},
		addrese:{
			type:String,
			required:true
		},

	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {User}
