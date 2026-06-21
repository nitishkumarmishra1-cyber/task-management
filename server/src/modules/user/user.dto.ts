import { z } from 'zod';
import { objectIdSchema } from '../../shared/utility/util.js';
import { ROLE } from '../../shared/interfaces/user.js';

export const CreateUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.email('Invalid email format'),
        role: z.enum(ROLE),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        reportTo: z.string()
    }),
});

export const UpdateUserSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        email: z.email().optional(),
        role: z.enum(ROLE).optional(),
        reportTo: z.string().optional()
    }),
    params: z.object({
        id: objectIdSchema,
    })
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>['body'];
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>['body'];