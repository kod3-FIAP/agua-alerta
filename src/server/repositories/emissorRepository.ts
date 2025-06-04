import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import type {
  EmissorCreateInput,
  EmissorUpdateInput,
} from "../lib/types/types";

const emissorRepository = {
  async findById(id: number) {
    return db.emissor.findUnique({
      where: { id },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async findAll(args?: Prisma.EmissorFindManyArgs) {
    return db.emissor.findMany({
      ...args,
      include: {
        zonaEmissao: args?.include?.zonaEmissao ?? false,
      },
    });
  },

  async findByZonaEmissaoId(idZonaEmissao: number) {
    return db.emissor.findMany({
      where: { idZonaEmissao },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async create(data: EmissorCreateInput) {
    return db.emissor.create({
      data,
    });
  },

  async update(id: number, data: EmissorUpdateInput) {
    return db.emissor.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return db.emissor.delete({
      where: { id },
    });
  },
};

export default emissorRepository;
