import { firebaseAuth } from "../config/firebase";

export async function verifyToken(token: string) {
	try {
		const decodedToken = await firebaseAuth.verifyIdToken(token);
		return decodedToken;
	} catch (error) {
		return null;
	}
}