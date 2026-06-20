import { Response, NextFunction } from 'express';
import { AppError } from '../core/app.error.js';
import { AuthenticatedRequest } from '../shared/interfaces/authenticated-request.js';
import { verifyToken } from '../shared/utility/jwt.js';
import { HTTP_STATUS, MESSAGES } from '../core/message.js';

export async function authenticate(request: AuthenticatedRequest, response: Response, next: NextFunction) {
    const authToken = request.cookies.accessToken

    if (!authToken) {
        return next(new AppError(MESSAGES.AUTH.ACCESS_DENIED, HTTP_STATUS.UNAUTHORIZED));
    }
    
    try {
        // find payload
        const decoded = await verifyToken(authToken);
        request.user = decoded as AuthenticatedRequest['user'];
        next();
    } catch (error) {
        next(error);
    }
}