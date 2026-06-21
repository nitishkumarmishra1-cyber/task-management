import userRepository from './user.repository.js';
import { AppError } from '../../core/app.error.js';
import { CreateUserDto, UpdateUserDto } from './user.dto.js';
import { hashPassword } from '../../shared/utility/password.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';
import { IUser, ROLE } from '../../shared/interfaces/user.js';

export default class UserService {
    async createUser(data: CreateUserDto) {
        const existingUser = await userRepository.existsByEmail(data.email);
        if (existingUser) {
            throw new AppError(MESSAGES.USER.EMAIL_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST);
        }

        const hashedPassword = await hashPassword(data.password);

        const user = await userRepository.create({
            ...data,
            password: hashedPassword
        });

        const userObj = user.toObject();
        delete userObj.password;
        return userObj;
    }

    async getUserById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }

    async assignableUsers(userId : string) {
        return userRepository.findAssignableUsers(userId);
    }

    async userList(userId : string, role : ROLE) {
        if(role === ROLE.MANAGER) {
            return userRepository.findAll(userId);;
        } else {
            return userRepository.findReportees(userId);
        }
    }

    async updateUser(id: string, data: UpdateUserDto, auth_User : IUser) {
        // this record can only update by self and manager
        if(!(auth_User.role === ROLE.MANAGER || auth_User.id === id)) {
            throw new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN)
        }

        const existingUser = await userRepository.findById(id);
        if(existingUser.email !== data.email) {
            const hasEmail = await userRepository.existsByEmail(data!.email as string);
            if(hasEmail) {
                throw new AppError(MESSAGES.USER.EMAIL_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST)
            }
        }

        const user = await userRepository.updateById(id, data);
        if (!user) {
            throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }

    async deleteUser(id: string) {
        const user = await userRepository.deleteById(id);
        if (!user) {
            throw new AppError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }
}