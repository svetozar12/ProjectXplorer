import mongoose from 'mongoose';
import 'dotenv/config';

export async function dbConnect(): Promise<void> {
	switch (process.env.NODE_ENV) {
		case 'test':
			console.log('Connecting to test mongodb instance...');
			await mongoose.connect(process.env.TEST_MONGO_URL as string);
			break;

		default:
			console.log('Connecting to development or local mongodb instance...');
			await mongoose.connect(process.env.DEVELOPMENT_MONGO_URL as string);
			break;
	}
}

export async function dbDisconnect(): Promise<void> {
	await mongoose.disconnect();
}

export function getDB(): mongoose.Connection {
	return mongoose.connection;
}
