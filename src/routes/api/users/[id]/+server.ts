import { UserModel } from '$lib/server/mongo';
import { json } from '@sveltejs/kit';
import { USER_MESSAGES } from '$lib/constants/user';
import { HttpStatus } from '$lib/server/httpStatuses';
import { deleteUserSchema, getUserByIdSchema, updateUserSchema } from './schema';
import { handleZodError } from '$lib/server';
import type { RequestEvent } from '../../projects/$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestEventType = RequestEvent & { params: any };

export async function GET({ params }: RequestEventType) {
	try {
		const { id } = getUserByIdSchema.parse(params);
		const user = await UserModel.findById(id).lean().exec();
		if (!user) return json(USER_MESSAGES.USER_NOT_FOUND, { status: HttpStatus.NOT_FOUND });
		return json(user, { status: HttpStatus.OK });
	} catch (error) {
		const validationError = handleZodError(error);
		if (validationError) return validationError;
		return json(USER_MESSAGES.USER_GET_ID_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}

export async function PUT({ params, request }: RequestEventType) {
	try {
		const data = await request.json();
		const { id, ...payload } = updateUserSchema.parse({ ...params, ...data });
		const user = await UserModel.findByIdAndUpdate(id, { ...payload }, { new: true })
			.lean()
			.exec();

		if (!user) {
			return json(USER_MESSAGES.USER_NOT_FOUND, { status: HttpStatus.NOT_FOUND });
		}

		// Return the updated user with status 200 OK
		return json(user, { status: HttpStatus.OK });
	} catch (error) {
		const validationError = handleZodError(error);
		if (validationError) return validationError;
		return json(USER_MESSAGES.USER_UPDATE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}

export async function DELETE({ params }: RequestEventType) {
	try {
		const { id } = deleteUserSchema.parse(params);
		const user = await UserModel.findByIdAndDelete(id).exec();
		if (!user) return json(USER_MESSAGES.USER_NOT_FOUND, { status: HttpStatus.NOT_FOUND });
		return json(USER_MESSAGES.USER_DELETED, { status: HttpStatus.OK });
	} catch (error) {
		const validationError = handleZodError(error);
		if (validationError) return validationError;
		return json(USER_MESSAGES.USER_DELETE_INTERNAL_ERROR, {
			status: HttpStatus.INTERNAL_SERVER_ERROR
		});
	}
}
