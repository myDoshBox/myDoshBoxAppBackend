// const User = require("../models/User");
// const authService = require("../services/AuthService");
const mailer = require("../utils/Mailer");

import User from "../models/individualUsers.models";
import authService from "../services/individualAuthServices.services";

class UserController {
	async createUser(req, res) {
		try {
			const { name, email, password } = req.body;
			const user = await authService.register({ name, email, password });

			// Send email verification link
			const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
				expiresIn: "1h",
			});
			const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}`;
			await mailer.sendEmailVerification(user.email, verificationLink);

			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	// async updateUser(req, res) {
	// 	try {
	// 		const { user_id } = req.params;
	// 		const updates = req.body;
	// 		await User.update(user_id, updates);
	// 		res.json({ message: "User updated successfully" });
	// 	} catch (error) {
	// 		res.status(500).json({ error: error.message });
	// 	}
	// }

	async update(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id } = req.params;
			const { username, password } = req.body;

			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			user.username = username;
			user.password = password;

			await user.update();

			return res.json({ message: "User updated successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}

	// async deleteUser(req, res) {
	// 	try {
	// 		const { user_id } = req.params;
	// 		await User.delete(user_id);
	// 		res.json({ message: "User deleted successfully" });
	// 	} catch (error) {
	// 		res.status(500).json({ error: error.message });
	// 	}
	// }

	async delete(req, res) {
		try {
			const { id } = req.params;

			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			await User.deleteById(id);

			return res.json({ message: "User deleted successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
}

export default new UserController();
