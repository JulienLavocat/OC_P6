import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
	password: { type: String, required: true },
});

export const Password = mongoose.model("Password", PasswordSchema);
