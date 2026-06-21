import { Router } from "express";
import UserController from "./user.controller.js";
import UserService from "./user.service.js";
import asyncHandler from "../../core/asyn-handler.js";
import { authorize } from "../../middleware/role.middleware.js";
import { ROLE } from "../../shared/interfaces/user.js";

const userRoutes = Router();
const service = new UserService();
const controller = new UserController(service);

userRoutes.post(
    '',
    authorize(ROLE.MANAGER),
    asyncHandler(controller.register.bind(controller))
);
userRoutes.get(
    '/assignable',
    authorize(ROLE.MANAGER, ROLE.TEAM_LEAD),
    asyncHandler(controller.assignableUsers.bind(controller))
);
userRoutes.get(
    '/list',
    authorize(ROLE.MANAGER, ROLE.TEAM_LEAD),
    asyncHandler(controller.userList.bind(controller))
);
userRoutes.patch(
    '/:id',
    asyncHandler(controller.update.bind(controller))
);

export default userRoutes;