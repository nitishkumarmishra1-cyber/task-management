import userRepository from './user.repository.js';
import { AppError } from '../../core/app.error.js';
import { CreateUserDto, UpdateUserDto } from './user.dto.js';
import { hashPassword } from '../../shared/utility/password.js';

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
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async getAllUsers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return userRepository.findAll(skip, limit);
    }

    async updateUser(id: string, data: UpdateUserDto) {
        const user = await userRepository.updateById(id, data);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async deleteUser(id: string) {
        const user = await userRepository.deleteById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }
}