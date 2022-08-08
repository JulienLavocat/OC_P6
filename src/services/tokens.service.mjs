import jwt from "jsonwebtoken";

export class TokensService {
	/**
	 * Sign a user token
	 * @param {User} user
	 * @returns
	 */
	static sign(user) {
		return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	}

	/**
	 * Verify a JWT
	 * @param {string} token
	 * @returns user details
	 */
	static verify(token) {
		return jwt.verify(token, process.env.JWT_SECRET);
	}
}
