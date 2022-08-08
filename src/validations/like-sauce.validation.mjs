import { Joi } from "express-validation";

export const likeSauceValidation = {
	body: Joi.object({
		userId: Joi.string().required(),
		like: Joi.number().allow(-1, 0, 1).only().required(),
	}),
};
