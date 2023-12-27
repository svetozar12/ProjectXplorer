import { firebaseConfig } from '$lib/constants';
import admin from 'firebase-admin';

export const firebaseServerInstance =
	admin.apps.length === 0 ? admin.initializeApp(firebaseConfig) : admin.app();
