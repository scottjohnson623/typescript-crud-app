import express from 'express';
import { requireToken } from '../../middleware/requireJwt';
import userRouter from './v1/user.routes';

const router = express.Router();

router.use('/v1/users', requireToken, userRouter);

export default router;
