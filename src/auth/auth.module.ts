import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Password, PasswordSchema } from "../schemas/password.schema";
import { User, UserSchema } from "../schemas/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordsService } from "./password.service";
import { TokensService } from "./tokens.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Password.name, schema: PasswordSchema },
		]),
	],
	controllers: [AuthController],
	providers: [AuthService, PasswordsService, TokensService, JwtService],
})
export class AuthModule {}
