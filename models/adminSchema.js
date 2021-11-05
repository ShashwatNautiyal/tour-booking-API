const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		max: 30,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		min: 10,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
});

module.exports = mongoose.model("admin", adminSchema);
