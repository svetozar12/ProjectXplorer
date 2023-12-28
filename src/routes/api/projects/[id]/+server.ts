import {
	ProjectDeleteInternalError,
	ProjectDeleted,
	ProjectGetIdInternalError,
	ProjectNotFound,
	ProjectUpdateInternalError
} from '$lib/constants/project';
import { ProjectModel } from '$lib/server/mongo';
import { createResponse } from '$lib/server/response';
import type { RequestEvent } from '../$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestEventType = RequestEvent & { params: any };

export async function GET({ params }: RequestEventType) {
	try {
		const projectId = params.id;
		const project = await ProjectModel.findById(projectId).exec();
		if (!project) return createResponse(ProjectNotFound);

		return new Response(project);
	} catch (error) {
		return createResponse(ProjectGetIdInternalError);
	}
}

export async function PUT({ params, request }: RequestEventType) {
	try {
		const projectId = params.id;
		const data = await request.json();
		const project = await ProjectModel.findByIdAndUpdate(projectId, { data }).exec();
		if (!project) return createResponse(ProjectNotFound);

		return new Response(project);
	} catch (error) {
		return createResponse(ProjectUpdateInternalError);
	}
}

export async function DELETE({ params }: RequestEventType) {
	try {
		const projectId = params.id;
		const project = await ProjectModel.findByIdAndDelete(projectId).exec();
		if (!project) return createResponse(ProjectNotFound);
		return createResponse(ProjectDeleted);
	} catch (error) {
		return createResponse(ProjectDeleteInternalError);
	}
}
