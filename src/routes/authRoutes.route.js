import { Router } from "express";
import * as controller from "../controllers/authController.controller.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getUser } from "../controllers/userControllers.controller.js";
// const loginLimiter = require("../middleware/loginLimiter");
import { localVariables } from "../middleware/localVariables.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { registerMail, sendVerificationMail } from "../services/userMailer.js";

const router = Router();

// router.route("/").post();

// user registration routes
router.route("/register").post(controller.register);
router.route("/registermail").post(registerMail); // send mail
// router.route("/verifymail/:user_id/:uniqueString").get(sendVerificationMail); // send mail
router.route("/:user_id/verifymail/:token").get(controller.verifyEmail); // send mail
router
	.route("/generateotp")
	.get(verifyUser, localVariables, controller.generateOTP); // generate random otp
router.route("/verifyotp").get(controller.verifyOTP);
router.route("/authenticate").post(verifyUser, (req, res) => res.end()); // authenticate user
router.route("/createresetsession").get(controller.createResetSession);

// login and logout routes
// router.route("/login").post(loginLimiter, controller.login); // login
router.route("/login").post(verifyUser, controller.login); // login
// router.get("/refresh").get(controller.refresh, verifyJWT, getUser); // getuser not working
router.route("/refresh").get(controller.refresh, verifyJWT);
router.route("/logout").post(verifyJWT, controller.logout);
router.route("/resetpassword").put(verifyUser, controller.resetPassword);

export default router;
