import { z } from 'zod';
import { objectIdSchema } from '../../shared/utility/util.js';

export const CreateTaskSchema = z.object({
    body: z.object({
        title: z.string().min(2, 'Title must be at least 2 characters'),
        description: z.string().min(2, 'Description must be at least 2 characters'),
        status: z.string(),
        assignTo: z.string()
    }),
});

export const UpdateTaskSchema = z.object({
    body: z.object({
        title: z.string().min(2, 'Title must be at least 2 characters'),
        description: z.string().min(2, 'Description must be at least 2 characters'),
        status: z.string(),
        assignTo: z.string()
    }),
    params: z.object({
        id: objectIdSchema,
    })
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>['body'];
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>['body'];