import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler = (fn: Function): RequestHandler => {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(fn(request, response, next)).catch(next);
    };
};

export default asyncHandler;