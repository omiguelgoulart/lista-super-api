import type { ItemRepository } from "../repositories/itemsModel";
import type { CreateItemInput, UpdateItemInput } from "../schemas/itemSchema";
import { AppError } from "../lib/AppError";

export class ItemService {
    constructor(private readonly repository: ItemRepository) {}

    async findAll(listId: string) {
        return this.repository.findAll(listId);
    }

    async findById(id: string) {
        const item = await this.repository.findById(id);
        if (!item) throw new AppError(404, "Item não encontrado");
        return item;
    }

    async create(data: CreateItemInput & { listId: string }) {
        return this.repository.create(data);
    }

    async update(id: string, data: UpdateItemInput) {
        await this.findById(id);
        return this.repository.update(id, data);
    }

    async remove(id: string) {
        await this.findById(id);
        return this.repository.remove(id);
    }

    async checkAll(listId: string, checked: boolean) {
        return this.repository.checkAll(listId, checked);
    }
}
