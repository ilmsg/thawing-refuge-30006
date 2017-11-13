const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	email : { type: String, default: '', unique: true },
	password : { type: String, default: '' },
	profile:{
		firstname: { type: String, default: '' },
		lastname: { type: String, default: '' },
		gender: { type: String, default: '' },
		bio: { type: String, default: '' },
		location: { type: String, default: '' },
		picture: { type: String, default: '' }
	},

	role: { type: String, default: 'user' }, // user, admin

	created_at : { type: Date, default: Date.now() },
	modified_at : { type: Date, default: Date.now() }
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
