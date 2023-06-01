import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  }),
});

const params = {
  params: object({
    id: string(),
  }),
};

export const getUserSchema = object({
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const updateUserSchema = object({
  ...params,
  body: object({
    name: string(),
    email: string(),
    image: string(),
  }).partial(),

});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
