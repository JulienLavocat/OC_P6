import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		MongooseModule.forRoot(process.env.DB_URL, {
			dbName: "piiquante_" + (process.env.PROD ? "prod" : "dev"),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
