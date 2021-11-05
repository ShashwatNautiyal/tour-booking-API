const mongoose = require("mongoose");
const bookingSchema = require("./bookingSchema");
const reviewSchema = require("./reviewSchema");

const userSchema = new mongoose.Schema({
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

userSchema.post("remove", async function (res, next) {
	await bookingSchema.deleteMany({ userId: this._id });
	await reviewSchema.deleteMany({ userId: this._id });
	next();
});

module.exports = mongoose.model("user", userSchema);
