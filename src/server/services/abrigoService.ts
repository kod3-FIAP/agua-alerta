import abrigoRepository from "~/server/repositories/abrigoRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateAbrigoSchema } from "~/server/lib/zod-schemas/abrigo/createAbrigoSchema";
import { UpdateAbrigoSchema } from "~/server/lib/zod-schemas/abrigo/updateAbrigoSchema";
import type { AbrigoCreateInput, AbrigoSelect, AbrigoUpdateInput } from "../lib/types/types";

export const abrigoService = {
  async getAbrigoById(idAbrigo: number): Promise<AbrigoSelect> {
    return abrigoRepository.findById(idAbrigo) as AbrigoSelect;
  },

  async getAllAbrigos(args?: Parameters<typeof abrigoRepository.findAll>[0]): Promise<AbrigoSelect[]>  {
    return abrigoRepository.findAll(args) as unknown as AbrigoSelect[];
  },

  async getAbrigosByZonaEmissaoId(idZonaEmissao: number) {
    return abrigoRepository.findByZonaEmissaoId(idZonaEmissao);
  },

  async createAbrigo(data: AbrigoCreateInput): Promise<AbrigoSelect> {
    const validatedData = CreateAbrigoSchema.parse(data);

    const zona = await zonaEmissaoRepository.findById(validatedData.idZonaEmissao);
    if (!zona) {
      throw new Error("Zona de Emissão não foi encontrada para o abrigo.");
    }

    return abrigoRepository.create(validatedData as unknown as AbrigoCreateInput) as AbrigoSelect;
  },

  async updateAbrigo(idAbrigo: number, data: AbrigoUpdateInput): Promise<AbrigoSelect> {
    const validatedData = UpdateAbrigoSchema.parse(data);

    const existingAbrigo = await abrigoRepository.findById(idAbrigo);
    if (!existingAbrigo) {
      throw new Error("Abrigo não foi encontrada");
    }

    return abrigoRepository.update(idAbrigo, validatedData) as AbrigoSelect;
  },

  async deleteAbrigo(idAbrigo: number) {
    return abrigoRepository.delete(idAbrigo);
  },
};