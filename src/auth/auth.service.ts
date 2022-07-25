import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Password, PasswordDocument } from "../schemas/password.schema";
import { User, UserDocument } from "../schemas/user.schema";
import { CredentialsDto } from "./dto/credentials.dto";
import { PasswordsService } from "./password.service";
import { TokensService } from "./tokens.service";

@Injectable()
export class AuthService {
	constructor(
		private passwords: PasswordsService,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(Password.name)
		private readonly passwordModel: Model<PasswordDocument>,
		private readonly tokens: TokensService,
	) {}

	async signUp(dto: CredentialsDto) {
		const hash = await this.passwords.hash(dto.password);

		const user = await new this.userModel({
			email: dto.email,
		}).save();

		await new this.passwordModel({
			_id: user._id,
			hash: hash,
		}).save();

		return { message: "" };
	}

	async login(dto: CredentialsDto) {
		const user = await this.userModel
			.findOne({
				email: dto.email,
			})
			.select("_id");

		const password = await this.passwordModel
			.findById(user._id)
			.select("hash");

		if (!(await this.passwords.compare(password.hash, dto.password)))
			throw new UnauthorizedException("Invalid email or password");

		return { userId: user._id, token: await this.tokens.sign(user) };
	}
}
