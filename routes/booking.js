const router = require("express").Router();
const moment = require("moment");
const booking = require("../models/bookingSchema.js");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken.js");

router.post("/", verifyUser, (req, res) => {
	const newBooking = {
		tour: req.body.tour,
		user: req.body.user,
		people: req.body.people,
	};

	booking.create(newBooking, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.get("/", (req, res) => {
	booking
		.find({ user: req.query.user })
		.populate("tour user")
		.exec((err, data) => {
			data.map((item) => (item.user.password = undefined));
			if (err) {
				return res.status(500).send(err);
			} else {
				return res.status(200).send(data);
			}
		});
});

router.delete("/:id", verifyUser, async (req, res) => {
	booking.findOne({ _id: req.params.id }).exec((err, bookingData) => {
		if (!bookingData) return res.send("Not Found");
		let date = moment(bookingData.createdAt);
		let now = moment();
		if (Math.ceil((now - date) / (24 * 60 * 60 * 1000)) <= 3) {
			booking.remove({ _id: req.params.id }).exec((err, data) => {
				return res.status(200).send(data);
			});
		} else {
			return res
				.status(400)
				.send(`Its been ${Math.ceil((now - date) / (24 * 60 * 60 * 1000))} Days, You can't delete now.`);
		}
	});
});

module.exports = router;
