const Joi = require("@hapi/joi");

const registerValidation = (userReq) => {
	const schema = Joi.object({
		name: Joi.string().min(6).max(30).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().required().pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")),
	});

	return schema.validate(userReq);
};

module.exports.registerValidation = registerValidation;
