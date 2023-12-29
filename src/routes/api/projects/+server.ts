import { PROJECT_MESSAGES } from '$lib/constants/project';
import { ProjectModel } from '$lib/server/mongo';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { HttpStatus } from '$lib/server/httpStatuses';

export async function GET({ url: { searchParams } }: RequestEvent) {
	const page = Number(searchParams.get('page')) || 1;
	const limit = Number(searchParams.get('limit')) || 10;
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
		const data = await request.json();
		const exist = await ProjectModel.findOne({ name: data.name });
		if (exist) return json(PROJECT_MESSAGES.PROJECT_ALREADY_EXIST, { status: HttpStatus.CONFLICT });
		const project = await ProjectModel.create(data);
		await project.save();
		return json(PROJECT_MESSAGES.PROJECT_CREATED, { status: HttpStatus.CREATED });
	} catch (error) {
		return json(PROJECT_MESSAGES.PROJECT_CREATE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}
