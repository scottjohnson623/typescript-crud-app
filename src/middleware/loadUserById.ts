import { Response, NextFunction } from 'express';
import { findUserById } from '../services/user.service';
import { RequestWithUser } from '../types/requests/user';

export const loadUserById =
  async (req: RequestWithUser, res: Response, next: NextFunction, id: string) => {
    try {
      const user = await findUserById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(400).json({error: `Error finding user with id ${id}`});
      }
    } catch (error) {
      return res.status(400).json({error: `Error finding user with id ${id}`});
    }
  };
