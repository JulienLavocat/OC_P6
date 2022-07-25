import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JsonWebTokenError } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { UserDocument } from "../schemas/user.schema";

const forbidden = new ForbiddenException("invalid or expired token");

@Injectable()
export class TokensService {
	constructor(private jwt: JwtService) {}

	sign(user: UserDocument): Promise<string> {
		const payload: Omit<UserToken, "iat" | "exp" | "jti"> = {
			_id: user._id,
		};
		return this.jwt.signAsync(payload, {
			jwtid: nanoid(),
			expiresIn: "1d",
			secret: process.env.JWT_SECRET,
		});
	}

	async verify(token: string): Promise<UserToken> {
		try {
			return await this.jwt.verifyAsync<UserToken>(token);
		} catch (error) {
			if (error instanceof JsonWebTokenError) throw forbidden;
			throw error;
		}
	}
}

export interface UserToken {
	_id: string;
	iat: number;
	exp: number;
	jti: string;
}
