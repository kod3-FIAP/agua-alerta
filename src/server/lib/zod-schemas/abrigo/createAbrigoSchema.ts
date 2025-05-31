import z from "zod";

export const CreateAbrigoSchema = z.object({
  nome: z.string().min(1, "Nome is required"),
  descricao: z.string().default(""),
  altitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});