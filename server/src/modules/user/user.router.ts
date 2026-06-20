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



export default userRoutes;