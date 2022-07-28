import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { ValidationError } from "express-validation";
import router from "./routers/auth.router.mjs";
import * as mongoose from "./mongoose.mjs";
import { HTTPException } from "./exceptions/http.exception.mjs";

(async function () {
	// Load .env file
	dotenv.config();

	await mongoose.connect();

	const app = express();

	// Helmet is a middleware that helps with security and should be used first
	app.use(helmet());

	// Handle JSON parsing
	app.use(express.json());

	// Router where all authentications routes resides (signup/login/etc.)
	app.use("/auth", router);

	// Handle validations errors thrown by express-validation
	app.use((err, req, res) => {
		if (err instanceof ValidationError) {
			return res.status(err.statusCode).json(err);
		}

		return res.status(500).json(err);
	});

	app.listen(3000, () => {
		console.log("Listening on 3000");
	});
})();
