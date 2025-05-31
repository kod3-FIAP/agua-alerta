import { NextResponse } from 'next/server';
import { zonaEmissaoService } from '~/server/services/zonaEmissaoService';
import { z } from 'zod';
import { NotFoundErr } from '~/server/lib/errors/NotFound';
import { parseId } from '~/server/lib/zod-schemas/id/idSchema';


export async function GET(
  request: Request,
  { params }: { params: { idPath: string } }
) {
  try {

        let { idPath } = await params;
    let id = parseId(idPath);
    const zonaEmissao = await zonaEmissaoService.getZonaEmissaoById(id);
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

export async function PUT(
  request: Request,
  { params }: { params: { idPath: string } }
) {
  try {

        let { idPath } = await params;
    let id = parseId(idPath);
    const body = await request.json();
    const updatedZonaEmissao = await zonaEmissaoService.updateZonaEmissao(id, body);
    return NextResponse.json(updatedZonaEmissao);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "ID em formato inválido", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    if (error instanceof NotFoundErr) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    console.error(`Failed to update zona de emissão with id ${params.idPath}:`, error);
    return NextResponse.json({ message: "Erro interno ao atualizar zona de emissão." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { idPath: string } }
) {
  try {

        let { idPath } = await params;
    let id = parseId(idPath);
    await zonaEmissaoService.deleteZonaEmissao(id);
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "ID em formato inválido", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    if (error instanceof NotFoundErr) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    console.error(`Failed to delete zona de emissão with id ${params.idPath}:`, error);
    return NextResponse.json({ message: "Erro interno ao remover zona de emissão." }, { status: 500 });
  }
}
