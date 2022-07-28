import { Joi } from "express-validation";

export const registerValidation = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};
