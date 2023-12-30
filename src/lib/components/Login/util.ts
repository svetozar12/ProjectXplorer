import { goto } from '$app/navigation';
import { FIREBASE_TOKEN } from '$lib/constants';
import { firebaseAuth } from '$lib/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

export const signInWithGithub = async () => {
	const provider = new GithubAuthProvider();
	try {
		const { user } = await signInWithPopup(firebaseAuth, provider);

		const cookies = new Cookies(null, { path: '/' });
		const token = await user.getIdToken();
		cookies.set(FIREBASE_TOKEN, token);
		goto('/');
	} catch (error) {
		// handling some crazy error
	}
};
