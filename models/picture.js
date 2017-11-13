const mongoose = require('mongoose');
const pictureSchema = mongoose.Schema({
	path : { type: String, default: '' },

	created_at : { type: Date, default: Date.now() },
	modified_at : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Picture', pictureSchema);
