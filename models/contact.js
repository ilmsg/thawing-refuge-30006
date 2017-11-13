const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	email : { type: String, default: '' },
	name: { type: String, default: '' },
	message: { type: String, default: '' },

	created_at : { type: Date, default: Date.now() },
	modified_at : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Contact', contactSchema);
