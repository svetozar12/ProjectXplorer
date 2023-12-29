import { z } from 'zod';

const mongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);

const TaskSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	dueDate: z.date().optional(),
	assignedTo: mongoIdSchema.optional(),
	status: z.enum(['To Do', 'In Progress', 'Completed']).optional()
});

const MemberSchema = z.object({
	user: mongoIdSchema,
	role: z.enum(['Admin', 'Member']).optional()
});

const FileSchema = z.object({
	name: z.string(),
	path: z.string(),
	uploadedBy: mongoIdSchema,
	uploadDate: z.date().default(() => new Date())
});

export const ProjectSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	startDate: z.date().default(() => new Date()),
	endDate: z.date().optional(),
	tasks: z.array(TaskSchema).optional(),
	members: z.array(MemberSchema).optional(),
	files: z.array(FileSchema).optional()
});

export type Task = z.infer<typeof TaskSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type File = z.infer<typeof FileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
