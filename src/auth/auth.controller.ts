import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDto } from "./dto/credentials.dto";

@Controller("auth")
export class AuthController {
	constructor(private auth: AuthService) {}

	@Post("/signup")
	signUp(@Body() dto: CredentialsDto) {
		return this.auth.signUp(dto);
	}

	@Post("/login")
	login(@Body() dto: CredentialsDto) {
		return this.auth.login(dto);
	}
}
