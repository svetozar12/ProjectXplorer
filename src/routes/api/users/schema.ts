import { paginationSchema } from '$lib/server/schema';
import { userSchema } from './types';

export const getUserListSchema = paginationSchema.extend({});
export const createUserSchema = userSchema.extend({});
