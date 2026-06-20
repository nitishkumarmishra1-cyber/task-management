import { Router } from "express";
import asyncHandler from "../../core/asyn-handler.js";
import { authorize } from "../../middleware/role.middleware.js";
import TaskService from "./task.service.js";
import TaskController from "./task.controller.js";
import { ROLE } from "../../shared/interfaces/user.js";
import { validate } from "../../middleware/validate.middleware.js";
import { CreateTaskSchema, UpdateTaskSchema } from "./task.dto.js";

const taskRoutes = Router();
const service = new TaskService();
const controller = new TaskController(service);

taskRoutes.post('', validate(CreateTaskSchema), asyncHandler(controller.create.bind(controller)));
taskRoutes.patch('/:id', validate(UpdateTaskSchema), asyncHandler(controller.update.bind(controller)));
taskRoutes.get('', asyncHandler(controller.getUserTasks.bind(controller)));
taskRoutes.get('/all', authorize(ROLE.MANAGER), asyncHandler(controller.getAllTasks.bind(controller)));
taskRoutes.delete('/:id', asyncHandler(controller.delete.bind(controller)));

export default taskRoutes;