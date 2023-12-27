import { MONGO_URL } from '$env/static/private';
import mongoose from 'mongoose';

export async function dbConnect(): Promise<void> {
	await mongoose.connect(MONGO_URL);
}

export async function dbDisconnect(): Promise<void> {
	await mongoose.disconnect();
}

export function getDB(): mongoose.Connection {
	return mongoose.connection;
}
