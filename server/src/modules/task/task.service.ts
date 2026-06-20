import taskRepository from './task.repository.js';
import { AppError } from '../../core/app.error.js';
import { CreateTaskDto, UpdateTaskDto } from './task.dto.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';

export default class TaskService {
    async createTask(data: CreateTaskDto) {
        return taskRepository.create(data);
    }

    async getUserTasks(userId : string) {
        return taskRepository.userTasks(userId);
    }

    async getAllTasks() {
        return taskRepository.findAll();
    }

    async updateTask(id: string, data: UpdateTaskDto) {
        const task = await taskRepository.updateById(id, data);
        if (!task) {
            throw new AppError(MESSAGES.TASK.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        return task;
    }

    async deleteTask(id: string) {
        const task = await taskRepository.deleteById(id);
        if (!task) {
            throw new AppError(MESSAGES.TASK.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }
        return task;
    }
}