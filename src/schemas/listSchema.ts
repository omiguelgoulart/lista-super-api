import { z } from "zod";

export const createListSchema = z.object({
    name: z.string().min(1, "Nome da lista é obrigatório"),
    icon: z.string().optional(),
    color: z.string().optional(),
});

export const updateListSchema = z.object({
    name: z.string().min(1, "Nome da lista é obrigatório").optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
});

export type CreateListInput = z.infer<typeof createListSchema>;
export type UpdateListInput = z.infer<typeof updateListSchema>;