import { DEVELOPMENT_MONGO_URL, TEST_MONGO_URL } from '$env/static/private';
import mongoose from 'mongoose';

export async function dbConnect(): Promise<void> {
	switch (process.env.NODE_ENV) {
		case 'test':
			console.log('Connecting to test mongodb instance...');
			await mongoose.connect(TEST_MONGO_URL);
			break;

		default:
			console.log('Connecting to development or local mongodb instance...');
			await mongoose.connect(DEVELOPMENT_MONGO_URL);
			break;
	}
}

export async function dbDisconnect(): Promise<void> {
	await mongoose.disconnect();
}

export function getDB(): mongoose.Connection {
	return mongoose.connection;
}
