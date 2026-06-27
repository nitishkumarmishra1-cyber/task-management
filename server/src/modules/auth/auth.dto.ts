import { z } from 'zod';
import { AppConstant } from '../../shared/utility/constant.js';

export const LoginUserSchema = z.object({
    body: z.object({
        email: z.email().trim(),
        password: z.string().min(8),
    })
});

export const RegisterUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.email('Invalid email format'),
        password: z.string().min(8, 'Password must be at least 8 characters').regex(AppConstant.PASSSWORD_PATTERN, 'Password must include an uppercase letter, lowercase letter, number, and special character.')
    }),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>['body'];
export type RegisterUserDto = z.infer<typeof RegisterUserSchema>['body'];