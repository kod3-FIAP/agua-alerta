import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import type { EmissorUpdateInput } from "~/server/lib/types/types";
import { parseId } from "~/server/lib/zod-schemas/id/idSchema";
import { emissorService } from "~/server/services/emissorService";

// /api/v1/emissores/[id]
export const GET = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      const zonaEmissao = await emissorService.getEmissorById(id);
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
      console.error(`Falha ao buscar emissor com id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao buscar emissor." },
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
      const body = (await request.json()) as EmissorUpdateInput;
      const updatedZonaEmissao = await emissorService.updateEmissor(id, body);
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
      console.error(`Failed to update emissor with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao atualizar emissor." },
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
      await emissorService.deleteEmissor(id);

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
      console.error(`Failed to delete emissor with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao remover emissor." },
        { status: 500 },
      );
    }
  },
);
