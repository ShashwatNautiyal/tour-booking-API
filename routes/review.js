const router = require("express").Router();
const review = require("../models/reviewSchema.js");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken.js");

router.post("/", verifyUser, (req, res) => {
	const newReview = {
		tour: req.body.tour,
		user: req.body.user,
		review: req.body.review,
	};

	review.create(newReview, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.get("/", verifyAdmin, (req, res) => {
	review
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

router.get("/:id", (req, res) => {
	review
		.find({ tour: req.params.id })
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

module.exports = router;
