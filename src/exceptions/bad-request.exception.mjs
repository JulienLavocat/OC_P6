import { HTTPException } from "./http.exception.mjs";

export default class BadRequestException extends HTTPException {
	constructor(message) {
		super(400, message);
	}
}
