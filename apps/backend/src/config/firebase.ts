import admin from 'firebase-admin';
import { env } from './env';


export const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORAGE_BUCKET,
	messagingSenderId: env.MESSAGING_SENDER_ID,
	appId: env.APP_ID,
	measurementId: env.MEASUREMENT_ID
};

const firebase =
	admin.apps.length === 0 ? admin.initializeApp(firebaseConfig) : admin.app();

    export const firebaseAuth = firebase.auth()