import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import type {
  ReceptorCreateInput,
  ReceptorUpdateInput,
} from "../lib/types/types";

const receptorRepository = {
  async findById(id: number) {
    return db.receptor.findUnique({
      where: { id },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async findAll(args?: Prisma.ReceptorFindManyArgs) {
    return db.receptor.findMany({
      ...args,
      include: {
        zonaEmissao: args?.include?.zonaEmissao ?? false,
      },
    });
  },

  async findByZonaEmissaoId(idZonaEmissao: number) {
    return db.receptor.findMany({
      where: { idZonaEmissao },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async create(data: ReceptorCreateInput) {
    return db.receptor.create({
      data,
    });
  },

  async update(id: number, data: ReceptorUpdateInput) {
    return db.receptor.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return db.receptor.delete({
      where: { id },
    });
  },
};

export default receptorRepository;
