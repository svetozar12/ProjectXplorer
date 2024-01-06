import 'dotenv/config';
import { dbConnect, dbDisconnect, getDB } from '../src/lib/server/mongo';

// Connect to the MongoDB instance
dbConnect().then(async () => {
	await clearDatabase();
});

// Function to clear the database
const clearDatabase = async () => {
	try {
		// Delete all documents in the ProjectModel collection
		const db = getDB();
		await db.dropDatabase();
		console.log('Database cleared successfully for ' + process.env.NODE_ENV);
	} catch (error) {
		console.error('Error clearing the database:', error);
	} finally {
		// Disconnect from MongoDB
		await dbDisconnect();
	}
};
