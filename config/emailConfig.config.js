import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";

dotenv.config();

// test email configuration and transport
const nodemailerTestConfig = {
	host: "smtp.ethereal.email",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.TEST_MAIL,
		pass: process.env.TEST_MAIL_PASSWORD,
	},
};

export const transporter = nodemailer.createTransport(nodemailerTestConfig);

// real email configuration and transport
// const nodemailerRealEmailConfig = {
// 	service: "gmail",
// 	// host: "smtp.gmail.com",
// 	// port: 465,
// 	// secure: true,
// 	auth: {
// 		user: process.env.GMAIL_ADDRESS,
// 		pass: process.env.GMAIL_PASSWORD,
// 	},
// };

// google auth
const nodemailerRealEmailConfig = {
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.GMAIL_ADDRESS,
		clientId: process.env.GMAIL_CLIENT_ID,
		clientSecret: process.env.GMAIL_CLIENT_SECRET,
		refreshToken: process.env.GMAIL_REFRESH_TOKEN,
	},
};

export const gmailTransporter = nodemailer.createTransport(
	nodemailerRealEmailConfig
);

// testing nodemailer suucess for test mail
transporter.verify((error, success) => {
	if (error) {
		throw new Error(error);
	} else {
		console.log("success");
		console.log(success);
	}
});

// setting up mailgen
// Configure mailgen by setting a theme and your product info
export const mailGenerator = new Mailgen({
	theme: "default",
	product: {
		// Appears in header & footer of e-mails
		name: "Mailgen",
		link: "https://mailgen.js/",
		// Optional product logo
		// logo: 'https://mailgen.js/img/logo.png'
	},
});
