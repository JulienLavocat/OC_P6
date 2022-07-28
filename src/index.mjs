import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { ValidationError } from "express-validation";
import authRouter from "./routers/auth.router.mjs";
import saucesRouter from "./routers/sauces.router.mjs";
import * as mongoose from "./mongoose.mjs";
import cors from "cors";
import { HTTPException } from "./exceptions/http.exception.mjs";

(async function () {
	// Load .env file
	dotenv.config();

	await mongoose.connect();

	const app = express();

	app.use("/api/images", express.static("images"));

	// Helmet is a middleware that helps with security and should be used first
	app.use(helmet());

	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
		}),
	);

	// Handle JSON parsing
	app.use(express.json());

	// Router where all authentications routes resides (signup/login/etc.)
	app.use("/api/auth", authRouter);

	app.use("/api/sauces", saucesRouter);

	// Handle validations errors thrown by express-validation
	app.use((err, req, res, next) => {
		if (err instanceof ValidationError) {
			return res.status(err.statusCode).json(err);
		}

		if (err instanceof HTTPException) {
			return err.serialize(res);
		}
		console.error(err);
		return res.status(500).json(err);
	});

	app.listen(3000, () => {
		console.log("Listening on 3000");
	});
})();
