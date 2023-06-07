// routes.js
import express from "express";
import { check } from "express-validator";
import AuthController from "../controllers/authIndividualUser.controller.js";

const router = express.Router();

router.post(
	"/register",
	[
		check("name").notEmpty().withMessage("Name is required"),
		check("email").isEmail().withMessage("Invalid email"),
		check("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	AuthController.register
);

router.get("/verify/:token", AuthController.verifyEmail);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

export default router;
