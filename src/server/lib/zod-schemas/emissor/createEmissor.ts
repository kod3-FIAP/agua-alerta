import z from "zod";

export const CreateEmissorSchema = z
  .object({
    descricao: z.string().min(1, "Descrição é obrigatória"),
    latitude: z.number(),
    longitude: z.number(),
    valorAlerta: z.number(),
    valorEmergencia: z.number(),
    idZonaEmissao: z.number().int().positive("ID da Zona de Emissão inválido"),
  })
  .refine((data) => data.valorEmergencia > data.valorAlerta, {
    message: "Valor de Emergência deve ser maior que Valor de Alerta",
    path: ["valorEmergencia"],
  });
