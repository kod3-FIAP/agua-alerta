import { NextResponse } from "next/server";
import { withAuth } from "~/app/api/_utils/withAuth";
import { zonaEmissaoService } from "~/server/services/zonaEmissaoService";
import { z } from "zod";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import { parseId } from "~/server/lib/zod-schemas/id/idSchema";
import type { ZonaEmissaoUpdateInput } from "~/server/lib/types/types";

export const GET = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      const zonaEmissao = await zonaEmissaoService.getZonaEmissaoById(id);
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

export const PUT = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      const body = (await request.json()) as ZonaEmissaoUpdateInput;
      const updatedZonaEmissao = await zonaEmissaoService.updateZonaEmissao(
        id,
        body,
      );
      return NextResponse.json(updatedZonaEmissao);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: "ID em formato inválido",
            errors: error.flatten().fieldErrors,
          },
          { status: 400 },
        );
      }
      if (error instanceof NotFoundErr) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }
      console.error(
        `Failed to update zona de emissão with id ${idPath}:`,
        error,
      );
      return NextResponse.json(
        { message: "Erro interno ao atualizar zona de emissão." },
        { status: 500 },
      );
    }
  },
);

export const DELETE = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      await zonaEmissaoService.deleteZonaEmissao(id);
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: "ID em formato inválido",
            errors: error.flatten().fieldErrors,
          },
          { status: 400 },
        );
      }
      if (error instanceof NotFoundErr) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }
      console.error(
        `Failed to delete zona de emissão with id ${idPath}:`,
        error,
      );
      return NextResponse.json(
        { message: "Erro interno ao remover zona de emissão." },
        { status: 500 },
      );
    }
  },
);
