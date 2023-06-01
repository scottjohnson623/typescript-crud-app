import { CookieOptions, NextFunction, Request, Response } from 'express';
import config from 'config';
import { LoginUserInput } from '../schemas/user.schema';
import { findUserByEmail, signTokens } from '../services/user.service';

import { User } from '../entities/user.entity';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

export const loginUserHandler = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, LoginUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (!(await User.comparePasswords(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const { access_token } = await signTokens(user);

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
