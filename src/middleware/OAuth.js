import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client("your_client_id");

export async function verifyGoogleToken(token) {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: "your_client_id",
		});
		const payload = ticket.getPayload();
		const userId = payload?.sub || null;
		return userId;
	} catch {
		return null;
	}
}
