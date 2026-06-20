import Task from './task.model.js';
import { CreateTaskDto, UpdateTaskDto } from './task.dto.js';
import { toObjectId } from '../../shared/utility/util.js';

export class TaskRepository {
    async create(data: CreateTaskDto) {
        return Task.create(data);
    }

    async userTasks(assignTo : string) {
        return Task.find({ isDeleted : false, assignTo : toObjectId(assignTo) }).populate('assignTo', 'id name')
    }

    async findAll() {
        return Task.find({ isDeleted : false }).lean();
    }

    async updateById(id: string, data: UpdateTaskDto) {
        return Task.findByIdAndUpdate(id, data, { returnDocument : 'after', runValidators: true });
    }

    async deleteById(id: string) {
        return Task.findByIdAndDelete(id);
    }
}

export default new TaskRepository();