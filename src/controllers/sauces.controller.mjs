import { Sauce } from "../schemas/sauce.schema.mjs";
import express from "express";
import multer from "multer";

/**
 * Add a new sauce to the database
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const addSauce = async (req, res) => {
	const data = JSON.parse(req.body.sauce);

	const sauce = new Sauce({
		name: data.name,
		manufacturer: data.manufacturer,
		description: data.description,
		mainPepper: data.mainPepper,
		heat: data.heat,
		userId: data.userId,
		imageUrl: `${process.env.API_HOST}/api/images/${req.file.filename}`,
	});

	await sauce.save();

	res.send({ message: "created" });
};

/**
 * List all available sauces
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const listSauces = async (req, res) => {
	res.send(await Sauce.find());
};

/**
 * Get a sauce
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getSauce = async (req, res) => {
	res.send(await Sauce.findById(req.params.id));
};
