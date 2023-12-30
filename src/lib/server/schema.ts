import z from 'zod';

export const idSchema = z.object({ id: z.string() });
export const paginationSchema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10)
});
export const mongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
