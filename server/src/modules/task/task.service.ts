import taskRepository from './task.repository.js';
import { AppError } from '../../core/app.error.js';
import { CreateTaskDto, UpdateTaskDto } from './task.dto.js';
import { HTTP_STATUS, MESSAGES } from '../../core/message.js';
import { IUser, ROLE } from '../../shared/interfaces/user.js';
import notificationRepository from '../notification/notification.repository.js';
import { INotification } from '../../shared/interfaces/notification.js';

export default class TaskService {
    async createTask(data: CreateTaskDto, auth_User: IUser) {
        if (auth_User.role === ROLE.USER && data.assignTo !== auth_User.id) {
            throw new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN)
        }

        const task = await taskRepository.create(data);
        if (data.assignTo !== auth_User.id) {
            const notification : INotification = {
                title: `Task create for you ${data.title}`,
                description : '',
                isView : false,
                receiverId : data.assignTo,
                senderId : auth_User.id
            }

            // sending notification to user
            await notificationRepository.create(notification)
        }

        return task;
    }

    async getUserTasks(userId: string) {
        return taskRepository.userTasks(userId);
    }

    async getAllTasks(type: 'team' | 'all', user: IUser) {
        // All task only can see by manager only
        if (type === 'all' && user.role !== ROLE.MANAGER) {
            throw new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN)
        }

        // for viewing team task user should either team-lead or manager
        if (type === 'team' && user.role === ROLE.USER) {
            throw new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN)
        }

        if (type === 'all') {
            return taskRepository.findAll();
        } else {
            return taskRepository.teamTasks(user.id);
        }
    }

    async updateTask(id: string, data: UpdateTaskDto, auth_User: IUser) {
        // this record can only update by self and manager
        if (!(auth_User.role === ROLE.USER && auth_User.id === data.assignTo)) {
            throw new AppError(MESSAGES.GENERIC.FORBIDDEN, HTTP_STATUS.FORBIDDEN)
        }

        let needNotify = false;
        const existingTask = await taskRepository.findById(id);
        if(existingTask?.assignTo?.toString() !== data.assignTo) {
            needNotify = true;
        }

        // update task
        const task = await taskRepository.updateById(id, data);
        if (!task) {
            throw new AppError(MESSAGES.TASK.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        if(needNotify) {
            const notification : INotification = {
                title: `Task has assigned to you ${data.title}`,
                description : '',
                isView : false,
                receiverId : data.assignTo,
                senderId : auth_User.id
            }

            // sending notification to user
            await notificationRepository.create(notification)
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