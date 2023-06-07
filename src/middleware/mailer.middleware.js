import nodemailer from "nodemailer";
import transporter from "../config/mailer.config.js";

class Mailer {
	async sendVerificationEmail(email, verificationLink) {
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Email Verification Link",
			html: `<a href=${verificationLink}>Click Here</a> to verify your email`,
		};

		await transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				// console.log(error);
				throw new Error(error);
			} else {
				console.log("mail sent", info.response);
			}
		});
	}

	async sendForgotPassword(email, resetLink) {
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Password Rest Link",
			html: `<a href=${resetLink}>Click Here</a> to verify your email`,
		};

		await transporter.sendMail(mailOptions);
	}
}

export default new Mailer();
