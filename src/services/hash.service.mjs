import * as argon2 from "argon2";

export class HashService {
	/**
	 * Hash a password
	 * @param {string} password password to hash
	 * @returns The hashed password
	 */
	static hash(password) {
		return argon2.hash(password);
	}

	/**
	 * Safely compare a hash against another string
	 * @param {string} hash hash of the stored password
	 * @param {string} password Value to verify against stored password
	 * @returns
	 */
	static compare(hash, password) {
		return argon2.verify(hash, password);
	}
}
