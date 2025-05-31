import z from "zod";

export const CreateEmissorSchema = z.object({
  descricao: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  valorAlerta: z.number().optional().nullable(),
  valorEmergencia: z.number().optional().nullable(),
  idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
});

