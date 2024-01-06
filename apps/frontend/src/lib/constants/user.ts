export const USER_MESSAGES = {
	USER_DELETED: 'User successfully deleted.',
	USER_ALREADY_EXIST: 'User already exists.',
	USER_NOT_FOUND: 'User not found.',
	USER_GET_ID_INTERNAL_ERROR: 'Internal error occurred while getting user by id.',
	USER_GET_LIST_INTERNAL_ERROR: 'Internal error occurred while getting user list.',
	USER_CREATE_INTERNAL_ERROR: 'Internal error occurred while creating user.',
	USER_DELETE_INTERNAL_ERROR: 'Internal error occurred while deleting user.',
	USER_UPDATE_INTERNAL_ERROR: 'Internal error occurred while updating user.'
} as const;

export type UserMessageType = (typeof USER_MESSAGES)[keyof typeof USER_MESSAGES];
