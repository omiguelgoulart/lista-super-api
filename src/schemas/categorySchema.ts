import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
    color: z.string().optional(),
    order: z.number().int().default(0),
});

export const updateCategorySchema = z.object({
    name: z.string().min(1).optional(),
    color: z.string().optional(),
    order: z.number().int().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
