import mongoose from "mongoose";

export const connect = async () =>
	mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
	});
