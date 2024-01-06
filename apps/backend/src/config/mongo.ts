import mongoose from 'mongoose';
import { env } from './env';

export async function dbConnect(): Promise<void> {
	switch (process.env.NODE_ENV) {
		case 'test':
			console.log('Connecting to test mongodb instance...');
			await mongoose.connect(env.TEST_MONGO_URL);
			break;

		default:
			console.log('Connecting to development mongodb instance...');
			await mongoose.connect(env.DEVELOPMENT_MONGO_URL);
			break;
	}
}

export async function dbDisconnect(): Promise<void> {
	await mongoose.disconnect();
}

export function getDB(): mongoose.Connection {
	return mongoose.connection;
}
