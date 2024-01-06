import { dbConnect } from '$lib/server/mongo/mongo';
import { verifyToken } from '$lib/server';
import { type Handle } from '@sveltejs/kit';
import { AUTH_MESSAGES } from '$lib/constants/auth';

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
	try {
		const {
			request: { url, headers }
		} = event;

		if (!url.includes('/api')) return resolve(event);
		const token = headers.get('authorization')?.split(' ')[1] || '';

		const user = await verifyToken(token);
		if (!user) {
			return new Response(AUTH_MESSAGES.UNAUTHORIZED, { status: 401 });
		}

		return resolve(event);
	} catch {
		return new Response(AUTH_MESSAGES.UNAUTHORIZED, { status: 401 });
	}
};
