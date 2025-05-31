import z from "zod";

export const UpdateEmissorSchema = z.object({
  descricao: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  valorAlerta: z.number().optional(),
  valorEmergencia: z.number().optional(),
});