import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { firebaseServerInstance } from '$lib/server';
import { FIREBASE_TOKEN } from '$lib/constants';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '$lib/firebase';

export async function authGuard({ url, cookies }: ServerLoadEvent) {
	const { pathname } = url;
	try {
		const token = cookies.get(FIREBASE_TOKEN) || '';
		const decodedToken = await firebaseServerInstance.auth().verifyIdToken(token);
		if (!decodedToken && !pathname.includes('/login')) redirect(303, '/login');
	} catch (error) {
		await signOut(firebaseAuth);
		if (!pathname.includes('/login')) redirect(303, '/login');
	}
}

export async function verifyToken(token: string) {
	try {
		const decodedToken = await firebaseServerInstance.auth().verifyIdToken(token);
		return decodedToken;
	} catch (error) {
		console.error('Error verifying token:', error);
		return null;
	}
}
