import { z } from "zod";

export const createItemSchema = z.object({
    name: z.string().min(1, "Nome do item é obrigatório"),
    quantity: z.number().positive().default(1),
    unit: z.string().optional(),
    notes: z.string().optional(),
    order: z.number().int().default(0),
    categoryId: z.string().uuid().optional(),
});

export const updateItemSchema = z.object({
    name: z.string().min(1).optional(),
    quantity: z.number().positive().optional(),
    unit: z.string().optional(),
    notes: z.string().optional(),
    order: z.number().int().optional(),
    checked: z.boolean().optional(),
    categoryId: z.string().uuid().nullable().optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
