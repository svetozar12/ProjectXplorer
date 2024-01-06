import mongoose, { Schema, Document, model, Types, Model } from 'mongoose';

interface Task {
	title: string;
	description?: string;
	dueDate?: Date;
	assignedTo?: Types.ObjectId;
	status?: 'To Do' | 'In Progress' | 'Completed';
}

interface Member {
	user: Types.ObjectId;
	role?: 'Admin' | 'Member';
}

interface File {
	name: string;
	path: string;
	uploadedBy: Types.ObjectId;
	uploadDate?: Date;
}

export interface Project {
	name: string;
	description?: string;
	startDate?: Date;
	endDate?: Date;
	tasks?: Task[];
	members?: Member[];
	files?: File[];
}

export interface ProjectDocument extends Project, Document {}

const projectSchema: Schema<ProjectDocument> = new Schema({
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
			assignedTo: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			status: {
				type: String,
				enum: ['To Do', 'In Progress', 'Completed'],
				default: 'To Do'
			}
		}
	],
	// TODO add with members resource
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
			uploadedBy: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			uploadDate: {
				type: Date,
				default: Date.now
			}
		}
	]
});
export const ProjectModel =
	(mongoose.models.Project as Model<ProjectDocument>) ||
	model<ProjectDocument>('Project', projectSchema);
