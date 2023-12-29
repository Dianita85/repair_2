import z from 'zod';
import { extracValidationData } from '../../common/utils/extractErrorData.js';

const loginSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',

      required_error: 'name is required',
    })

    .min(3, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),


  email: z
  .string()
  .email({ message: 'Invalid email' }),

  
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
});



export function validateUser(data) {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extracValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validatePartialUser(data) {
  const result = loginSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extracValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
