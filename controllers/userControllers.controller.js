import UserModel from "../models/IndividualUserModels/IndividualUserModel.model.js";
import bcrypt from "bcrypt";

/** GET: http://localhost:5000/users/user/:user_id */
export const getUser = async (req, res) => {
	try {
		const user = await UserModel.findOne(req.params._id)
			.select("-user_password")
			.lean();

		if (!user) {
			return res.status(400).json({ message: "User not Found" });
		}

		res.json(user);
	} catch (err) {
		throw new Error(err);
	}
};

/** GET: http://localhost:5000/users */
export const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find().select("-user_password").lean();
		if (!users?.length) {
			return res.status(400).json({ message: "no users found" });
		}

		res.json(users);
	} catch (error) {
		throw new Error(error);
	}
};

// /** PUT: http://localhost:5000/users/updateuser
//  * @param: {
//  * "id": "<userid>"
//  * }
//  *
//  * body: {
//  * "email": "kor@gmail.com",
//  * "phonenum": "1232455",
//  * "username": "jane doe",
//  * "fullname": "Ada Jones"
//  * }
//  */
// export const updateUser = async (req, res) => {
// 	try {
// 		let {
// 			// id: _id,
// 			id,
// 			user_email,
// 			user_phone_num,
// 			user_password,
// 			full_name,
// 			user_name,
// 		} = req.body;

// 		// user_email = user_email.trim();
// 		// user_phone_num = user_phone_num.trim();
// 		// user_password = user_password.trim();
// 		// full_name = full_name.trim();
// 		// user_name = user_name.trim();

// 		// console.log(req.body);

// 		// confirm data
// 		// if (
// 		// 	!(user_email || user_phone_num || user_password || full_name || user_name)
// 		// ) {
// 		// 	return res.status(400).json({ message: "All fields are required" });
// 		// }

// 		// confirm data
// 		if (
// 			(user_email === "" || user_phone_num === "" || user_password === "",
// 			user_password === "" || user_name === "")
// 		) {
// 			return res.status(400).json({ message: "all fields are required" });
// 		}

// 		const user = await UserModel.findOne({ user_email }).exec();
// 		// console.log(user);
// 		// const user = await UserModel.findOne(req.params._id)
// 		// 	.select("-user_password")
// 		// 	.lean();
// 		// const user = await UserModel.findOne(req.params._id).lean().exec();

// 		if (!user) {
// 			return res.status(400).json({ message: "User not Found" });
// 		}

// 		// check for duplicate
// 		const duplicate = await UserModel.findOne({ user_email }).lean().exec();
// 		// console.log(duplicate);

// 		// allow update to the original user
// 		if (duplicate && duplicate?._id.toString() !== id) {
// 			return res.status(409).json({ message: "Duplicate email" });
// 		}

// 		user.user_email = user_email;
// 		user.user_phone_num = user_phone_num;
// 		// user.user_password = user_password;
// 		user.full_name = full_name;
// 		user.user_name = user_name;
// 		// user.roles = roles;
// 		// user.active = active;

// 		if (user_password) {
// 			// hash password
// 			user.user_password = await bcrypt.hash(user_password, 10);
// 		}

// 		// const updatedUser = await user.save();
// 		const updatedUser = await user.save();
// 		// console.log(updatedUser);

// 		res.json({
// 			message: `${updatedUser.user_email} data updated successfully`,
// 		});
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// };

/** PUT: http://localhost:5000/users/updateuser
 * @param: {
 * "id": "<userid>"
 * }
 *
 * body: {
 * "email": "kor@gmail.com",
 * "phonenum": "1232455",
 * "username": "jane doe",
 * "fullname": "Ada Jones"
 * }
 */
export const updateUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.user._id);

		if (user) {
			let { user_email, user_phone_num, full_name, user_name } = req.body;

			// confirm data
			if (
				user_email === "" ||
				user_phone_num === "" ||
				full_name === "" ||
				user_name === ""
			) {
				return res.status(400).json({ message: "all fields are required" });
			}
		}

		// check for duplicate
		const duplicate = await UserModel.findOne({ user_email }).lean().exec();
		// console.log(duplicate);

		// allow update to the original user
		if (duplicate && duplicate?._id.toString() !== duplicate._id) {
			return res.status(409).json({ message: "Duplicate email" });
		}

		user.user_email = user_email;
		user.user_phone_num = user_phone_num;
		user.full_name = full_name;
		user.user_name = user_name;

		if (user_password) {
			// hash password
			user.user_password = await bcrypt.hash(user_password, 10);
		}

		// const updatedUser = await user.save();
		const updatedUser = await user.save();
		// console.log(updatedUser);

		res.json({
			message: `${updatedUser.user_email} data updated successfully`,
		});
	} catch (error) {
		throw new Error(error);
	}
};

/** DELETE: http://localhost:5000/users/deleteuser */
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.body;

		console.log(id);

		if (!id) {
			return res.status(400).json({ message: "User id Required" });
		}

		// const transaction = await Transaction.findOne({ user: id }).lean().exec();

		// if (transaction?.length) {
		// 	return res.status(400).json({ message: "user has transactions" });
		// }

		const user = await UserModel.findById(id).exec();

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const result = await user.deleteOne();

		// const reply = `User ${result.user_email} with ID ${result.id}`;

		res.json(
			`User ${result.user_email} with ID ${result.id} was deleted successfully`
		);
	} catch (error) {
		throw new Error(error);
	}
};
