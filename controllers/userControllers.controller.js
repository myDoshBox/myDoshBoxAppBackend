const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Transaction = require("../models/transactionModel.model");

// @desc getAllUsers
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-user_password").lean();
	if (!users?.length) {
		return res.status(400).json({ message: "no users found" });
	}

	res.json(users);
});

// @desc createNewUser
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
	// const { user_email, user_phone_num, user_password, roles } = req.body;
	const { user_email, user_phone_num, user_password } = req.body;
	// console.log(req.body);

	// // confirm data
	// if (
	// 	!user_email ||
	// 	!user_phone_num ||
	// 	!user_password ||
	// 	!Array.isArray(roles) ||
	// 	!roles.length
	// ) {
	// 	return res.status(400).json({ message: "all fields are required" });
	// }

	// confirm data
	if (!user_email || !user_phone_num || !user_password) {
		return res.status(400).json({ message: "all fields are required" });
	}

	// check for duplicates
	const duplicate = await User.findOne({ user_email }).lean().exec();

	if (duplicate) {
		return res.status(409).json({ message: "User Already Exist" });
	}

	// hash password
	const hashedPass = await bcrypt.hash(user_password, 10);
	const userObj = {
		user_email,
		user_phone_num,
		user_password: hashedPass,
		// roles,
	};

	console.log(userObj);

	// create and store new user
	const user = await User.create(userObj);

	if (user) {
		res.status(201).json({ message: "User Created Successfully" });
	} else {
		res.status(400).json({ message: "invalid user data received" });
	}
});

// @desc updateUser
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
	// const { id, user_email, user_phone_num, user_password, user_name, roles } =
	// 	req.body;

	const { id, user_email, user_phone_num, user_password, user_name } = req.body;

	// confirm data
	// if (
	// 	!id ||
	// 	!user_email ||
	// 	!user_phone_num ||
	// 	!user_name ||
	// 	!Array.isArray(roles) ||
	// 	!roles.length ||
	// 	typeof active !== "boolean"
	// ) {
	// 	return res.status(400).json({ message: "All fields are required" });
	// }

	if (!id || !user_email || !user_phone_num || !user_name) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const user = await User.findById(id).exec();

	if (!user) {
		return res.status(400).json({ message: "User not Found" });
	}

	// check for duplicate
	const duplicate = await User.findOne({ user_email }).lean().exec();

	// allow update to the original user
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: "Duplicate email" });
	}

	user.user_email = user_email;
	user.user_phone_num = user_phone_num;
	// user.user_password = user_password;
	user.user_name = user_name;
	// user.roles = roles;
	// user.active = active;

	if (user_password) {
		// hash password
		user.password = await bcrypt.hash(user_password, 10);
	}

	// const updatedUser = await user.save();
	const updatedUser = await user.save();
	console.log(updatedUser);

	res.json({ message: `${updatedUser.user_email} data updated successfully` });
});

// @desc deleteUser
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: "User id Required" });
	}

	// const transaction = await Transaction.findOne({ user: id }).lean().exec();

	// if (transaction?.length) {
	// 	return res.status(400).json({ message: "user has transactions" });
	// }

	const user = await User.findById(id).exec();

	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	const result = await user.deleteOne();

	// const reply = `User ${result.user_email} with ID ${result.id}`;

	res.json(
		`User ${result.user_email} with ID ${result.id} was deleted successfully`
	);
});

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
};
