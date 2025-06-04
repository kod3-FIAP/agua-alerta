import zonaEmissaoRepository from "~/server/repositories/zonaEmissaoRepository";
import { CreateZonaEmissaoSchema } from "~/server/lib/zod-schemas/zona-emissao/createZonaEmissao";
import { UpdateZonaEmissaoSchema } from "~/server/lib/zod-schemas/zona-emissao/updateZonaEmissao";
import type {
  ZonaEmissaoCreateInput,
  ZonaEmissaoSelect,
  ZonaEmissaoUpdateInput,
} from "../lib/types/types";
import { NotFoundErr } from "../lib/errors/NotFound";

export const zonaEmissaoService = {
  async getZonaEmissaoById(idZonaEmissao: number): Promise<ZonaEmissaoSelect> {
    const zona = await zonaEmissaoRepository.findById(idZonaEmissao);
    if (!zona) {
      throw new NotFoundErr("Zona de emissão não encontrada.");
    }
    return zona as unknown as ZonaEmissaoSelect;
  },

  async getAllZonasEmissao(
    args?: Parameters<typeof zonaEmissaoRepository.findAll>[0],
  ): Promise<ZonaEmissaoSelect[]> {
    return zonaEmissaoRepository.findAll(
      args,
    ) as unknown as ZonaEmissaoSelect[];
  },

  async createZonaEmissao(
    data: ZonaEmissaoCreateInput,
  ): Promise<ZonaEmissaoSelect> {
    const validatedData = CreateZonaEmissaoSchema.parse(data);
    return zonaEmissaoRepository.create(validatedData) as ZonaEmissaoSelect;
  },

  async updateZonaEmissao(
    idZonaEmissao: number,
    data: ZonaEmissaoUpdateInput,
  ): Promise<ZonaEmissaoSelect> {
    const validatedData = UpdateZonaEmissaoSchema.parse(data);

    const existingZona = await zonaEmissaoRepository.findById(idZonaEmissao);
    if (!existingZona) {
      throw new NotFoundErr("Zona de emissão não encontrada.");
    }

    return zonaEmissaoRepository.update(
      idZonaEmissao,
      validatedData as ZonaEmissaoUpdateInput,
    ) as ZonaEmissaoSelect;
  },

  async deleteZonaEmissao(idZonaEmissao: number) {
    const existingZona = await zonaEmissaoRepository.findById(idZonaEmissao);
    if (!existingZona) {
      throw new NotFoundErr("Zona de emissão não encontrada.");
    }
    return zonaEmissaoRepository.delete(idZonaEmissao);
  },
};
