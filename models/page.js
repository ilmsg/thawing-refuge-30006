const mongoose = require('mongoose');
const pageSchema = mongoose.Schema({
	title : { type: String, default: '' },
	description: { type: String, default: '' },
	content: { type: String, default: '' },
	tags: { type: String, default: '' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture' },
	view: { type: Number, default: 0 },

	created_at : { type: Date, default: Date.now() },
	modified_at : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Page', pageSchema);
