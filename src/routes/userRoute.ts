import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";

const userRouter = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

userRouter.get("/", (req, res, next) => controller.findAll(req, res, next));
userRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
userRouter.get("/:email", (req, res, next) => controller.findByEmail(req, res, next));
userRouter.post("/", (req, res, next) => controller.create(req, res, next));
userRouter.put("/:id", (req, res, next) => controller.update(req, res, next));
userRouter.delete("/:id", (req, res, next) => controller.remove(req, res, next));

export { userRouter };