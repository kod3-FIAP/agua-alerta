import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import type { AbrigoUpdateInput } from "~/server/lib/types/types";
import { parseId } from "~/server/lib/zod-schemas/id/idSchema";
import { abrigoService } from "~/server/services/abrigoService";

// api/v1/abrigos/[id]
export const GET = withAuth(
  async (
    request: Request,
    { params }: { params: Promise<{ idPath: string }> },
  ) => {
    const { idPath } = await params;
    try {
      const id = parseId(idPath);
      const zonaEmissao = await abrigoService.getAbrigoById(id);
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
      console.error(`Falha ao buscar abrigo com id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao buscar abrigo." },
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
      const body = (await request.json()) as AbrigoUpdateInput;
      const updatedZonaEmissao = await abrigoService.updateAbrigo(id, body);
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
      console.error(`Failed to update abrigo with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao atualizar abrigo." },
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
      await abrigoService.deleteAbrigo(id);
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
      console.error(`Failed to delete abrigo with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao remover abrigo." },
        { status: 500 },
      );
    }
  },
);
