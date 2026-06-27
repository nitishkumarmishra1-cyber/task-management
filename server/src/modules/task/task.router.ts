import { Router } from "express";
import asyncHandler from "../../core/asyn-handler.js";
import { authorize } from "../../middleware/role.middleware.js";
import TaskService from "./task.service.js";
import TaskController from "./task.controller.js";
import { ROLE } from "../../shared/interfaces/user.js";
import { validate } from "../../middleware/validate.middleware.js";
import { CreateTaskSchema, DeletedTaskSchema, GetTaskSchema, UpdateTaskSchema } from "./task.dto.js";

const taskRoutes = Router();
const service = new TaskService();
const controller = new TaskController(service);

taskRoutes.post('', validate(CreateTaskSchema), asyncHandler(controller.create.bind(controller)));
taskRoutes.patch('/:id', validate(UpdateTaskSchema), asyncHandler(controller.update.bind(controller)));
taskRoutes.get('', validate(GetTaskSchema), asyncHandler(controller.getUserTasks.bind(controller)));
taskRoutes.get('/:type', authorize(ROLE.MANAGER, ROLE.TEAM_LEAD), validate(GetTaskSchema), asyncHandler(controller.getAllTasks.bind(controller)));
taskRoutes.delete('/:id', validate(DeletedTaskSchema), asyncHandler(controller.delete.bind(controller)));
taskRoutes.patch('/status/:id', asyncHandler(controller.markTaskComplete.bind(controller)));

export default taskRoutes;