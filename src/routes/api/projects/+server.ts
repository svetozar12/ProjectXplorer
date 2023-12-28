import { ProjectModel } from '$lib/server/mongo';
import type { RequestEvent } from './$types';

export async function GET() {
	return new Response('Hello');
}

export async function POST({ request }: RequestEvent) {
	try {
		const data = await request.json();
		const exist = await ProjectModel.findOne({ name: data.name });
		if (exist) return new Response('Already exists', { status: 409 });
		const project = await ProjectModel.create(data);
		await project.save();
		return new Response('Project successfully created.');
	} catch (error) {
		return new Response('Internal server error');
	}
}
