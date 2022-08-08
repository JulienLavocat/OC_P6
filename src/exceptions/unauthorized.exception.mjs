import { HTTPException } from "./http.exception.mjs";

export default class UnauthorizedException extends HTTPException {
	constructor(message) {
		super(401, message);
	}
}
