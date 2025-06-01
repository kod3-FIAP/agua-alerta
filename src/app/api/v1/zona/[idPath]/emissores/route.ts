import { NextResponse } from 'next/server';
import { z } from 'zod';
import { NotFoundErr } from '~/server/lib/errors/NotFound';
import { parseId } from '~/server/lib/zod-schemas/id/idSchema';
import { emissorService } from '~/server/services/emissorService';

// /api/v1/zona/[id]/emissores
export async function GET(
  request: Request,
  { params }: { params: { idPath: string } }
) {
  try {
    let { idPath } = await params;
    let id = parseId(idPath);
    const zonaEmissao = await emissorService.getEmissoresByZonaEmissaoId(id);
    return NextResponse.json(zonaEmissao);

  } catch (error) {
    if (error instanceof NotFoundErr) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "ID em formato inválido", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error(`Falha ao buscar zona de emissão com id ${params.idPath}:`, error);
    return NextResponse.json({ message: "Erro interno ao buscar zona de emissão." }, { status: 500 });
  }
}