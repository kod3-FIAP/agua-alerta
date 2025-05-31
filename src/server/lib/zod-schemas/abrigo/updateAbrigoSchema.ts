import z from "zod";

export const UpdateAbrigoSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional().nullable(),
  altitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});