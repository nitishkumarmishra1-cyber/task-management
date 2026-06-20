import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/app.error.js';
import { ApiResponse } from '../shared/interfaces/response.js';
import { MESSAGES } from '../core/message.js';

export function errorHandler(error: Error, request: Request, res: Response, next: NextFunction) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = error.message || MESSAGES.GENERIC.SERVER_ERROR;

    const errorResponse: ApiResponse = {
        success: false,
        message,
        timestamp : (new Date()).toISOString(),
        error: {
            statusCode,
            ...(error instanceof AppError && (error as any).details && { details: (error as any).details }),
            ...(process.env.NODE_ENV !== 'production' && { message: error.message })
        }
    };

    return res.status(statusCode).json(errorResponse);
}