import { HTTPException } from "./http.exception.mjs";

export class NotFoundException extends HTTPException {
	constructor(message) {
		super(404, message);
	}
}
