import { ProjectModel } from '$lib/server/mongo';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { PROJECT_MESSAGES } from '$lib/constants/project';
import { HttpStatus } from '$lib/server/httpStatuses';
import { deleteProjectSchema, getProjectByIdSchema, updateProjectSchema } from './schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestEventType = RequestEvent & { params: any };

export async function GET({ params }: RequestEventType) {
	try {
		const { id } = getProjectByIdSchema.parse(params);
		const project = await ProjectModel.findById(id).lean().exec();
		if (!project) return json(PROJECT_MESSAGES.PROJECT_NOT_FOUND, { status: HttpStatus.NOT_FOUND });
		return json(project, { status: HttpStatus.OK });
	} catch (error) {
		return json(PROJECT_MESSAGES.PROJECT_GET_ID_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}

export async function PUT({ params, request }: RequestEventType) {
	try {
		const data = await request.json();
		const { id, payload } = updateProjectSchema.parse({ ...params, payload: data });
		const project = await ProjectModel.findByIdAndUpdate(id, { payload }).lean().exec();
		if (!project) return json(PROJECT_MESSAGES.PROJECT_NOT_FOUND, { status: HttpStatus.NOT_FOUND });

		return json(project, { status: HttpStatus.CREATED });
	} catch (error) {
		return json(PROJECT_MESSAGES.PROJECT_UPDATE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}

export async function DELETE({ params }: RequestEventType) {
	try {
		const { id } = deleteProjectSchema.parse(params);
		const project = await ProjectModel.findByIdAndDelete(id).exec();
		if (!project) return json(PROJECT_MESSAGES.PROJECT_NOT_FOUND, { status: HttpStatus.NOT_FOUND });
		return json(PROJECT_MESSAGES.PROJECT_DELETED, { status: HttpStatus.OK });
	} catch (error) {
		return json(PROJECT_MESSAGES.PROJECT_DELETE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}
