import type { CategoryRepository } from "../repositories/categoriesRepository";
import type { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";
import { AppError } from "../lib/AppError";

export class CategoryService {
    constructor(private readonly repository: CategoryRepository) {}

    async findAll(listId: string) {
        return this.repository.findAll(listId);
    }

    async findById(id: string) {
        const category = await this.repository.findById(id);
        if (!category) throw new AppError(404, "Categoria não encontrada");
        return category;
    }

    async create(data: CreateCategoryInput & { listId: string }) {
        return this.repository.create(data);
    }

    async update(id: string, data: UpdateCategoryInput) {
        await this.findById(id);
        return this.repository.update(id, data);
    }

    async remove(id: string) {
        await this.findById(id);
        return this.repository.remove(id);
    }
}
