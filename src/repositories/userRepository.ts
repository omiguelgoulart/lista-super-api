import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient = prisma) {}

  async findAll() {
    return this.prismaClient.user.findMany();
  }

  async findById(id: string) {
    return this.prismaClient.user.findUnique({ 
      where: { id } 
    });
  }

  async findByEmail(email: string) {
    return this.prismaClient.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserInput) {
    return this.prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
      },
    });
  }

  async update(id: string, data: UpdateUserInput) {
    return this.prismaClient.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prismaClient.user.delete({
      where: { id },
    });
  }
}
