import mongoose from "mongoose";

const SauceSchema = new mongoose.Schema({});

export const Sauce = mongoose.model("Sauce", SauceSchema);
