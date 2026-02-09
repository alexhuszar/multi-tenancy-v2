import * as z from 'zod';

const baseSchema = {
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Must include uppercase, lowercase, and number',
    ),
};

export const signInSchema = z.object(baseSchema);

export const signUpSchema = z
  .object({
    ...baseSchema,
    fullName: z.string().min(2).max(50),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
