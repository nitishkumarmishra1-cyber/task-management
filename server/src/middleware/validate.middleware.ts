import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { AppError } from '../core/app.error.js';
import { HTTP_STATUS, MESSAGES } from '../core/message.js';

export const validate = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            req.body = parsed.body;
            req.params = parsed.params as any;

            // req.query is a read-only getter in Express 5 - can't reassign it directly,
            // so clear its existing keys and refill in place with the validated values
            for (const key of Object.keys(req.query)) {
                delete (req.query as any)[key];
            }
            Object.assign(req.query, parsed.query);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.issues.map((err) => ({
                    field: err.path.join('.').replace(/^(body|query|params)\./, ''),
                    message: err.message
                }));

                const validationError = new AppError(MESSAGES.VALIDATION.FAILED, HTTP_STATUS.BAD_REQUEST);
                (validationError as any).details = errorDetails;

                return next(validationError);
            }

            next(error);
        }
    };
};