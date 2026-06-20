import { ApiResponse } from "../shared/interfaces/response.js";
import { Response } from 'express';

export function sendSuccess<T>(
    response: Response, statusCode: number, message: string, data: T = null as any
): Response {
    const responseBody: ApiResponse<T> = {
        success: true,
        message,
        timestamp : (new Date()).toISOString(),
        ...(data !== null && { data })
    };

    return response.status(statusCode).json(responseBody);
}