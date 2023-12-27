import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '$lib/constants';

export const firebaseInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseInstance);
