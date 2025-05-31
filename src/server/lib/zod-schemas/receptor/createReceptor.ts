import z from "zod";

export const CreateReceptorSchema = z.object({
  descricao: z.string().default(""),
  latitude: z.number(),
  longitude: z.number(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});

