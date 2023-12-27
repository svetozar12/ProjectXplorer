import { env } from '$env/dynamic/public';
import admin from 'firebase-admin';
const firebaseConfig = {
	apiKey: env.PUBLIC_API_KEY,
	authDomain: env.PUBLIC_AUTH_DOMAIN,
	projectId: env.PUBLIC_PROJECT_ID,
	storageBucket: env.PUBLIC_STORAGE_BUCKET,
	messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
	appId: env.PUBLIC_APP_ID,
	measurementId: env.PUBLIC_MEASUREMENT_ID
};

export const firebaseServerInstance = !admin.apps.length
	? admin.initializeApp(firebaseConfig)
	: admin.app();
