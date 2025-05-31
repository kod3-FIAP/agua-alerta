import abrigoRepository from "~/server/repositories/abrigoRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateAbrigoSchema } from "~/server/lib/zod-schemas/abrigo/createAbrigoSchema";
import { UpdateAbrigoSchema } from "~/server/lib/zod-schemas/abrigo/updateAbrigoSchema";
import type { AbrigoCreateInput, AbrigoUpdateInput } from "../lib/types/types";

export const abrigoService = {
  async getAbrigoById(idAbrigo: number) {
    return abrigoRepository.findById(idAbrigo);
  },

  async getAllAbrigos(args?: Parameters<typeof abrigoRepository.findAll>[0]) {
    return abrigoRepository.findAll(args);
  },

  async getAbrigosByZonaEmissaoId(idZonaEmissao: number) {
    return abrigoRepository.findByZonaEmissaoId(idZonaEmissao);
  },

  async createAbrigo(data: AbrigoCreateInput) {
    const validatedData = CreateAbrigoSchema.parse(data);

    const zona = await zonaEmissaoRepository.findById(validatedData.idZonaEmissao);
    if (!zona) {
      throw new Error("Zona de Emissão não foi encontrada para o abrigo.");
    }

    return abrigoRepository.create(validatedData as unknown as AbrigoCreateInput);
  },

  async updateAbrigo(idAbrigo: number, data: AbrigoUpdateInput) {
    const validatedData = UpdateAbrigoSchema.parse(data);

    const existingAbrigo = await abrigoRepository.findById(idAbrigo);
    if (!existingAbrigo) {
      throw new Error("Abrigo não foi encontrada");
    }

    return abrigoRepository.update(idAbrigo, validatedData);
  },

  async deleteAbrigo(idAbrigo: number) {
    return abrigoRepository.delete(idAbrigo);
  },
};