import express from 'express';
import { getUserByIdHandler, deleteUserHandler, updateUserHandler } from '../../../controllers/user.controller';
import { loadUserById } from '../../../middleware/loadUserById';
import { validate } from '../../../middleware/validate';
import { deleteUserSchema, getUserSchema, updateUserSchema } from '../../../schemas/user.schema';

const router = express.Router();

router.param('id', loadUserById);

router
  .route('/:id')
  .get(validate(getUserSchema), getUserByIdHandler)
  .patch(validate(updateUserSchema), updateUserHandler)
  .delete(validate(deleteUserSchema), deleteUserHandler);

export default router;
