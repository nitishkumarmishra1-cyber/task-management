import User from './user.model.js';
import { CreateUserDto, UpdateUserDto } from './user.dto.js';
import { ObjectId } from 'mongoose';

export class UserRepository {
    async create(data: CreateUserDto) {
        return User.create(data);
    }

    async findById(id: string) {
        return User.findById(id);
    }

    async findByEmail(email: string) {
        return User.findOne({ email });
    }

    async findByEmailWithPassword(email: string) {
        return User.findOne({ email }).select('+password');
    }

    async findAll(skip = 0, limit = 10) {
        return User.find().skip(skip).limit(limit);
    }

    async updateById(id: string, data: UpdateUserDto) {
        return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteById(id: string) {
        return User.findByIdAndDelete(id);
    }

    async existsByEmail(email: string) {
        const user = await User.exists({ email });
        return !!user;
    }
}

export default new UserRepository();