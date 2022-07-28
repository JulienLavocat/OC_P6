import express from "express"; // eslint-disable-line no-unused-vars
import { HashService } from "../../services/hash.service.mjs";
import { Password } from "../../schemas/password.schema.mjs";
import { User } from "../../schemas/user.schema.mjs";
import mongoose from "mongoose";
import UnauthorizedException from "../../exceptions/UnauthorizedException.mjs";
import { TokensService } from "../../services/tokens.service.mjs";

/**
 * Register a new user using the provider DTO
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const register = async (req, res) => {
	req.body.password = await HashService.hash(req.body.password);

	const id = new mongoose.Types.ObjectId();
	const password = new Password({
		_id: id,
		password: req.body.password,
	}).save();

	const user = new User({
		_id: id,
		email: req.body.email,
	}).save();

	await Promise.all([user, password]);

	res.send({ success: true });
};

/**
 * Login a user
 * @param {express.Request} req
 * @param {express.Result} res
 */
export const login = async (req, res) => {
	// req.body was validated and both fields are required so it's safe to decompose here
	const { email, password } = req.body;

	const user = await User.findOne(
		{
			email,
		},
		{ _id: true }, // Projection to return only the document's id
	);

	const passwordDoc = await Password.findById(user._id);
	if (
		!passwordDoc ||
		!(await HashService.compare(passwordDoc.password, password))
	) {
		throw new UnauthorizedException("Invalid email or password");
	}

	res.send({ userId: user._id, token: TokensService.sign(user) });
};
