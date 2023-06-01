import { NextFunction, Request, Response } from 'express';
import { CreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import { RequestWithUser } from '../types/requests/user';

export const createUserHandler = async (
  req: Request<CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email } = req.body;

    const newUser = await createUser({
      name,
      email: email.toLowerCase(),
      password,
    });

    await newUser.save();

    return res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'User with that email already exists',
      });
    }
    next(err);
  }};

export const getUserByIdHandler = async (
  req: RequestWithUser,
  res: Response,
) => {
  return res.status(200).json(req.user);
  };

  export const updateUserHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(400).json({error: 'User with that ID not found'});
      }
        
      Object.assign(user, req.body);
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        status: 'success',
        data: {
          post: updatedUser,
        },
      });
    } catch (err: any) {
      if (err.code === '23505') {
        return res.status(400).json({
          status: 'fail',
          message: 'User with that email already exists',
        });
      }
      next(err);
    }
  };
  
  export const deleteUserHandler = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(400).json({error: 'User with that ID not found'});
      }
      await user.remove();
  
      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err: any) {
      next(err);
    }
  };
  