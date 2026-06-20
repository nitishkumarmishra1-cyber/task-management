import { Response, NextFunction } from 'express';
import { AppError } from '../core/app.error.js';
import { AuthenticatedRequest } from '../shared/interfaces/authenticated-request.js';
import { ROLE } from '../shared/interfaces/user.js';
import { HTTP_STATUS, MESSAGES } from '../core/message.js';

export function authorize(...roles: ROLE[]) {
    return (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        const requestRole = request.user?.role;

        if (!requestRole || !roles.includes(requestRole)) {
            return next(new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
        }

        next();
    };
}