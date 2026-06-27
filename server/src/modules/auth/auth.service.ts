import userRepository from '../user/user.repository.js';
import { AppError } from '../../core/app.error.js';
import { LoginUserDto, RegisterUserDto } from './auth.dto.js';
import { hashPassword, verifyPassword } from '../../shared/utility/password.js';
import { signToken } from '../../shared/utility/jwt.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';
import { ROLE } from '../../shared/interfaces/user.js';

export class AuthService {

    async authentication(data: LoginUserDto) {
        const user = await userRepository.findByEmailWithPassword(data.email);

        if (!user) {
            throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
        }

        const isMatch = await verifyPassword(data.password, user.password);

        if (!isMatch) {
            throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
        }

        const token = signToken({ id: user._id, role: user.role });

        const userObj = user.toJSON();
        return { token, user: userObj };
    }

    async register(data: RegisterUserDto) {
        const existingUser = await userRepository.existsByEmail(data.email);
        if (existingUser) {
            throw new AppError(MESSAGES.USER.EMAIL_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST);
        }

        const hashedPassword = await hashPassword(data.password);

        const user = await userRepository.create({
            name : data.name,
            email : data.email,
            password: hashedPassword,
            role : ROLE.USER
        });

        const userObj = user.toObject();
        delete userObj.password;
        return userObj;
    }
}