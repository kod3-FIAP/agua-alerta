import z from "zod";

export const CreateAbrigoSchema = z.object({
  nome: z.string().min(1, "Nome is required"),
  descricao: z.string().default(""),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});
