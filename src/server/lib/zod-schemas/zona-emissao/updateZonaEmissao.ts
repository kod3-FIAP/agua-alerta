import z from "zod";

export const UpdateZonaEmissaoSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
});
