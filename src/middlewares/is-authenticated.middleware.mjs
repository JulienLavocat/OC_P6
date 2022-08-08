import express from "express";
import { TokensService } from "../services/tokens.service.mjs";
import UnauthorizedException from "../exceptions/unauthorized.exception.mjs";

/**
 * Check if user is the owner of the sauce
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function isAuthenticated(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization)
		next(new UnauthorizedException("Authorization header not found"));

	try {
		const user = TokensService.verify(authorization.split(" ")[1]);
		req.user = user;
	} catch (error) {
		next(error);
	}

	next();
}
