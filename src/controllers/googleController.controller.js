import { Request, Response } from "express";
import passport from "passport";

class GoogleAuthController {
	// Redirect the user to the Google OAuth2 login page
	redirectToGoogle(req, res) {
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})(req, res);
	}

	// Handle the Google OAuth2 callback after successful authentication
	handleGoogleCallback(req, res) {
		passport.authenticate("google", { session: false }, (err, user) => {
			if (err || !user) {
				res.redirect("/login");
				return;
			}

			// Generate JWT token
			const token = jwt.sign({ user }, config.secretKey, { expiresIn: "1h" });

			// Redirect the user to the frontend with the JWT token
			res.redirect(`http://localhost:3000/login-success?token=${token}`);
		})(req, res);
	}
}

export const GoogleAuthCtrl = new GoogleAuthController();

//   async googleLogin(req: Request, res: Response): Promise<void> {
//     try {
//       const { token } = req.body;
//       const userId = await verifyGoogleToken(token);

//       if (!userId) {
//         res.status(400).json({ error: 'Invalid token' });
//         return;
//       }

//       // Check if the user already exists in your database
//       const user = await this.userModel.findUserByUsername(userId);

//       if (!user) {
//         // If the user doesn't exist, you can create a new user or handle it as per your application's requirements
//         // For simplicity, we'll return an error in this example
//         res.status(400).json({ error: 'User not found' });
//         return;
//       }

//       const token = generateToken({ id: user.id, username: user.username });
//       res.json({ token });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
