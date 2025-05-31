import z from "zod";

export const CreateEmissorSchema = z.object({
  descricao: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  valorAlerta: z.number().optional(),
  valorEmergencia: z.number().optional(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});

