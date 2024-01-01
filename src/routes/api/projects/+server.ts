import { PROJECT_MESSAGES } from '$lib/constants/project';
import { ProjectModel } from '$lib/server/mongo';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { HttpStatus } from '$lib/server/httpStatuses';
import { createProjectSchema, getProjectListSchema } from './schema';
import { ZodError } from 'zod';

export async function GET({ url: { searchParams } }: RequestEvent) {
	const { page, limit } = getProjectListSchema.parse({
		page: Number(searchParams.get('page')),
		limit: Number(searchParams.get('limit'))
	});
	const projects = await ProjectModel.find()
		.skip((page - 1) * limit)
		.limit(limit)
		.lean()
		.exec();

	const total = await ProjectModel.find().countDocuments().lean().exec();
	const pagination = { page, limit, total, prev: page > 1, next: page * limit < total };
	const data = { data: projects, pagination };
	return json(data, { status: HttpStatus.OK });
}

export async function POST({ request }: RequestEvent) {
	try {
		const payload = createProjectSchema.parse(await request.json());

		const exist = await ProjectModel.findOne({ name: payload.name });
		if (exist) {
			return json(PROJECT_MESSAGES.PROJECT_ALREADY_EXIST, { status: HttpStatus.CONFLICT });
		}

		const project = await ProjectModel.create(payload);
		await project.save();
		return json(project, { status: HttpStatus.CREATED });
	} catch (error) {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return json(
				{ error: 'Invalid input', details: error.errors },
				{
					status: HttpStatus.BAD_REQUEST
				}
			);
		}
		return json(PROJECT_MESSAGES.PROJECT_CREATE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}
