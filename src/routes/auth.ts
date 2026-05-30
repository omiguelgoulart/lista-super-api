import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/userRepository";

const authRouter = Router();

const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

authRouter.post("/login", (req, res, next) => controller.login(req, res, next));
authRouter.post("/refresh", (req, res, next) => controller.refresh(req, res, next));

export { authRouter };
