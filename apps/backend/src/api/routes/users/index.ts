import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUserList,
} from './usersController';

export const usersRouter = Router();

usersRouter.get('/', getUserList);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', deleteUser);
