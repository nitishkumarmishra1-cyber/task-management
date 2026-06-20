import { Request, Response, NextFunction } from "express";
import TaskService from "./task.service.js";
import { sendSuccess } from "../../core/send-response.js";
import { HTTP_STATUS, MESSAGES } from "../../core/message.js";
import { AuthenticatedRequest } from "../../shared/interfaces/authenticated-request.js";

export default class TaskController {
    private service!: TaskService;

    constructor(service: TaskService) {
        this.service = service;
    }

    async create(request: Request, response: Response): Promise<void> {
        const task = await this.service.createTask(request.body)
        sendSuccess(response, HTTP_STATUS.CREATED, MESSAGES.TASK.CREATED)
    }

    async getUserTasks(request: AuthenticatedRequest, response: Response): Promise<void> {
        const tasks = await this.service.getUserTasks(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, tasks)
    }

    async getAllTasks(request: AuthenticatedRequest, response: Response): Promise<void> {
        const user = await this.service.getAllTasks()
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }

    async update(request: Request, response: Response): Promise<void> {
        const id = request.params.id as string;
        const task = await this.service.updateTask(id, request.body);
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.TASK.UPDATED, task);
    }

    async delete(request: Request, response: Response): Promise<void> {
        const id = request.params.id as string;
        const task = await this.service.deleteTask(id);
        sendSuccess(response, HTTP_STATUS.CREATED, MESSAGES.TASK.DELETED);
    }
}