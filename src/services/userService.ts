import bcrypt from "bcrypt";
import type { UserRepository } from "../repositories/userRepository";
import type { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";

export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        return this.repository.findById(id);
    }

    async findByEmail(email: string) {
        return this.repository.findByEmail(email);
    }

    async create(data: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.repository.create({
        ...data,
        password: hashedPassword,
        });
    }

    async update(id: string, data: UpdateUserInput) {
        await this.findById(id);

        if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
        }

        return this.repository.update(id, data);
    }

    async remove(id: string) {
        return this.repository.remove(id);
    }
}
