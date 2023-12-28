import type { User } from 'firebase/auth';
import mongoose, { Schema, Document, model, Types } from 'mongoose';

interface Task {
	title: string;
	description?: string;
	dueDate?: Date;
	assignedTo?: Types.ObjectId | User;
	status?: 'To Do' | 'In Progress' | 'Completed';
}

interface Member {
	user: Types.ObjectId | User;
	role?: 'Admin' | 'Member';
}

interface File {
	name: string;
	path: string;
	uploadedBy: Types.ObjectId | User;
	uploadDate?: Date;
}

interface Project extends Document {
	name: string;
	description?: string;
	startDate?: Date;
	endDate?: Date;
	tasks?: Task[];
	members?: Member[];
	files?: File[];
}

const projectSchema: Schema<Project> = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: String,
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: Date,
	tasks: [
		{
			title: {
				type: String,
				required: true
			},
			description: String,
			dueDate: Date,
			// TODO: add with user resource
			// assignedTo: {
			// 	type: Schema.Types.ObjectId,
			// 	ref: 'User'
			// },
			status: {
				type: String,
				enum: ['To Do', 'In Progress', 'Completed'],
				default: 'To Do'
			}
		}
	],
	// TODO: add with user resource
	// members: [
	// 	{
	// 		user: {
	// 			type: Schema.Types.ObjectId,
	// 			ref: 'User'
	// 		},
	// 		role: {
	// 			type: String,
	// 			enum: ['Admin', 'Member'],
	// 			default: 'Member'
	// 		}
	// 	}
	// ],
	files: [
		{
			name: String,
			path: String,
			// TODO: add with user resource
			// uploadedBy: {
			// 	type: Schema.Types.ObjectId,
			// 	ref: 'User'
			// },
			uploadDate: {
				type: Date,
				default: Date.now
			}
		}
	]
});

export const ProjectModel = mongoose.models.Project || model<Project>('Project', projectSchema);
