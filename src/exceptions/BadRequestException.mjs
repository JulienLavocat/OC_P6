import { HTTPException } from "./http.exception.mjs";

export class BadRequestException extends HTTPException {
	constructor(message) {
		super(400, message);
	}
}
