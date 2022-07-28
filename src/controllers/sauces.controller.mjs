import { Sauce } from "../schemas/sauce.schema.mjs";

export const listSauces = async (req, res) => {
	res.send(await Sauce.find());
};
