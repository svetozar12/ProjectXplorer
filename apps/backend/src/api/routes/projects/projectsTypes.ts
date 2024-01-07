import { mongoIdSchema } from '../../../utils/schema';
import z from 'zod';

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  assignedTo: mongoIdSchema.optional(),
  status: z.enum(['To Do', 'In Progress', 'Completed']).optional(),
});

const memberSchema = z.object({
  user: mongoIdSchema,
  role: z.enum(['Admin', 'Member']).optional(),
});

const FileSchema = z.object({
  name: z.string(),
  path: z.string(),
  uploadedBy: mongoIdSchema,
  uploadDate: z.date().default(() => new Date()),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.date().default(() => new Date()),
  endDate: z.date().optional(),
  tasks: z.array(taskSchema).optional(),
  members: z.array(memberSchema).optional(),
  files: z.array(FileSchema).optional(),
});
