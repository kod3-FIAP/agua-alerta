import z from "zod";

export const UpdateReceptorSchema = z.object({
  descricao: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});
