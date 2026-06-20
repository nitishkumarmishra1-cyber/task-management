import userRepository from '../user/user.repository.js';
import { AppError } from '../../core/app.error.js';
import { LoginUserDto } from './auth.dto.js';
import { verifyPassword } from '../../shared/utility/password.js';
import { signToken } from '../../shared/utility/jwt.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';

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

        const userObj = user.toObject();
        return { token, user: userObj };
    }
}