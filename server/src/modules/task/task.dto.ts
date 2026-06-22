import { z } from 'zod';
import { objectIdSchema } from '../../shared/utility/util.js';
import { FILTER } from '../../shared/interfaces/task.js';

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

export const GetTaskSchema = z.object({
    params : z.object({
        type : z.enum(FILTER).optional().default(FILTER.ALL)
    }),
    query : z.object({
        filter : z.enum(FILTER).optional().default(FILTER.ALL)
    })
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>['body'];
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>['body'];