import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import type {
  AbrigoCreateInput,
  AbrigoUpdateInput,
} from "~/server/lib/types/types";

const abrigoRepository = {
  async findById(idAbrigo: number) {
    return db.abrigo.findUnique({
      where: { idAbrigo },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async findAll(args?: Prisma.AbrigoFindManyArgs) {
    return db.abrigo.findMany({
      ...args,
      include: {
        zonaEmissao: args?.include?.zonaEmissao ?? false,
      },
    });
  },

  async findByZonaEmissaoId(idZonaEmissao: number) {
    return db.abrigo.findMany({
      where: { idZonaEmissao },
      include: {
        zonaEmissao: true,
      },
    });
  },

  async create(data: AbrigoCreateInput) {
    return db.abrigo.create({
      data,
    });
  },

  async update(idAbrigo: number, data: AbrigoUpdateInput) {
    return db.abrigo.update({
      where: { idAbrigo },
      data,
    });
  },

  async delete(idAbrigo: number) {
    return db.abrigo.delete({
      where: { idAbrigo },
    });
  },
};

export default abrigoRepository;
