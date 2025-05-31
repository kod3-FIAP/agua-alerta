import receptorRepository from "~/server/repositories/receptorRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateReceptorSchema } from "~/server/lib/zod-schemas/receptor/createReceptor";
import { UpdateReceptorSchema } from "~/server/lib/zod-schemas/receptor/updateReceptor";
import type { ReceptorCreateInput, ReceptorUpdateInput } from "../lib/types/types";

export const receptorService = {
  async getReceptorById(id: number) {
    return receptorRepository.findById(id);
  },

  async getAllReceptores(args?: Parameters<typeof receptorRepository.findAll>[0]) {
    return receptorRepository.findAll(args);
  },

  async getReceptoresByZonaEmissaoId(idZonaEmissao: number) {
    return receptorRepository.findByZonaEmissaoId(idZonaEmissao);
  },

  async createReceptor(data: ReceptorCreateInput) {
    const validatedData = CreateReceptorSchema.parse(data);

    const zona = await zonaEmissaoRepository.findById(validatedData.idZonaEmissao);
    if (!zona) {
      throw new Error("Zona de Emissão não foi encontrada para o receptor.");
    }

    return receptorRepository.create(validatedData as unknown as ReceptorCreateInput);
  },

  async updateReceptor(id: number, data: ReceptorUpdateInput) {
    const validatedData = UpdateReceptorSchema.parse(data);

    const existingReceptor = await receptorRepository.findById(id);
    if (!existingReceptor) {
      throw new Error("Receptor não foi encontrada");
    }

    return receptorRepository.update(id, validatedData);
  },

  async deleteReceptor(id: number) {
    return receptorRepository.delete(id);
  },
};