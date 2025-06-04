import z from "zod";

export const UpdateAbrigoSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});
