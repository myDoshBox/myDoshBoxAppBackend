import {
  gmailTransporter,
  mailGenerator,
  transporter,
} from "../config/emailConfig.config.js";
import nodemailer from "nodemailer";
import { v4 as uuid4 } from "uuid";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserVerificationModel from "../models/IndividualUserModels/UserVerificationModel.IndividualUserModels.js";

dotenv.config();

/** POST: http://localhost:5000/auth/registermail
 * @param: {
 * "user_email": "kor@gmail.com",
 * "text": "1234"
 * "subject": "1234"
 * }
 */
export const registerMail = async (req, res) => {
  const { user_email, text, subject } = req.body;

  // // for mailgen
  // let email = {
  // 	body: {
  // 		name: user_email,
  // 		intro:
  // 			text || "Welcome to DoshBox! We're very excited to have you on board.",
  // 		// action: {
  // 		// 	instructions: "To get started with Mailgen, please click here:",
  // 		// 	button: {
  // 		// 		color: "#22BC66", // Optional action button color
  // 		// 		text: "Confirm your account",
  // 		// 		link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
  // 		// 	},
  // 		// },
  // 		outro:
  // 			"Need help, or have questions? Just reply to this email, we'd love to help.",
  // 	},
  // };

  // // Generate an HTML email with the provided contents
  // let emailBody = mailGenerator.generate(email);

  // // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  // let emailText = mailGenerator.generatePlaintext(email);

  let message = {
    from: process.env.TEST_MAIL,
    to: user_email,
    subject: subject || "Sign Up Successfully",
    text: "successful",
    // html: emailBody,
    html: `<h2>Welcome to DoshBox! We're very excited to have you on board.</h2>`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({
        msg: "Thank you for Signing Up, you will Receive an Email from Us Shortly",
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  // gmailTransporter
  // 	.sendMail(message)
  // 	.then((info) => {
  // 		return res.status(200).send({
  // 			msg: "Thank you for Signing Up, you will Receive an Email from Us Shortly",
  // 			info: info.messageId,
  // 			preview: nodemailer.getTestMessageUrl(info),
  // 		});
  // 	})
  // 	.catch((err) => {
  // 		throw new Error(err);
  // 	});

  // receiving the error below when sending mail using google mail:
  // 	Error: Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
  // 535 5.7.8  https://support.google.com/mail/?p=BadCredentials i17-20020a5d55d1000000b003143be36d99sm12979372wrw.58 - gsmtp
};

export const sendVerificationMail = async ({ _id, user_email }, res) => {
  // url to be used in the email
  const currentUrl = "http://localhost:5000/";

  const uniqueString = uuid4() + _id;

  const mailOptions = {
    from: process.env.TEST_MAIL,
    to: user_email,
    subject: "Please verify your email",
    html: `<h3>Please click on the link to verify your mail to login into your account.</h3> <p>this link expires in 2hours</p> </br> <p>Press<a href=${
      currentUrl + "auth/verifymail/" + _id + "/" + uniqueString
    }>here</a> to proceed </p>`,
  };

  // hash the unique uniqueString
  const saltRounds = 10;

  try {
    let hashedString = await bcrypt.hash(uniqueString, saltRounds);

    if (hashedString) {
      // set values in userVerification collection
      // const newVerification = new UserVerificationModel({
      // 	user_id: _id,
      // 	unique_string: hashedString,
      // 	createdAt: Date.now(),
      // 	expiresAt: Date.now() + 7200000,
      // });

      const newVerificationObj = {
        user_id: _id,
        unique_string: hashedString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 7200000,
        // verified: false
      };

      // console.log(userObj);

      // create and store new user
      const verify = await UserModel.create(newVerificationObj);

      if (verify) {
        transporter
          .sendMail(mailOptions)
          .then(() => {
            return res.status(200).send({
              msg: "Email Verification Sent.",
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

// export const sendMail = async (req, res) => {
export const sendMail = async (user_email, url) => {
  // const { user_email, subject, url } = req.body;
  // console.log(req.body);

  let message = {
    from: process.env.TEST_MAIL,
    to: user_email,
    // subject: subject || "Sign Up Successfully",
    subject: "Please verify your email",
    // text: "successful",
    // html: emailBody,
    html: `<h2>Welcome to DoshBox! We're very excited to have you on board.</h2>
		 <p>Please click on the link below to verify your mail</p>
		 <a href=${url}>Verify Mail</a>
		`,
  };

  console.log(message);

  transporter
    .sendMail(message)
    .then((res) => {
      return res.response;
      // console.log(res.response);
      // return res.status(200).send({
      // 	msg: "Thank you for Signing Up, you will Receive an Email from Us Shortly",
      // });
      // console.log(
      // 	`Thank you for Signing Up, you will Receive an Email from Us Shortly`
      // );
    })
    .catch((err) => {
      throw new Error(err);
    });
};
