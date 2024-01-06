import { ProjectModel, type Project } from '../src/lib/server/mongo/models';
import mongoose from 'mongoose';
import { dbConnect, dbDisconnect } from '../src/lib/server/mongo';
import 'dotenv/config';

dbConnect().then(async () => {
	// Run the seeding function
	await seedDatabase();
});

// Define sample data
const projectsData: Project[] = [];
for (let index = 0; index < 15; index++) {
	projectsData.push({
		name: `Project ${index}`,
		description: 'Description for Project One',
		startDate: new Date('2023-01-01'),
		endDate: new Date('2023-02-01'),
		tasks: [
			{
				title: 'Task 1',
				description: 'Description for Task 1',
				dueDate: new Date('2023-01-15'),
				status: 'To Do'
			}
		],
		members: [
			{
				user: new mongoose.Types.ObjectId(),
				role: 'Admin'
			}
		],
		files: [
			{
				name: 'File 1',
				path: '/path/to/file1',
				uploadedBy: new mongoose.Types.ObjectId(),
				uploadDate: new Date()
			}
		]
	});
}

// Function to seed the database
const seedDatabase = async () => {
	try {
		// Clear existing data (optional)
		await ProjectModel.deleteMany({});

		// Insert sample data
		await ProjectModel.insertMany(projectsData);

		console.log('Seeding completed successfully for ' + process.env.NODE_ENV);
	} catch (error) {
		console.error('Error seeding database:', error);
	} finally {
		// Disconnect from MongoDB
		await dbDisconnect();
	}
};
