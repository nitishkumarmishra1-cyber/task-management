import jwt from "jsonwebtoken";
const { sign, verify, JsonWebTokenError, TokenExpiredError } = jwt;
import { IUser } from "../interfaces/user.js";
import { AppSetting } from "../../core/setting.js";
import { AppError } from "../../core/app.error.js";
import { HTTP_STATUS, MESSAGES } from "../../core/message.js";

export function signToken(data: IUser): string {
    return sign(
        data,
        AppSetting.secretKey,
        {
            algorithm: 'HS256',
            issuer: 'task-management.com',
            expiresIn: '15m'
        }
    )
}

export function verifyToken(token: string): IUser {
    try {
        const decoded = verify(token, AppSetting.secretKey, {
            algorithms: ['HS256'],
            issuer: 'task-management.com',
        });

        return decoded as IUser;

    } catch (err) {
        if (err instanceof TokenExpiredError) {
            throw new AppError(MESSAGES.AUTH.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
        }
        if (err instanceof JsonWebTokenError) {
            throw new AppError(MESSAGES.AUTH.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
        }
        throw new AppError(MESSAGES.AUTH.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
    }
}