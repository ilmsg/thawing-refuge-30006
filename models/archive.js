const mongoose = require('mongoose');

const archiveSchema = mongoose.Schema({
	slug : { type: String, default: '' },
	title: { type: String, default: '' },
	typeslug: { type: String, default: '' }, // ym => year-month, m => month
	total: { type: String, default: 1 },

	created_at : { type: Date, default: Date.now() },
	modified_at : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Archive', archiveSchema);
