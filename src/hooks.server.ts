import { dbConnect } from '$lib/server/mongo/mongo';
import { verifyToken } from '$lib/server';
import type { Handle, HandleServerError } from '@sveltejs/kit';

// Connect to MongoDB before starting the server
dbConnect()
	.then(() => {
		console.log('MongoDB started');
	})
	.catch((e) => {
		console.log('MongoDB failed to start');
		console.log(e);
	});
export const handle: Handle = async ({ event, resolve }) => {
	if (!event.request.url.includes('/api')) return resolve(event);
	const token = event.request.headers.get('authorization')?.split(' ')[1];

	if (!token) {
		throw new Error('Unauthorized');
	}

	const user = await verifyToken(token);
	if (!user) {
		throw new Error('Unauthorized');
	}

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error }) => {
	if (error instanceof Error && error.message === 'Unauthorized') {
		return {
			status: 401,
			body: 'Unauthorized access'
		};
	}

	// Handle other errors or rethrow them
	throw error;
};
