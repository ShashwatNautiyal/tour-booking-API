const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	place: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	maxBooking: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("tour", tourSchema);
