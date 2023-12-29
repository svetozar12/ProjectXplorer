import { idSchema } from '$lib/server/schema';
import { ProjectSchema } from '../schema';

export const getProjectByIdSchema = idSchema.extend({});
export const updateProjectSchema = idSchema.extend({ payload: ProjectSchema.optional() });
export const deleteProjectSchema = idSchema.extend({});
