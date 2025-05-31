import z from "zod";

export const CreateZonaEmissaoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório."),
  descricao: z.string().default(""),
});
