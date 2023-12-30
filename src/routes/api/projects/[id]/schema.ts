import { idSchema } from '$lib/server/schema';
import { projectSchema } from '../types';

export const getProjectByIdSchema = idSchema.extend({});
export const updateProjectSchema = idSchema.extend({ payload: projectSchema.optional() });
export const deleteProjectSchema = idSchema.extend({});
