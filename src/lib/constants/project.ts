// 2xx
export const ProjectCreated = { status: 201, message: 'Project successfully created.' };
export const ProjectDeleted = { status: 201, message: 'Project successfully deleted.' };
// 4xx
export const ProjectAlreadyExist = { status: 409, message: 'Project already exists.' };
export const ProjectNotFound = { status: 404, message: 'Project not found.' };
// 5xx
export const ProjectGetIdInternalError = {
	status: 501,
	message: 'Internal error occured while getting project by id.'
};
export const ProjectCreateInternalError = {
	status: 501,
	message: 'Internal error occurred while creating project.'
};
export const ProjectDeleteInternalError = {
	status: 501,
	message: 'Internal error occurred while deleting project.'
};
export const ProjectUpdateInternalError = {
	status: 501,
	message: 'Internal error occurred while updating project.'
};
