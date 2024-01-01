export const PROJECT_MESSAGES = {
	PROJECT_DELETED: 'Project successfully deleted.',
	PROJECT_ALREADY_EXIST: 'Project already exists.',
	PROJECT_NOT_FOUND: 'Project not found.',
	PROJECT_GET_ID_INTERNAL_ERROR: 'Internal error occurred while getting project by id.',
	PROJECT_CREATE_INTERNAL_ERROR: 'Internal error occurred while creating project.',
	PROJECT_DELETE_INTERNAL_ERROR: 'Internal error occurred while deleting project.',
	PROJECT_UPDATE_INTERNAL_ERROR: 'Internal error occurred while updating project.'
} as const;

export type ProjectMessageType = (typeof PROJECT_MESSAGES)[keyof typeof PROJECT_MESSAGES];
