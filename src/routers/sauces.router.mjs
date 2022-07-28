import express from "express";
import * as ctrl from "../controllers/sauces.controller.mjs";
import multer from "multer";
const upload = multer({ dest: "./images" });

const router = express.Router();

router.post("/", upload.single("image"), ctrl.addSauce);
router.get("/", ctrl.listSauces);

export default router;
