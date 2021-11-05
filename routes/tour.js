const express = require("express");
const tour = require("../models/tourSchema.js");
const { verifyAdmin, verifyUser } = require("../middleware/verifyToken.js");

const router = express.Router();

router.post("/", verifyAdmin, (req, res) => {
	let tourReq = req.body;

	const newtour = {
		name: tourReq.name,
		image: tourReq.image,
		place: tourReq.place,
		description: tourReq.description,
		date: tourReq.date,
		maxBooking: tourReq.maxBooking,
	};

	tour.create(newtour, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.get("/", (req, res) => {
	if (req.query.sort === "asc") {
		tour.find()
			.sort({ date: "asc" })
			.exec((err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(data);
				}
			});
	} else {
		tour.find()
			.sort({ date: "desc" })
			.exec((err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(data);
				}
			});
	}
});

router.get("/", (req, res) => {
	tour.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.get("/:id", (req, res) => {
	tour.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.delete("/:id", verifyAdmin, (req, res) => {
	tour.remove({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

module.exports = router;
