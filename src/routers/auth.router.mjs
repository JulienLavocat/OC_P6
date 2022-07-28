import * as ctrl from "../controllers/auth.controller.mjs";
import * as express from "express";
import { validate } from "express-validation";
import { loginValidation } from "../validations/login.validation.mjs";
import { registerValidation } from "../validations/register.validation.mjs";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post(
	"/signup",
	validate(registerValidation),
	asyncHandler(ctrl.register),
);

router.post("/login", validate(loginValidation), asyncHandler(ctrl.login));

export default router;
