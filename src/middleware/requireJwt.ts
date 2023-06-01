import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

export const requireToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return res.status(401).json({ error: 'You are not logged in' });
    }

    const decoded = verifyJwt<{ sub: string }>(access_token, 'accessTokenPublicKey');

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token or user doesn't exist" });
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
