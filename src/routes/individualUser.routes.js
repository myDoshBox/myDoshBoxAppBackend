import express from "express";
import { body, param } from "express-validator";
import { protect } from "../middleware/jwt";
import UserController from "../controllers/individualUser.controller";

const router = express.Router();

router.patch(
	"/:id",
	protect,
	[
		param("id").notEmpty().withMessage("User ID is required"),
		body("name").optional().notEmpty().withMessage("Name is required"),
		body("email").optional().isEmail().withMessage("Invalid email"),
		body("password").optional().notEmpty().withMessage("Password is required"),
	],
	UserController.updateUser
);

router.delete(
	"/:id",
	protect,
	[param("id").notEmpty().withMessage("User ID is required")],
	UserController.deleteUser
);

export default router;
