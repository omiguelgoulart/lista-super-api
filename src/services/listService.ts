import type { ListRepository } from "../repositories/listRepository";
import type { CreateListInput, UpdateListInput } from "../schemas/listSchema";

export class ListService {
    constructor(private readonly repository: ListRepository) {} 

    async findAll(ownerId?: string) {
        return this.repository.findAll(ownerId);
    }

    async findById(id: string) {
        const list = await this.repository.findById(id);
        if (!list) {
            throw new Error("Lista não encontrada");
        }
        return list;
    }

    async create(data: CreateListInput) {
        return this.repository.create(data);
    }

    async update(id: string, data: UpdateListInput) {
        await this.findById(id);
        return this.repository.update(id, data);
    }

    async remove(id: string) {
        await this.findById(id);
        return this.repository.remove(id);
    }

    async duplicate(id: string) {
        await this.findById(id);
        return this.repository.duplicate(id);
    }

    async clearChecked(id: string) {
        await this.findById(id);
        return this.repository.clearChecked(id);
    }
}