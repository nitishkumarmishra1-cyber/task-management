import { Router } from "express";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { LoginUserSchema } from "./auth.dto.js";
import asyncHandler from "../../core/asyn-handler.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const authRoutes = Router();
const authService = new AuthService();
const controller = new AuthController(authService);

authRoutes.post(
    '/login',
    validate(LoginUserSchema),
    asyncHandler(controller.userLogin.bind(controller))
);

authRoutes.post(
    '/logout',
    authenticate,
    asyncHandler(controller.userLogout.bind(controller))
);

export default authRoutes;