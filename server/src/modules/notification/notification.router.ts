import { Router } from "express";
import asyncHandler from "../../core/asyn-handler.js";
import NotificationService from "./notification.service.js";
import NotificationController from "./notification.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { updateNotificationSchema } from "./notification.dto.js";

const notificationRoutes = Router();
const service = new NotificationService();
const controller = new NotificationController(service);

notificationRoutes.get('', asyncHandler(controller.notificationList.bind(controller)));
notificationRoutes.get('/unseen', asyncHandler(controller.unseenCount.bind(controller)));
notificationRoutes.patch('',  validate(updateNotificationSchema), asyncHandler(controller.update.bind(controller)));

export default notificationRoutes;