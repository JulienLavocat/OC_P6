import { Sauce } from "../schemas/sauce.schema.mjs";
import express from "express";
import multer from "multer";
import { BadRequestException } from "../exceptions/BadRequestException.mjs";

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

/**
 * Get a sauce
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const deleteSauce = async (req, res) => {
	await Sauce.findOneAndRemove({
		_id: req.params.id,
	});

	res.send({ message: "deleted" });
};

/**
 * Like a sauce
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const likeSauce = async (req, res) => {
	const sauceId = req.params.id;
	const { userId, like } = req.body; // Deconstruction is safe to use here as we validated that both fields are presents

	// Reminder like = 1 -> Liked / 0 -> Removed / -1 -> Diskliked
	switch (like) {
		case 1:
			return handleLike(sauceId, userId, res);
		case 0:
			return handleRemoveLike(sauceId, userId, res);
		case -1:
			return handleDislike(sauceId, userId, res);

		default:
			break;
	}
};

/**
 * Like a sauce
 * @param {string} sauceId
 * @param {string} userId
 * @param {express.Response} res
 */
async function handleLike(sauceId, userId, res) {
	const sauce = await Sauce.findOneAndUpdate(
		{
			_id: sauceId,
			usersLiked: {
				$nin: [userId],
			},
			usersDisliked: {
				$nin: [userId],
			},
		},
		{
			$addToSet: {
				usersLiked: userId,
			},
			$inc: {
				likes: 1,
			},
		},
	);
	res.send(sauce);
}

/**
 * Like a sauce
 * @param {string} sauceId
 * @param {string} userId
 * @param {express.Response} res
 */
async function handleRemoveLike(sauceId, userId, res) {
	const sauce = await Sauce.findById(sauceId);

	const operations = {
		$pull: {},
		$inc: {},
	};

	const hasDisliked = sauce.usersDisliked.includes(userId);
	const hasLiked = sauce.usersLiked.includes(userId);

	if (!hasDisliked && !hasLiked)
		// Can't send an empty query to MongoDB, also invalid front-end state ?
		throw new BadRequestException(
			"Can't remove like if user hasn't already liked or disliked",
		);

	if (hasLiked) {
		operations.$pull = {
			...operations.$pull,
			usersLiked: userId,
		};
		operations.$inc = {
			likes: -1,
		};
	}

	if (hasDisliked) {
		operations.$pull = {
			...operations.$pull,
			usersDisliked: userId,
		};
		operations.$inc = {
			dislikes: -1,
		};
	}

	const updated = await Sauce.findByIdAndUpdate(sauceId, operations);
	res.send(updated);
}

/**
 * Remove a (dis)like on a sauce
 * @param {string} sauceId
 * @param {string} userId
 * @param {express.Response} res
 */
async function handleDislike(sauceId, userId, res) {
	const sauce = await Sauce.findOneAndUpdate(
		{
			_id: sauceId,
			usersDisliked: {
				$nin: [userId],
			},
			usersLiked: {
				$nin: [userId],
			},
		},
		{
			$addToSet: {
				usersDisliked: userId,
			},
			$inc: {
				dislikes: 1,
			},
		},
	);
	res.send(sauce);
}
