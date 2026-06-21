import Task from './task.model.js';
import { CreateTaskDto, UpdateTaskDto } from './task.dto.js';
import { toObjectId } from '../../shared/utility/util.js';
import userRepository from '../user/user.repository.js';

export class TaskRepository {
    async create(data: CreateTaskDto) {
        return Task.create(data);
    }

    async userTasks(assignTo: string) {
        return Task.find({ isDeleted: false, assignTo: toObjectId(assignTo) }).populate('assignTo', 'id name')
    }

    async teamTasks(assignTo: string) {
        const reportIds = (await userRepository.findReportees(assignTo)).map(u => toObjectId(u.id));
        return Task.find({ isDeleted: false, assignTo: { $in: reportIds } }).populate('assignTo', 'id name')
    }

    async findAll() {
        return Task.find({ isDeleted: false }).populate('assignTo', 'id name');
    }

    async updateById(id: string, data: UpdateTaskDto) {
        return Task.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
    }

    async deleteById(id: string) {
        return Task.findByIdAndDelete(id);
    }

    async findById(id: string) {
        return Task.findById(id);
    }
}

export default new TaskRepository();