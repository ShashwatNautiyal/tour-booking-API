const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
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
		review: {
			comment: String,
			rating: Number,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
