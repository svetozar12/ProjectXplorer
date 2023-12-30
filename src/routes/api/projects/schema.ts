import { paginationSchema } from '$lib/server/schema';
import { projectSchema } from './types';

export const getProjectListSchema = paginationSchema.extend({});
export const createProjectSchema = projectSchema.extend({});
