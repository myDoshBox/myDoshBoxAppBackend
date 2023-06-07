// User.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";
import Database from "../config/database.js";

class User {
	static async createUser(name, email, password) {
		const hashedPassword = await bcrypt.hash(password, 10);
		const activationToken = uuidv4();

		const sql =
			"INSERT INTO users (name, email, password, activation_token) VALUES (?, ?, ?, ?)";
		const params = [name, email, hashedPassword, activationToken];

		await Database.executeQuery(sql, params);
	}

	static async getUserByEmail(email) {
		const sql = "SELECT * FROM users WHERE email = ?";
		const params = [email];

		const results = await Database.executeQuery(sql, params);
		return results[0];
	}

	static async verifyEmail(activationToken) {
		const sql =
			"UPDATE users SET activation_token = NULL, is_verified = 1 WHERE activation_token = ?";
		const params = [activationToken];

		await Database.executeQuery(sql, params);
	}

	static async generateResetToken(email) {
		const secretKey = "secret_key";
		const resetToken = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

		const sql = "UPDATE users SET reset_token = ? WHERE email = ?";
		const params = [resetToken, email];

		await Database.executeQuery(sql, params);

		return resetToken;
	}

	static async resetPassword(resetToken, newPassword) {
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		const sql =
			"UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?";
		const params = [hashedPassword, resetToken];

		await Database.executeQuery(sql, params);
	}

	static async verifyPassword(email, password) {
		const sql = "SELECT password FROM users WHERE email = ?";
		const params = [email];

		const results = await Database.executeQuery(sql, params);
		const hashedPassword = results[0].password;

		return await bcrypt.compare(password, hashedPassword);
	}
}

export default User;
