import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";

export class CategoryRepository {
    constructor(private readonly prismaClient: PrismaClient = prisma) {}

    async findAll(listId: string) {
        return this.prismaClient.category.findMany({
            where: { listId },
            orderBy: { order: "asc" },
        });
    }

    async findById(id: string) {
        return this.prismaClient.category.findUnique({ where: { id } });
    }

    async create(data: CreateCategoryInput & { listId: string }) {
        return this.prismaClient.category.create({ data });
    }

    async update(id: string, data: UpdateCategoryInput) {
        return this.prismaClient.category.update({ where: { id }, data });
    }

    async remove(id: string) {
        return this.prismaClient.category.delete({ where: { id } });
    }
}
