import { Request, Response, NextFunction } from "express";
import UserService from "./user.service.js";
import { sendSuccess } from "../../core/send-response.js";
import { HTTP_STATUS, MESSAGES } from "../../core/message.js";
import { AuthenticatedRequest } from "../../shared/interfaces/authenticated-request.js";
import { ROLE } from "../../shared/interfaces/user.js";

export default class UserController {
    private service!: UserService;

    constructor(service: UserService) {
        this.service = service;
    }

    async register(request: Request, response: Response): Promise<void> {
        const user = await this.service.createUser(request.body)
        sendSuccess(response, HTTP_STATUS.CREATED, MESSAGES.USER.CREATED)
    }

    async assignableUsers(request: AuthenticatedRequest, response: Response): Promise<void> {
        const id = request.user!.id as string;
        const users = await this.service.assignableUsers(id);
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, users)
    }

    async userList(request: AuthenticatedRequest, response: Response): Promise<void> {
        const id = request.user!.id as string;
        const role = request.user!.role as ROLE;
        const users = await this.service.userList(id, role);
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, users)
    }

    async getProfile(request: AuthenticatedRequest, response: Response): Promise<void> {
        const user = await this.service.getUserById(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }

    async getUserById(request: AuthenticatedRequest, response: Response): Promise<void> {
        const user = await this.service.getUserById(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }
}