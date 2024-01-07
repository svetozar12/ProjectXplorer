import { Request, Response } from 'express';
import { UserModel } from '../../../models';
import {
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
} from './usersSchema';
import { USER_MESSAGES } from '../../../constants/user';
import { firebaseAuth } from '../../../config/firebase';
import { paginationSchema } from '../../../utils/schema';

export async function getUserById(req: Request, res: Response) {
  const { id } = getUserByIdSchema.parse({ id: req.params.id });
  const user = await UserModel.findById(id).lean().exec();

  if (!user) {
    return res.status(404).json(USER_MESSAGES.USER_NOT_FOUND);
  }

  res.status(200).json(user);
}
export async function getUserList(req: Request, res: Response) {
  const { page, limit } = paginationSchema.parse({
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });

  const projects = await UserModel.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  const total = await UserModel.countDocuments().lean().exec();
  const pagination = {
    page,
    limit,
    total,
    prev: page > 1,
    next: page * limit < total,
  };
  const data = { data: projects, pagination };

  res.status(200).json(data);
}

export async function createUser(req: Request, res: Response) {
  const { uId } = createUserSchema.parse(req.body);

  const exist = await UserModel.findOne({ firebaseUid: uId });
  if (exist) {
    return res.status(409).json(USER_MESSAGES.USER_ALREADY_EXIST);
  }

  const user = await UserModel.create({ firebaseUid: uId });
  await user.save();

  res.status(201).json(user);
}
export async function deleteUser(req: Request, res: Response) {
  const { id } = deleteUserSchema.parse({ id: req.params.id });
  const user = await UserModel.findByIdAndDelete(id).lean().exec();

  if (!user) {
    return res.status(404).json(USER_MESSAGES.USER_NOT_FOUND);
  }

  // Assuming firebaseServerInstance is a correctly initialized Firebase instance
  await firebaseAuth.deleteUser(user.firebaseUid);

  res.status(200).json(USER_MESSAGES.USER_DELETED);
}
