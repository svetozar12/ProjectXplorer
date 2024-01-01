import { getDB, dbConnect } from '../src/lib/server/mongo';

async function globalTeardown() {
	try {
		if (process.env.NODE_ENV !== 'test') {
			await dbConnect();
			const db = await getDB();
			console.log(db);
			await db.dropDatabase();
		}
		console.log('db cleanup');
	} catch (error) {
		console.log(`Error in globalTeardown: ${error}`);
	}
}

export default globalTeardown;
