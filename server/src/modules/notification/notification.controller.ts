import { Response } from "express";
import NotificationService from "./notification.service.js";
import { sendSuccess } from "../../core/send-response.js";
import { HTTP_STATUS, MESSAGES } from "../../core/message.js";
import { AuthenticatedRequest } from "../../shared/interfaces/authenticated-request.js";
import { IUser } from "../../shared/interfaces/user.js";

export default class NotificationController {
    private service!: NotificationService;

    constructor(service: NotificationService) {
        this.service = service;
    }

    async notificationList(request: AuthenticatedRequest, response: Response): Promise<void> {
        const tasks = await this.service.findNotifications(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, tasks)
    }

    async unseenCount(request: AuthenticatedRequest, response: Response): Promise<void> {
        const user = await this.service.findCount(request!.user!.id as IUser['id'])
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }

    async update(request: AuthenticatedRequest, response: Response): Promise<void> {
        const task = await this.service.updateNotification(request.body, request!.user!.id as IUser['id']);
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.TASK.UPDATED, task);
    }
}