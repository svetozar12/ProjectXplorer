import { env } from '@svetozar12/api/env';
import admin from 'firebase-admin';
// firebase-admin-credentials.json
const serviceAccount = require('../../firebase-admin-credentials.json');

export const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
  credential: admin.credential.cert(serviceAccount),
};

const firebase =
  admin.apps.length === 0 ? admin.initializeApp(firebaseConfig) : admin.app();

export const firebaseAuth = firebase.auth();
