import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import type { ZonaEmissaoCreateInput, ZonaEmissaoUpdateInput } from "../lib/types/types";

const zonaEmissaoRepository = {
  async findById(idZonaEmissao: number) {
    return db.zonaEmissao.findUnique({
      where: { idZonaEmissao },
      include: {
        abrigos: true,
        emissores: true,
        receptores: true,
      },
    });
  },

  async findAll(args?: Prisma.ZonaEmissaoFindManyArgs) {
    return db.zonaEmissao.findMany({
      ...args,
      include: {
        abrigos: args?.include?.abrigos ?? false,
        emissores: args?.include?.emissores ?? false,
        receptores: args?.include?.receptores ?? false,
      },
    });
  },

  async create(data: ZonaEmissaoCreateInput) {
    return db.zonaEmissao.create({
      data,
    }) 
  },

  async update(idZonaEmissao: number, data: ZonaEmissaoUpdateInput) {
    return db.zonaEmissao.update({
      where: { idZonaEmissao },
      data,
    }) 
  },

  async delete(idZonaEmissao: number) {
    return db.zonaEmissao.delete({
      where: { idZonaEmissao },
    });
  },
};

export default zonaEmissaoRepository;