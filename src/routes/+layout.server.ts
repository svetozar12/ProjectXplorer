import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { firebaseServerInstance } from '$lib/server/firebase';
import { FIREBASE_TOKEN } from '$lib/constants';
export async function load({ cookies, url }: ServerLoadEvent) {
	const { pathname } = url;
	try {
		const token = cookies.get(FIREBASE_TOKEN) || '';
		const decodedToken = await firebaseServerInstance.auth().verifyIdToken(token);
		if (!decodedToken && !pathname.includes('/login')) redirect(303, '/login');
	} catch (error) {
		if (!pathname.includes('/login')) redirect(303, '/login');
	}

	return {};
}
