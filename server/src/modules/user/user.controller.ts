import { Request, Response, NextFunction } from "express";
import UserService from "./user.service.js";
import { sendSuccess } from "../../core/send-response.js";
import { HTTP_STATUS, MESSAGES } from "../../core/message.js";
import { AuthenticatedRequest } from "../../shared/interfaces/authenticated-request.js";

export default class UserController {
    private service!: UserService;

    constructor(service : UserService) {
        this.service = service;
    }

    async register(request : Request, response : Response, next : NextFunction) : Promise<void> {
        const user = await this.service.createUser(request.body)
        sendSuccess(response, HTTP_STATUS.CREATED, MESSAGES.USER.CREATED)
    }

    async getProfile(request : AuthenticatedRequest, response : Response, next : NextFunction) : Promise<void> {
        const user = await this.service.getUserById(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }

    async u(request : AuthenticatedRequest, response : Response, next : NextFunction) : Promise<void> {
        const user = await this.service.getUserById(request.user?.id!)
        sendSuccess(response, HTTP_STATUS.OK, MESSAGES.GENERIC.SUCCESS, user)
    }
}

/**
 * async getUserById(id: string) {
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
 */