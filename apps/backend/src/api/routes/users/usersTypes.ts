import { z } from 'zod';

export const userSchema = z.object({ uId: z.string() });
