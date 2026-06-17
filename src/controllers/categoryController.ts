import type { Request, Response, NextFunction } from "express";
import type { CategoryService } from "../services/categoriesService";
import { createCategorySchema, updateCategorySchema } from "../schemas/categorySchema";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.findAll(req.params.listId);
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await this.categoryService.findById(req.params.id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createCategorySchema.parse(req.body);
            const category = await this.categoryService.create({ ...data, listId: req.params.listId });
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = updateCategorySchema.parse(req.body);
            const category = await this.categoryService.update(req.params.id, data);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await this.categoryService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
