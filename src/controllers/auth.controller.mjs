import express from "express"; // eslint-disable-line no-unused-vars
import BadRequestException from "../exceptions/bad-request.exception.mjs";
import UnauthorizedException from "../exceptions/unauthorized.exception.mjs";
import { Password } from "../schemas/password.schema.mjs";
import { User } from "../schemas/user.schema.mjs";
import { HashService } from "../services/hash.service.mjs";
import { TokensService } from "../services/tokens.service.mjs";

const invalidEmailOrPassword = new UnauthorizedException(
	"Invalid email or password",
);

/**
 * Register a new user using the provider DTO
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const register = async (req, res) => {
	req.body.password = await HashService.hash(req.body.password);

	try {
		const user = await new User({
			email: req.body.email,
		}).save();

		await new Password({
			_id: user._id,
			password: req.body.password,
		}).save();

		res.send({ success: true });
	} catch (error) {
		if (error.code === 11000)
			throw new BadRequestException("Email address already in use");
	}
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

	if (!user) throw invalidEmailOrPassword;

	const passwordDoc = await Password.findById(user._id);
	if (
		!passwordDoc ||
		!(await HashService.compare(passwordDoc.password, password))
	) {
		throw invalidEmailOrPassword;
	}

	res.send({ userId: user._id, token: TokensService.sign(user) });
};
