// emailService.js

import nodemailer from "nodemailer";

class EmailService {
	static async sendEmail(to, subject, html) {
		const transporter = nodemailer.createTransport({
			host: "your_smtp_host",
			port: 587,
			secure: false,
			auth: {
				user: "your_smtp_username",
				pass: "your_smtp_password",
			},
		});

		await transporter.sendMail({
			from: "your_email_address",
			to,
			subject,
			html,
		});
	}
}

export default EmailService;
