import Task from './task.model.js';
import { CreateTaskDto, UpdateTaskDto } from './task.dto.js';
import { toObjectId } from '../../shared/utility/util.js';
import userRepository from '../user/user.repository.js';
import { FILTER, STATUS } from '../../shared/interfaces/task.js';

export class TaskRepository {
    async create(data: CreateTaskDto) {
        return Task.create(data);
    }

    async userTasks(assignTo: string, filter : FILTER) {
        const status = filter === FILTER.ALL ? {} : { status : filter };
        return Task.find({ isDeleted: false, assignTo: toObjectId(assignTo), ...status }).populate('assignTo', 'id name')
    }

    async teamTasks(assignTo: string, filter : FILTER) {
        const status = filter === FILTER.ALL ? {} : { status : filter };
        const reportIds = (await userRepository.findReportees(assignTo)).map(u => toObjectId(u.id));
        return Task.find({ isDeleted: false, assignTo: { $in: reportIds }, ...status }).populate('assignTo', 'id name')
    }

    async findAll(filter : FILTER) {
        const status = filter === FILTER.ALL ? {} : { status : filter };
        return Task.find({ isDeleted: false, ...status }).populate('assignTo', 'id name');
    }

    async updateById(id: string, data: UpdateTaskDto) {
        return Task.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
    }

    async updateStatusById(id: string) {
        return Task.findByIdAndUpdate(id, { '$set' : { status : STATUS.COMPLETED } }, { returnDocument: 'after', runValidators: true });
    }

    async deleteById(id: string) {
        return Task.findByIdAndDelete(id);
    }

    async findById(id: string) {
        return Task.findById(id);
    }
}

export default new TaskRepository();