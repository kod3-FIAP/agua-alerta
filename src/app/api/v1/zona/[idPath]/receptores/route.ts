import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import { parseId } from "~/server/lib/zod-schemas/id/idSchema";
import { receptorService } from "~/server/services/receptorService";

export const GET = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      const zonaEmissao =
        await receptorService.getReceptoresByZonaEmissaoId(id);
      return NextResponse.json(zonaEmissao);
    } catch (error) {
      if (error instanceof NotFoundErr) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: "ID em formato inválido",
            errors: error.flatten().fieldErrors,
          },
          { status: 400 },
        );
      }
      console.error(`Falha ao buscar zona de emissão com id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao buscar zona de emissão." },
        { status: 500 },
      );
    }
  },
);
