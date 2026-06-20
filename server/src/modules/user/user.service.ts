import userRepository from './user.repository.js';
import { AppError } from '../../core/app.error.js';
import { CreateUserDto, UpdateUserDto } from './user.dto.js';
import { hashPassword } from '../../shared/utility/password.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';
import { ROLE } from '../../shared/interfaces/user.js';

export default class UserService {
    async createUser(data: CreateUserDto) {
        const existingUser = await userRepository.existsByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already registered', 409);
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

    async updateUser(id: string, data: UpdateUserDto) {
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