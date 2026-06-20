import { Request, Response } from 'express';
import { NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import { sendSuccess } from '../../core/send-response.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';

export class AuthController {
    private authService!: AuthService

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async userLogin(request: Request, response: Response, next: NextFunction): Promise<void> {
        const { token, user } = await this.authService.authentication(request.body);

        response.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        sendSuccess(
            response,
            HTTP_STATUS.OK,
            MESSAGES.AUTH.LOGIN_SUCCESS,
            user
        );
    }

    async userLogout(request: Request, response: Response): Promise<void> {
        response.clearCookie('accessToken');
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.AUTH.LOGOUT_SUCCESS)
    }
}