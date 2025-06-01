import z from "zod";

const idSchema = z.string().refine((val) => !isNaN(parseInt(val, 10)), {
  message: "ID deve ser um número",
}).transform((val) => parseInt(val, 10));


export function parseId(id: string) {
  const result = idSchema.safeParse(id);
  if (!result.success) {
    throw new z.ZodError([
      {
        path: ['id'],
        message: result.error.errors[0].message,
        code: z.ZodIssueCode.custom,
      }
    ]);
  }
  return result.data;
}