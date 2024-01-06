import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from '../../constants/authConstants';
import { verifyToken } from '../../utils/authUtils';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers;

    const token = headers.authorization?.split(' ')[1] || '';
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).send(UNAUTHORIZED);
    }

    next();
  } catch (error) {
    res.status(401).send(UNAUTHORIZED);
  }
};
