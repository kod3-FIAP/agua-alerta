import emissorRepository from "~/server/repositories/emissorRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateEmissorSchema } from "~/server/lib/zod-schemas/emissor/createEmissor";
import { UpdateEmissorSchema } from "~/server/lib/zod-schemas/emissor/updateEmissor";
import type { EmissorCreateInput, EmissorUpdateInput } from "../lib/types/types";


export const emissorService = {
  async getEmissorById(id: number) {
    return emissorRepository.findById(id);
  },

  async getAllEmissores(args?: Parameters<typeof emissorRepository.findAll>[0]) {
    return emissorRepository.findAll(args);
  },

  async getEmissoresByZonaEmissaoId(idZonaEmissao: number) {
    return emissorRepository.findByZonaEmissaoId(idZonaEmissao);
  },

  async createEmissor(data: EmissorCreateInput) {
    const validatedData = CreateEmissorSchema.parse(data);

    const zona = await zonaEmissaoRepository.findById(validatedData.idZonaEmissao);
    if (!zona) {
      throw new Error("Zona de Emissão não foi encontrada para o emissor.");
    }

    if (
      validatedData.valorAlerta != null &&
      validatedData.valorEmergencia != null &&
      validatedData.valorEmergencia <= validatedData.valorAlerta
    ) {
      throw new Error("Valor de Emergência must be greater than Valor de Alerta.");
    }

    return emissorRepository.create(validatedData as unknown as EmissorCreateInput);
  },

  async updateEmissor(id: number, data: EmissorUpdateInput) {
    const validatedData = UpdateEmissorSchema.parse(data);

    const existingEmissor = await emissorRepository.findById(id);
    if (!existingEmissor) {
      throw new Error("Emissor não foi encontrada");
    }
    return emissorRepository.update(id, validatedData);
  },

  async deleteEmissor(id: number) {
    return emissorRepository.delete(id);
  },
};