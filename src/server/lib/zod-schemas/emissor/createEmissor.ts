import z from "zod";

export const CreateEmissorSchema = z.object({
  descricao: z.string().default(""),
  latitude: z.number(),
  longitude: z.number(),
  valorAlerta: z.number(),
  valorEmergencia: z.number(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});

