import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { HttpStatus } from '../constants/httpStatuses';

export function handleZodError(error: unknown): Response | undefined {
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((err) => {
      const field = err.path.join('.');
      const message = err.message || 'Invalid input';
      return `${field}: ${message}`;
    });

    return json(
      { validationErrors },
      {
        status: HttpStatus.BAD_REQUEST,
      }
    );
  }
}
