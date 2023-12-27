import { dbConnect } from '$lib/server/mongo/mongo';

// Connect to MongoDB before starting the server
dbConnect()
	.then(() => {
		console.log('MongoDB started');
	})
	.catch((e) => {
		console.log('MongoDB failed to start');
		console.log(e);
	});
