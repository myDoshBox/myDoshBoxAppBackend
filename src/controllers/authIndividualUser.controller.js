// authController.js

import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/individualUsers.models.js";
import EmailService from "../services/email.service.js";

class AuthController {
	static async register(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { name, email, password } = req.body;
			await User.createUser(name, email, password);

			const activationToken = await User.generateActivationToken(email);
			const activationLink = `http://your_domain/verify/${activationToken}`;

			await EmailService.sendEmail(
				email,
				"Account Activation",
				`Click <a href="${activationLink}">here</a> to activate your account.`
			);

			res.status(201).json({
				message:
					"User created. Please check your email to activate your account.",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async verifyEmail(req, res) {
		try {
			const { token } = req.params;
			await User.verifyEmail(token);

			res.status(200).json({ message: "Email verified. You can now login." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async forgotPassword(req, res) {
		try {
			const { email } = req.body;

			const resetToken = await User.generateResetToken(email);
			const resetLink = `http://your_domain/reset/${resetToken}`;

			await EmailService.sendEmail(
				email,
				"Password Reset",
				`Click <a href="${resetLink}">here</a> to reset your password.`
			);

			res
				.status(200)
				.json({ message: "Password reset instructions sent to your email." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async resetPassword(req, res) {
		try {
			const { token, newPassword } = req.body;

			await User.resetPassword(token, newPassword);

			res.status(200).json({
				message:
					"Password reset successfully. You can now login with your new password.",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async login(req, res) {
		try {
			const { email, password } = req.body;

			const isValidPassword = await User.verifyPassword(email, password);
			if (!isValidPassword) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const secret_key = "jwtSecret";
			const token = jwt.sign({ email }, secret_key, { expiresIn: "1h" });

			res.status(200).json({ token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	static async logout(req, res) {
		try {
			// Clear session
			req.session.destroy((err) => {
				if (err) {
					console.error(err);
					res.status(500).json({ message: "Failed to clear session" });
				} else {
					// Revoke tokens (if applicable)
					const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

					if (token) {
						// Add the token to the blacklist
						revokedTokens.push(token);
					}

					res.status(200).json({ message: "Logged out successfully" });
				}
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

export default AuthController;
