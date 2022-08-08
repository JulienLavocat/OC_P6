import express from "express";
import * as ctrl from "../controllers/sauces.controller.mjs";
import multer from "multer";
import { validate } from "express-validation";
import { likeSauceValidation } from "../validations/like-sauce.validation.mjs";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware.mjs";
import { isSauceOwner } from "../middlewares/is-sauce-owner.middleware.mjs";

const upload = multer({ dest: "./images" });

const router = express.Router();

router.use(isAuthenticated);

router.post("/", upload.single("image"), ctrl.addSauce);
router.get("/", ctrl.listSauces);
router.get("/:id", ctrl.getSauce);
router.put("/:id", isSauceOwner, upload.single("image"), ctrl.updateSauce);
router.delete("/:id", isSauceOwner, ctrl.deleteSauce);
router.post(
	"/:id/like",
	isSauceOwner,
	validate(likeSauceValidation),
	ctrl.likeSauce,
);

export default router;
