import type { Request, Response, NextFunction } from "express";
import type { UserService } from "../services/userService";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

type IdParam = { id: string };

export class UserController {
    constructor(private readonly service: UserService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
        const users = await this.service.findAll();
        res.json(users);
        } catch (error) {
        next(error);
        }
    }

    async findById(req: Request<IdParam>, res: Response, next: NextFunction) {
        try {
            const user = await this.service.findById(req.params.id);
            res.json(user);
            } catch (error) {
            next(error);
        }
    }

    async findByEmail(req: Request<{ email: string }>, res: Response, next: NextFunction) {
        try {
            const user = await this.service.findByEmail(req.params.email);
            res.json(user);
            } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createUserSchema.parse(req.body);
            const user = await this.service.create(data);
            res.status(201).json(user);
            } catch (error) {
            next(error);
        }
    }

    async update(req: Request<IdParam>, res: Response, next: NextFunction) {
        try {
            const data = updateUserSchema.parse(req.body);
            const user = await this.service.update(req.params.id, data);
            res.json(user);
            } catch (error) {
            next(error);
        }
    }

    async remove(req: Request<IdParam>, res: Response, next: NextFunction) {
        try {
            await this.service.remove(req.params.id);
            res.status(204).send();
            } catch (error) {
            next(error);
        }
    }
}