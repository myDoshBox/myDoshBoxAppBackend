import UserModel from "../models/IndividualUserModels/IndividualUserModel.model.js";
import UserVerificationModel from "../models/IndividualUserModels/UserVerificationModel.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import { v4 as uuid4 } from "uuid";
import crypto from "crypto";
import { sendMail } from "../services/userMailer.js";

dotenv.config();

/** POST: http://localhost:5000/auth/register
 * @param: {
 * "user_email": "kor@gmail.com",
 * "user_phone_num": "1232455",
 * "user_password": "1234",
 * }
 */
export const register = async (req, res) => {
	let { user_email, user_phone_num, user_password } = req.body;

	// user_email = user_email.trim();
	// user_phone_num = user_phone_num.trim();
	// user_password = user_password.trim();

	// console.log(1, req.body);

	try {
		// confirm data
		// if (user_email === " " && user_phone_num === " " && user_password === " ") {
		// 	return res.status(400).json({ message: "all fields are required" });
		// } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user_email)) {
		// 	return res.status(400).json({ message: "incorrect email format" });
		// }

		// check if the user exists using their mail
		const duplicateMail = await UserModel.findOne({ user_email }).lean().exec();

		if (duplicateMail) {
			return res.status(409).json({ message: "Your mail must be unique" });
		}

		// console.log(2, duplicateMail);

		// check if the user phone number exists
		const duplicatePhoneNum = await UserModel.findOne({ user_phone_num })
			.lean()
			.exec();

		if (duplicatePhoneNum) {
			return res
				.status(409)
				.json({ message: "Your phone number must be unique" });
		}

		// console.log(3, duplicatePhoneNum);

		// hash password
		const hashedPass = await bcrypt.hash(user_password, 10);

		const userObj = {
			user_email,
			user_phone_num,
			user_password: hashedPass,
			// verified: false
		};

		// console.log(4, userObj);

		// create and store new user
		const user = await UserModel.create(userObj);

		// console.log(5, user);

		let tokenObj = {
			user_id: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		};

		// console.log(6, tokenObj);

		let token = await UserVerificationModel.create(tokenObj);

		// console.log(7, token);

		const url = `${process.env.BASE_URL}auth/${user._id}/verifymail/${token.token}`;
		// const url = `http://localhost:5000/auth/${user._id}/verifymail/${token.token}`;

		console.log(8, url);

		// await sendMail(user.user_email, "Verify Mail", url);
		await sendMail(user.user_email, "Verify Mail", url);

		res.status(201).json({
			message:
				"An email has been sent to your mail box, please verify your account",
		});

		// if (user) {
		// 	// handle verification
		// 	sendVerificationMail(user, res);

		// res.status(201).json({
		// 	message: `New UserModel ${user.user_email} Created Successfully`,
		// });
		// } else {
		// 	res.status(400).json({ message: "invalid user data received" });
		// }
	} catch (error) {
		throw new Error(error);
		// return res.status(500).send(error)
	}
};

export const verifyEmail = async (req, res) => {
	try {
		let user = await UserModel.findOne({ _id: req.params.id });

		if (!user) return res.status(400).send({ message: "invalid link" });

		const token = await UserVerificationModel.findOne({
			user_id: user._id,
			token: req.params.token,
		});

		if (!token) return res.status(400).send({ message: "invalid link" });

		await UserModel.updateOne({ _id: user._id, verified: true });

		await token.remove();
		// await token.deleteOne();

		res.status(200).send({ message: "Email Verified Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "internal server error" });
	}
};

// export const verifyEmail = (req, res) => {
// 	let { user_id, unique_string } = req.params;

// 	let isUserExists = UserVerificationModel.findOne({ user_id });

// 	try {
// 		if (isUserExists) {
// 			// means the user exists, so we proceed

// 		} else {
// 			let message = "user does not exist";
// 			res.redirect(
// 				`redirect users to register page or error message page=${message}`
// 			);
// 		}
// 	} catch (error) {
// 		// throw new Error(error)
// 		console.log(error);
// 		res.redirect("redirect users to register page or error message page");
// 	}
// };

/** POST: http://localhost:5000/auth/login
 * @param: {
 * "user_email": "kor@gmail.com",
 * "user_password": "1234"
 * }
 */
export const login = async (req, res) => {
	let { user_email, user_password } = req.body;
	user_email = user_email.trim();
	user_password = user_password.trim();

	// console.log(req.body);

	try {
		// check data
		if (user_email === "" && user_password === "") {
			return res.status(400).json({ message: "All fields are required" });
		}

		// console.log(req.body);

		// check if the user exists
		const findUser = await UserModel.findOne({ user_email }).exec();
		// console.log(findUser);

		if (!findUser) {
			return res
				.status(401)
				.json({ message: "user does not exist, please sign up" });
		}

		// compare user password against the hash
		const passwordMatch = await bcrypt.compare(
			user_password,
			findUser.user_password
		);

		if (!passwordMatch)
			return res
				.status(401)
				.json({ message: "Unauthorized, password does not match" });

		// if the user hasn't been verified but trying to login
		// if (!findUser.verified) {
		// 	let token = await UserVerificationModel.findOne({
		// 		user_id: findUser._id,
		// 	});

		// 	if (!token) {
		// 		let tokenObj = {
		// 			user_id: user._id,
		// 			token: crypto.randomBytes(32).toString("hex"),
		// 		};

		// 		let token = await UserVerificationModel.create(tokenObj);

		// 		const url = `${process.env.BASE_URL}auth/${user._id}/verify/${token.token}`;

		// 		await sendMail(user.user_email, "Verify Mail", url);
		// 	}

		// 	return res.status(400).send({
		// 		message: "An email has been sent to your account, please verify",
		// 	});
		// }

		// create jwt token
		const accessToken = jwt.sign(
			{
				userId: findUser._id,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1h" }
		);

		// const refreshToken = jwt.sign(
		// 	{ userId: findUser._id },
		// 	process.env.REFRESH_TOKEN_SECRET,
		// 	{ expiresIn: "1d" }
		// );

		// console.log("Generated token\n", accessToken);

		// console.log(refreshToken);
		// Create secure cookie with refresh token
		res.cookie("jwt", accessToken, {
			httpOnly: true, //accessible only by web server
			secure: true, //https
			sameSite: "None", //cross-site cookie
			maxAge: 7 * 24 * 60 * 60, //cookie expiry: set to match rT
		});

		// res.cookie(String(findUser._id), refreshToken, {
		// 	path: "/",
		// 	expires: new Date(Date.now() * 1000 * 30),
		// 	httpOnly: true, // accessible only by web server
		// 	sameSite: "None", // cross-site cookie
		// });

		// send accessToken containing username and roles
		// res.json({ accessToken });
		return res.status(200).send({
			message: "Login successful",
			accessToken,
		});
	} catch (error) {
		throw new Error(error);
	}
};

/** GET: http://localhost:5000/auth/refresh */
export const refresh = async (req, res, next) => {
	// const cookies = req.cookies;
	// const cookies = req.headers.cookie;
	// console.log(cookies);

	const authHeader = req.headers.authorization || req.headers.Authorization;
	// console.log(authHeader);

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const prevToken = authHeader.split(" ")[1];

	if (!prevToken) {
		return res.status(400).json({ msg: "couldn't find token" });
	}

	jwt.verify(
		prevToken,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) {
				console.log(err);
				return res.status(403).json({ msg: "Authorization Failed" });
			}

			// console.log(decoded);

			res.clearCookie(`${decoded.userId}`);
			req.cookies[`${decoded.userId}`] = "";

			// create new token
			const accessToken = jwt.sign(
				{
					userId: decoded.userId,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1h" }
			);

			// refresh token
			// const refreshToken = jwt.sign(
			// 	{ userId: decoded.userId },
			// 	process.env.REFRESH_TOKEN_SECRET,
			// 	{ expiresIn: "1d" }
			// );

			// Recreate secure cookie with refresh token
			res.cookie("jwt", accessToken, {
				httpOnly: true, //accessible only by web server
				secure: true, //https
				sameSite: "None", //cross-site cookie
				maxAge: 7 * 24 * 60 * 60, //cookie expiry: set to match rT
			});

			// console.log("Regenerated token\n", accessToken);

			req.id = decoded.userId;

			let response = res.status(200).send({
				message: "refresh token gotten",
				// user_email: findUser.user_email,
				accessToken,
			});

			// console.log(response);

			next();
		}
	);
};

/** GET: http://localhost:5000/auth/generateOTP */
export const generateOTP = async (req, res) => {
	req.app.locals.OTP = await otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});

	res.status(201).send({ code: req.app.locals.OTP });
};

/** GET: http://localhost:5000/auth/verifyOTP */
export const verifyOTP = async (req, res) => {
	const { code } = req.query;

	if (parseInt(req.app.locals.OTP) === parseInt(code)) {
		req.app.locals.OTP = null; // reset the OTP value
		req.app.locals.resetSession = true; // start session for reset password

		return res.status(201).send({ msg: "OTP Verified Successfully" });
	}

	res.status(400).send({ msg: "Invalid OTP" });
};

// successfully redirect user when OTP is valid
/** GET: http://localhost:5000/auth/createresetsession */
export const createResetSession = async (req, res) => {
	if (req.app.locals.resetSession) {
		req.app.locals.resetSession = false; // allow access to this route only once
		return res.status(201).send({ msg: "access granted" });
	}

	return res.status(440).send({ error: "Session Expired" });
};

// update the password when we have valid session
/** PUT: http://localhost:5000/auth/createresetsession */
export const resetPassword = async (req, res) => {
	try {
		// we have to first check if there is a valid session
		if (!req.app.locals.resetSession) {
			return res.status(440).send({ error: "Session Expired" });
		}

		const { user_email, user_password } = req.body;

		// confirm data
		if (user_email === "" && user_password === "") {
			return res.status(400).json({ message: "all fields are required" });
		}

		// check if the user exists
		const findUser = await UserModel.findOne({ user_email }).exec();

		if (!findUser) {
			return res
				.status(401)
				.json({ message: "user does not exist, please sign up" });
		}

		const hashedPass = await bcrypt.hash(user_password, 10);

		const userObj = {
			user_email,
			user_password: hashedPass,
		};

		// console.log(userObj);

		// update and store new password
		const user = await UserModel.updateOne(
			{ email: userObj.user_email },
			{ password: userObj.user_password }
		);

		if (user) {
			req.app.locals.resetSession = false; // reset session
			res.status(201).json({
				message: `Password for ${user_email} has been Successfully Reset`,
			});
		} else {
			res.status(400).json({ message: "invalid user data received" });
		}
	} catch (error) {
		throw new Error(error);
	}
};

// update the password when we have valid session
/** POST: http://localhost:5000/auth/logout */
export const logout = async (req, res) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	// console.log(authHeader);

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const prevToken = authHeader.split(" ")[1];

	if (!prevToken) {
		return res.status(400).json({ msg: "couldn't find token" });
	}

	jwt.verify(
		prevToken,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) {
				console.log(err);
				return res.status(403).json({ msg: "Authorization Failed" });
			}

			res.clearCookie(`${decoded.userId}`);
			req.cookies[`${decoded.userId}`] = "";

			// console.log(decoded.userId);

			return res.status(200).send({
				message: "logged out successfully",
			});
		}
	);
};
