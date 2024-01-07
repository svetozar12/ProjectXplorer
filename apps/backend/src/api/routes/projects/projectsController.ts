import { ProjectModel } from '../../../models';
import { paginationSchema } from '../../../utils/schema';
import { Request, Response } from 'express';
import { createProjectSchema, getProjectByIdSchema } from './projectsSchema';
import { PROJECT_MESSAGES } from '../../../constants/project';

export async function getProjectById(req: Request, res: Response) {
  const { id } = getProjectByIdSchema.parse({ id: req.params.id });
  const project = await ProjectModel.findById(id).lean().exec();

  if (!project) {
    return res.status(404).json(PROJECT_MESSAGES.PROJECT_NOT_FOUND);
  }

  res.status(200).json(project);
}

export async function getProjectList(req: Request, res: Response) {
  const { page, limit } = paginationSchema.parse({
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });
  const projects = await ProjectModel.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  const total = await ProjectModel.countDocuments().lean().exec();
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

export async function createProject(req: Request, res: Response) {
  const payload = createProjectSchema.parse(req.body);

  const exist = await ProjectModel.findOne({ name: payload.name });
  if (exist) {
    return res.status(409).json(PROJECT_MESSAGES.PROJECT_ALREADY_EXIST);
  }

  const project = await ProjectModel.create(payload);
  await project.save();

  res.status(201).json(project);
}
