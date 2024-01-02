export const AUTH_MESSAGES = {
	UNAUTHORIZED: 'Unauthorized.'
} as const;

export type AuthMessageType = (typeof AUTH_MESSAGES)[keyof typeof AUTH_MESSAGES];
