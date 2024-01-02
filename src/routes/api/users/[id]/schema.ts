import { idSchema } from '$lib/server/schema';
import { userSchema } from '../types';

export const getUserByIdSchema = idSchema.extend({});
export const updateUserSchema = idSchema.merge(userSchema.partial());
export const deleteUserSchema = idSchema.extend({});
