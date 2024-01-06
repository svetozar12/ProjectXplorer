import { Router } from 'express';
import { usersRouter } from './users';
import { projectsRouter } from './projects';
const route = Router();

const routers = [
  { router: usersRouter, path: '/users' },
  { router: projectsRouter, path: '/projects' },
];

export function initRoutes() {
  routers.forEach(({ path, router }) => {
    route.use(path, router);
    console.log(`Endpoint ${path} was initialized`);
  });
  console.log('All routes were initialized successfully');
}
