// eslint-disable-next-line no-unused-vars
import express from "express";

/**
 * Base HTTP exception
 */
export class HTTPException extends Error {
	/**
	 *
	 * @param {number} status HTTP code to return
	 * @param {any} message error's message
	 */
	constructor(status, message) {
		super(message);
		this.status = status;
	}

	/**
	 *
	 * @param {express.Response} res
	 */
	serialize(res) {
		res.status(this.status).send(
			typeof this.message === "string"
				? { message: this.message }
				: this.message,
		);
	}
}
