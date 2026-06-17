import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import type { CreateItemInput, UpdateItemInput } from "../schemas/itemSchema";

export class ItemRepository {
    constructor(private readonly prismaClient: PrismaClient = prisma) {}

    async findAll(listId: string) {
        return this.prismaClient.item.findMany({
            where: { listId },
            orderBy: { order: "asc" },
        });
    }

    async findById(id: string) {
        return this.prismaClient.item.findUnique({ where: { id } });
    }

    async create(data: CreateItemInput & { listId: string }) {
        return this.prismaClient.item.create({ data });
    }

    async update(id: string, data: UpdateItemInput) {
        return this.prismaClient.item.update({ where: { id }, data });
    }

    async remove(id: string) {
        return this.prismaClient.item.delete({ where: { id } });
    }

    async checkAll(listId: string, checked: boolean) {
        return this.prismaClient.item.updateMany({
            where: { listId },
            data: { checked },
        });
    }
}
