import emissorRepository from "~/server/repositories/emissorRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateEmissorSchema } from "~/server/lib/zod-schemas/emissor/createEmissor";
import { UpdateEmissorSchema } from "~/server/lib/zod-schemas/emissor/updateEmissor";
import type { EmissorCreateInput, EmissorSelect, EmissorUpdateInput } from "../lib/types/types";


export const emissorService = {
  async getEmissorById(id: number): Promise<EmissorSelect> {
    return emissorRepository.findById(id) as EmissorSelect;
  },

  async getAllEmissores(args?: Parameters<typeof emissorRepository.findAll>[0]): Promise<EmissorSelect[]> {
    return emissorRepository.findAll(args) as unknown as EmissorSelect[];
  },

  async getEmissoresByZonaEmissaoId(idZonaEmissao: number) {
    return emissorRepository.findByZonaEmissaoId(idZonaEmissao);
  },

  async createEmissor(data: EmissorCreateInput): Promise<EmissorSelect> {
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

    return emissorRepository.create(validatedData as unknown as EmissorCreateInput) as EmissorSelect;
  },

  async updateEmissor(id: number, data: EmissorUpdateInput): Promise<EmissorSelect> {
    const validatedData = UpdateEmissorSchema.parse(data);

    const existingEmissor = await emissorRepository.findById(id);
    if (!existingEmissor) {
      throw new Error("Emissor não foi encontrada");
    }
    return emissorRepository.update(id, validatedData) as EmissorSelect;
  },

  async deleteEmissor(id: number) {
    return emissorRepository.delete(id);
  },
};