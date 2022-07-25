import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

@Injectable()
export class PasswordsService {
	hash(password: string): Promise<string> {
		return argon2.hash(password);
	}

	compare(hash: string, password: string): Promise<boolean> {
		return argon2.verify(hash, password);
	}
}
