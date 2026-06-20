import { z } from 'zod';

export const LoginUserSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
    })
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>['body'];