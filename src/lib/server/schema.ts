import z from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idSchema = z.object({ id: z.string() });
export const paginationSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(50).default(10)
});
export const mongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
