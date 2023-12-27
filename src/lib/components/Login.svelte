<script>
	import { firebaseInstance } from '$lib/firebase';
	import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import Cookies from 'universal-cookie';
	import { FIREBASE_TOKEN } from '$lib/constants';
	const auth = getAuth(firebaseInstance);

	const signInWithGithub = async () => {
		const provider = new GithubAuthProvider();
		try {
			const { user } = await signInWithPopup(auth, provider);
			const cookies = new Cookies(null, { path: '/' });
			const token = await user.getIdToken();
			cookies.set(FIREBASE_TOKEN, token);
			goto('/');
		} catch {
			// handling some crazy error
		}
	};
</script>

<main>
	<h1>Login with Github</h1>
	<button on:click={signInWithGithub}>Sign in with Github</button>
</main>

<style>
	main {
		text-align: center;
		margin: 2rem;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
