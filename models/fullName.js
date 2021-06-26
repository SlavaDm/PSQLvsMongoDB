
const { Schema, model } = require('../mongodb')

const FullName = new Schema({
	n_iter: {
		type: Number,
		unique: true
	},
	first_name: {
		type: String,
		unique: true
	},
	last_name: {
		type: String,
		unique: true
	}
})

module.exports = model('fullname', FullName)
