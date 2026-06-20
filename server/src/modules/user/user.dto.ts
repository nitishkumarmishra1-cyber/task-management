import { z } from 'zod';

export const CreateUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.email('Invalid email format'),
        password: z.string().min(8, 'Password must be at least 8 characters')
    }),
});

export const UpdateUserSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        email: z.email().optional()
    }),
    params: z.object({
        id: z.uuidv4('Invalid user ID'),
    })
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>['body'];
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>['body'];