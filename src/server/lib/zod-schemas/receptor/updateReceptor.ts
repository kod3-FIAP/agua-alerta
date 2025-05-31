import z, { optional } from "zod";

export const UpdateReceptorSchema = z.object({
  descricao: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  idZonaEmissao: z.number().positive().optional()
});
