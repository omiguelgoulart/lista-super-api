import type { Request, Response, NextFunction } from "express";
import type { ListService } from "../services/listService";
import { createListSchema, updateListSchema } from "../schemas/listSchema";

export class ListController {
    constructor(private readonly listService: ListService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { ownerId } = req.query;
            const lists = await this.listService.findAll(ownerId as string | undefined);
            res.json(lists);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const list = await this.listService.findById(req.params.id);
            res.json(list);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createListSchema.parse(req.body);
            const newList = await this.listService.create(data);
            res.status(201).json(newList);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = updateListSchema.parse(req.body);
            const updatedList = await this.listService.update(req.params.id, data);
            res.json(updatedList);
        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await this.listService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async duplicate(req: Request, res: Response, next: NextFunction) {
        try {
            const duplicatedList = await this.listService.duplicate(req.params.id);
            res.status(201).json(duplicatedList);
        } catch (error) {
            next(error);
        }
    }

    async clearChecked(req: Request, res: Response, next: NextFunction) {
        try {
            await this.listService.clearChecked(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
