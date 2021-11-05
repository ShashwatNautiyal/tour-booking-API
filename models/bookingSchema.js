const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
	{
		tour: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "tour",
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		people: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
