import { NextResponse } from "next/server";
import { z } from "zod";
import { withAuth } from "~/app/api/_utils/withAuth";
import { NotFoundErr } from "~/server/lib/errors/NotFound";
import type { ReceptorUpdateInput } from "~/server/lib/types/types";
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
      const zonaEmissao = await receptorService.getReceptorById(id);
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
      console.error(`Falha ao buscar receptor com id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao buscar receptor." },
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
      const body = (await request.json()) as ReceptorUpdateInput;
      const updatedZonaEmissao = await receptorService.updateReceptor(id, body);
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
      console.error(`Failed to update receptor with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao atualizar receptor." },
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
      await receptorService.deleteReceptor(id);
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
      console.error(`Failed to delete receptor with id ${idPath}:`, error);
      return NextResponse.json(
        { message: "Erro interno ao remover receptor." },
        { status: 500 },
      );
    }
  },
);
