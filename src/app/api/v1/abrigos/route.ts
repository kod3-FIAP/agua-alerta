import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import z from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import type { AbrigoCreateInput, AbrigoSelect } from "~/server/lib/types/types";
import { abrigoService } from "~/server/services/abrigoService";

export const GET = withAuth(
  async (): Promise<NextResponse<AbrigoSelect[] | { message: string }>> => {
    try {
      const zonasEmissao = await abrigoService.getAllAbrigos();
      return NextResponse.json(zonasEmissao);
    } catch (error) {
      console.error("Failed to fetch abrigos:", error);
      return NextResponse.json(
        { message: "Erro interno ao buscar abrigos." },
        { status: 500 },
      );
    }
  },
);

export const POST = withAuth(
  async (
    request,
  ): Promise<NextResponse<AbrigoSelect | { message: string }>> => {
    try {
      const body = (await request.json()) as AbrigoCreateInput;
      const novaZonaEmissao = await abrigoService.createAbrigo(body);
      return NextResponse.json(novaZonaEmissao, { status: 201 });
    } catch (error) {
      console.error("Erro ao criar abrigo:", error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Dados inválidos.", errors: error.errors },
          { status: 400 },
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return NextResponse.json(
            { message: "Já existe uma abrigo com este nome." },
            { status: 409 },
          );
        }
      }

      return NextResponse.json(
        { message: "Erro interno no servidor ao criar abrigo." },
        { status: 500 },
      );
    }
  },
);
