import { USER_MESSAGES } from '$lib/constants/user';
import { HttpStatus } from '$lib/server/httpStatuses';
import { UserModel } from '$lib/server/mongo';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '../projects/$types';
import { createUserSchema, getUserListSchema } from './schema';
import { handleZodError } from '$lib/server';
import { env } from '$env/dynamic/public';

export async function GET({ url: { searchParams } }: RequestEvent) {
	try {
		const { page, limit } = getUserListSchema.parse({
			page: Number(searchParams.get('page')) || Number(env.PUBLIC_DEFAULT_PAGE),
			limit: Number(searchParams.get('limit')) || Number(env.PUBLIC_DEFAULT_LIMIT)
		});
		const projects = await UserModel.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.lean()
			.exec();

		const total = await UserModel.find().countDocuments().lean().exec();
		const pagination = { page, limit, total, prev: page > 1, next: page * limit < total };
		const data = { data: projects, pagination };
		return json(data, { status: HttpStatus.OK });
	} catch (error) {
		const validationError = handleZodError(error);
		if (validationError) return validationError;
		return json(USER_MESSAGES.USER_GET_LIST_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}

export async function POST({ request }: RequestEvent) {
	try {
		const { uId } = createUserSchema.parse(
			await request.json().catch(() => {
				return {};
			})
		);

		const exist = await UserModel.findOne({ firebaseUid: uId });
		if (exist) {
			return json(USER_MESSAGES.USER_ALREADY_EXIST, { status: HttpStatus.CONFLICT });
		}

		const user = await UserModel.create({ firebaseUid: uId });
		await user.save();
		return json(user, { status: HttpStatus.CREATED });
	} catch (error) {
		const validationError = handleZodError(error);
		if (validationError) return validationError;
		return json(USER_MESSAGES.USER_CREATE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}
