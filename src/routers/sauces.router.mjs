import express from "express";
import * as ctrl from "../controllers/sauces.controller.mjs";

const router = express.Router();

router.get("/", ctrl.listSauces);

export default router;
