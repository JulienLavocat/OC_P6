import express from "express";
import InternalException from "../exceptions/internal.exception.mjs";
import { NotFoundException } from "../exceptions/not-found.exception.mjs";
import { Sauce } from "../schemas/sauce.schema.mjs";

/**
 * Check if user is the owner of the sauce, this middleware require the use of isAuthenticated
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function isSauceOwner(req, res, next) {
	// The following 2 errors are 500 internal exceptions and indicates an invalid use of the middleware
	if (!req.user) {
		next(new InternalException("User not found in request"));
		return;
	}
	if (!req.params.id) {
		next(new InternalException("ID not found in params"));
		return;
	}

	// This try allows to also handle Mongoose errors
	try {
		if (
			!(await Sauce.findOne(
				{
					_id: req.params.id,
					userId: req.user._id,
				},
				{ _id: 1 },
			))
		) {
			throw new NotFoundException("Sauce not found");
		}
	} catch (error) {
		next(error);
	}

	next();
}
