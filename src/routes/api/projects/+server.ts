import {
	ProjectAlreadyExist,
	ProjectCreated,
	ProjectCreateInternalError
} from '$lib/constants/project';
import { ProjectModel } from '$lib/server/mongo';
import { createResponse } from '$lib/server/response';
import type { RequestEvent } from './$types';

export async function GET() {
	return new Response('Hello');
}

export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const exist = await ProjectModel.findOne({ name: data.name });
		if (exist) return createResponse(ProjectAlreadyExist);
		const project = await ProjectModel.create(data);
		await project.save();
		return createResponse(ProjectCreated);
	} catch (error) {
		return createResponse(ProjectCreateInternalError);
	}
}
