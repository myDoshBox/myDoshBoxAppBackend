import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = "your_secret_key";

export function generateToken(payload) {
	return jwt.sign({ payload }, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token) {
	try {
		return jwt.verify(token, secretKey);
	} catch {
		return null;
	}
}

// authMiddleware.js
export function protect(req, res, next) {
	// const token = req.headers.authorization;
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, "jwt_secret");
		req.user = decoded; // Attach user information to the request object
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Unauthorized" });
	}
}

export function authenticate(req, res, next) {
	if (!req.session.userId) {
		return res.status(401).json({ error: "unauthorized" });
	}

	next();
}

export function authorize(roles) {
	return function (req, res, next) {
		if (!roles.includes(req.session.role)) {
			return res.status(403).json({ error: "Forbidden" });
		}
	};
}
