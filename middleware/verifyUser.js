import UserModel from "../models/IndividualUserModels/IndividualUserModel.model.js";

export const verifyUser = async (req, res, next) => {
	try {
		const { user_email } = req.method == "GET" ? req.query : req.body;

		// check the user existence
		let exist = await UserModel.findOne({ user_email });
		if (!exist) return res.status(404).send({ error: "Can't find user" });
		next();
	} catch (error) {
		// return res.status(404).send({ error: "Authentication Error" });
		throw new Error(error);
	}
};
