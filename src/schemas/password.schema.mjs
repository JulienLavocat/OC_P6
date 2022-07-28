import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
	password: String,
});

export const Password = mongoose.model("Password", PasswordSchema);
