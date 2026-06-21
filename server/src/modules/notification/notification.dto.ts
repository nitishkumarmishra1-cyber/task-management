import { z } from 'zod';
import { objectIdSchema } from '../../shared/utility/util.js';

export const updateNotificationSchema = z.object({
    body : z.object({
        id : z.array(objectIdSchema)
    })
});

export type updateNotificationDto = z.infer<typeof updateNotificationSchema>['body'];