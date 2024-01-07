import { Router } from 'express';
import { usersRouter } from './users';
import { projectsRouter } from './projects';
import { authMiddleware } from '../middleware/auth';
const route = Router();

const routers = [
  { router: usersRouter, path: '/users' },
  { router: projectsRouter, path: '/projects' },
];

const middlewares = [authMiddleware];

export function initRoutes() {
  middlewares.forEach((middleware) => route.use(middleware));
  routers.forEach(({ path, router }) => {
    route.use(path, router);
    console.log(`Endpoint ${path} was initialized`);
  });
  console.log('All routes were initialized successfully');
}
