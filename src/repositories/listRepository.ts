import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import type { CreateListInput, UpdateListInput } from "../schemas/listSchema";

export class ListRepository {
    constructor(private readonly prismaClient: PrismaClient = prisma) {}

    async findAll(ownerId: string) {
        return this.prismaClient.list.findMany({
        where: { ownerId },
        include: {
            categories: true,
            _count: { select: { items: true } },
        },
        orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: string) {
        return this.prismaClient.list.findUnique({
        where: { id },
        include: {
            categories: { orderBy: { order: "asc" } },
            items: { orderBy: { order: "asc" } },
        },
        });
    }

    async create(data: CreateListInput & { ownerId: string }) {
        return this.prismaClient.list.create({
        data,
        });
    }

    async update(id: string, data: UpdateListInput) {
        return this.prismaClient.list.update({
        where: { id },
        data,
        });
    }

    async remove(id: string) {
        return this.prismaClient.list.delete({
        where: { id },
        });
    }

    async duplicate(id: string) {
        const original = await this.findById(id);
        if (!original) {
        throw new Error("Lista original não encontrada");
        }
        return this.prismaClient.list.create({
        data: {
            name: `${original.name} (cópia)`,
            icon: original.icon,
            color: original.color,
            ownerId: original.ownerId,
            categories: {
            create: original.categories.map((cat) => ({
                name: cat.name,
                color: cat.color,
                order: cat.order,
            })),
            },
        },
        });
    }

    async clearChecked(id: string) {
        return this.prismaClient.item.deleteMany({
        where: { listId: id, checked: true },
        });
    }
}