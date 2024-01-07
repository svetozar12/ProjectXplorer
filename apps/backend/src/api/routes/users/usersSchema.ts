import { idSchema } from '../../../utils/schema';
import { userSchema } from './usersTypes';

export const getUserByIdSchema = idSchema.extend({});
export const deleteUserSchema = idSchema.extend({});
export const createUserSchema = userSchema.extend({});
