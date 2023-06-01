import express from 'express';
import { loginUserHandler, logoutHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginUserSchema } from '../schemas/user.schema';
import { createUserSchema } from '../schemas/user.schema';
import { createUserHandler } from '../controllers/user.controller';
const router = express.Router();

router.post('/register', validate(createUserSchema), createUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

router.get('/logout', logoutHandler);

export default router;
