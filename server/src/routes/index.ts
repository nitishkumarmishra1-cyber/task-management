import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import userRoutes from "../modules/user/user.router.js";
import taskRoutes from "../modules/task/task.router.js";
import { authenticate } from "../middleware/auth.middleware.js";
import notificationRoutes from "../modules/notification/notification.router.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', authenticate, userRoutes);
router.use('/task', authenticate, taskRoutes);
router.use('/notification', authenticate, notificationRoutes);

export default router;