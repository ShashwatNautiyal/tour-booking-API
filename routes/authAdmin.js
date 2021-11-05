const router = require("express").Router();
const admin = require("../models/adminSchema");
const { registerValidation } = require("../middleware/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
	let adminReq = req.body;
	const saltRounds = 10;
	const { error } = registerValidation(adminReq);
	const emailExist = await admin.findOne({ email: req.body.email }).exec();

	if (error) return res.status(400).send(error.details[0].message);
	else if (emailExist) return res.status(400).send("Email already exists");
	else {
		bcrypt.hash(adminReq.password, saltRounds).then((hash) => {
			adminReq.password = hash;
			admin.create(adminReq, (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(201).send({ _id: data._id });
				}
			});
		});
	}
});

router.post("/login", async (req, res) => {
	const _admin = await admin.findOne({ email: req.body.email }).exec();

	if (!_admin) return res.status(400).send("Email doesn't exist");
	else {
		bcrypt.compare(req.body.password, _admin.password).then(function (result) {
			if (result) {
				const token = jwt.sign(
					{
						_id: _admin._id,
						name: _admin._id,
						email: _admin.email,
					},
					process.env.JWT_ADMIN_KEY
				);
				res.header("auth-token", token).send(token);
			} else {
				res.status(400).send("Wrong Password");
			}
		});
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const saltRounds = 10;
		req.body.password = req.body.password && bcrypt.hashSync(req.body.password, saltRounds);
		const updatedAdmin = await admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

		if (!updatedAdmin) {
			return res.status(400).send({ message: "Could not update admin" });
		}
		return res.status(200).send({ message: "admin updated successfully", updatedAdmin });
	} catch (error) {
		return res.status(400).send({ error: "An error has occurred, unable to update admin" });
	}
});

module.exports = router;
