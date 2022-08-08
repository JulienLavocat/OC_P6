import express from "express";
import * as ctrl from "../controllers/sauces.controller.mjs";
import multer from "multer";
import { validate } from "express-validation";
import { likeSauceValidation } from "../validations/like-sauce.validation.mjs";

const upload = multer({ dest: "./images" });

const router = express.Router();

router.post("/", upload.single("image"), ctrl.addSauce);
router.get("/", ctrl.listSauces);
router.get("/:id", ctrl.getSauce);
router.delete("/:id", ctrl.deleteSauce);
router.post("/:id/like", validate(likeSauceValidation), ctrl.likeSauce);

export default router;
