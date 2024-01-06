import { config } from 'dotenv';

config({ path: '../../../.env' });
console.log(process.env, 'hako');
export const firebaseConfig = {
	apiKey: process.env.PUBLIC_API_KEY,
	authDomain: process.env.PUBLIC_AUTH_DOMAIN,
	projectId: process.env.PUBLIC_PROJECT_ID,
	storageBucket: process.env.PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.PUBLIC_APP_ID,
	measurementId: process.env.PUBLIC_MEASUREMENT_ID
};
