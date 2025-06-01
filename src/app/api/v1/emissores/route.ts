import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import type {
  EmissorCreateInput,
  EmissorSelect,
} from "~/server/lib/types/types";
import { emissorService } from "~/server/services/emissorService";

// /api/v1/emissores
export const GET = withAuth(
  async (): Promise<NextResponse<EmissorSelect[] | { message: string }>> => {
    try {
      const zonasEmissao = await emissorService.getAllEmissores();
      return NextResponse.json(zonasEmissao);
    } catch (error) {
      console.error("Failed to fetch emissores:", error);
      return NextResponse.json(
        { message: "Erro interno ao buscar emissores." },
        { status: 500 },
      );
    }
  },
);

export const POST = withAuth(
  async (
    request,
  ): Promise<NextResponse<EmissorSelect | { message: string }>> => {
    try {
      const body = (await request.json()) as EmissorCreateInput;
      const novaZonaEmissao = await emissorService.createEmissor(body);
      return NextResponse.json(novaZonaEmissao, { status: 201 });
    } catch (error) {
      console.error("Erro ao criar emissor:", error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Dados inválidos.", errors: error.errors },
          { status: 400 },
        );
      }

      if (error instanceof NotFoundErr) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return NextResponse.json(
            {
              message:
                "Já existe um emissor relacionado a essa zona de emissão.",
            },
            { status: 409 },
          );
        }
      }

      return NextResponse.json(
        { message: "Erro interno no servidor ao criar emissor." },
        { status: 500 },
      );
    }
  },
);
