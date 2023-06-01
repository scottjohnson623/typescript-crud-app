import express from 'express';
import { createUserHandler, getUserByIdHandler, deleteUserHandler, updateUserHandler } from '../../../controllers/user.controller';
import { loadUserById } from '../../../middleware/loadUserById';
import { validate } from '../../../middleware/validate';
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from '../../../schemas/user.schema';

const router = express.Router();

router.route('/')
    .post(validate(createUserSchema), createUserHandler);

router.param('id', loadUserById);

router.route('/:id')
.get(validate(getUserSchema), getUserByIdHandler)
.patch(validate(updateUserSchema), updateUserHandler)
.delete(validate(deleteUserSchema), deleteUserHandler)
    
export default router;
