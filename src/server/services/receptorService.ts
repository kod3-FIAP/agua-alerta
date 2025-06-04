import receptorRepository from "~/server/repositories/receptorRepository";
import zonaEmissaoRepository from "../repositories/zonaEmissaoRepository";
import { CreateReceptorSchema } from "~/server/lib/zod-schemas/receptor/createReceptor";
import { UpdateReceptorSchema } from "~/server/lib/zod-schemas/receptor/updateReceptor";
import type {
  ReceptorCreateInput,
  ReceptorSelect,
  ReceptorUpdateInput,
} from "../lib/types/types";
import { NotFoundErr } from "../lib/errors/NotFound";

export const receptorService = {
  async getReceptorById(id: number): Promise<ReceptorSelect> {
    const receptor = await receptorRepository.findById(id);

    if (!receptor) {
      throw new NotFoundErr("Receptor não foi encontrado.");
    }

    return receptor as unknown as ReceptorSelect;
  },

  async getAllReceptores(
    args?: Parameters<typeof receptorRepository.findAll>[0],
  ): Promise<ReceptorSelect[]> {
    return receptorRepository.findAll(args) as unknown as Promise<
      ReceptorSelect[]
    >;
  },

  async getReceptoresByZonaEmissaoId(
    idZonaEmissao: number,
  ): Promise<ReceptorSelect[]> {
    return receptorRepository.findByZonaEmissaoId(
      idZonaEmissao,
    ) as unknown as ReceptorSelect[];
  },

  async createReceptor(data: ReceptorCreateInput): Promise<ReceptorSelect> {
    const validatedData = CreateReceptorSchema.parse(data);

    const zona = await zonaEmissaoRepository.findById(
      validatedData.idZonaEmissao,
    );
    if (!zona) {
      throw new NotFoundErr("Zona de Emissão é inexistente.");
    }

    return receptorRepository.create(
      validatedData as unknown as ReceptorCreateInput,
    ) as ReceptorSelect;
  },

  async updateReceptor(
    id: number,
    data: ReceptorUpdateInput,
  ): Promise<ReceptorSelect> {
    const validatedData = UpdateReceptorSchema.parse(data);

    if (validatedData.idZonaEmissao) {
      const zona = await zonaEmissaoRepository.findById(
        validatedData.idZonaEmissao,
      );
      if (!zona) {
        throw new NotFoundErr("Zona de Emissão é inexistente.");
      }
    }

    const existingReceptor = await receptorRepository.findById(id);
    if (!existingReceptor) {
      throw new NotFoundErr("Receptor não foi encontrado");
    }

    return receptorRepository.update(id, validatedData) as ReceptorSelect;
  },

  async deleteReceptor(id: number) {
    const receptor = await receptorRepository.findById(id);

    if (!receptor) {
      throw new NotFoundErr("Receptor não foi encontrado.");
    }

    return receptorRepository.delete(id);
  },
};
