import type { Request, Response, NextFunction } from "express";
import type { ItemService } from "../services/itemsService";
import { createItemSchema, updateItemSchema } from "../schemas/itemSchema";
import { z } from "zod";

export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await this.itemService.findAll(req.params.listId);
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await this.itemService.findById(req.params.id);
            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createItemSchema.parse(req.body);
            const item = await this.itemService.create({ ...data, listId: req.params.listId });
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = updateItemSchema.parse(req.body);
            const item = await this.itemService.update(req.params.id, data);
            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await this.itemService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async checkAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { checked } = z.object({ checked: z.boolean() }).parse(req.body);
            await this.itemService.checkAll(req.params.listId, checked);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
