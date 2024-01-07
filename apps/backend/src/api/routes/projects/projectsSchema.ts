import { idSchema } from '../../../utils/schema';
import { projectSchema } from './projectsTypes';

export const createProjectSchema = projectSchema.extend({});
export const getProjectByIdSchema = idSchema.extend({});
export const updateProjectSchema = idSchema.merge(projectSchema.partial());
export const deleteProjectSchema = idSchema.extend({});
