import { NextResponse } from 'next/server';
import { zonaEmissaoService } from '~/server/services/zonaEmissaoService';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import type { ZonaEmissaoCreateInput, ZonaEmissaoSelect } from '~/server/lib/types/types';

export async function GET(request: Request): Promise<NextResponse<ZonaEmissaoSelect[] | { message: string }>> {
  try {
    const zonasEmissao = await zonaEmissaoService.getAllZonasEmissao();
    return NextResponse.json(zonasEmissao);
  } catch (error) {
    console.error("Failed to fetch zonas de emissão:", error);
    return NextResponse.json(
      { message: "Erro interno ao buscar Zonas de Emissão." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse<ZonaEmissaoSelect | { message: string }>> {
  try {
    const body: ZonaEmissaoCreateInput = await request.json();
    const novaZonaEmissao = await zonaEmissaoService.createZonaEmissao(body);
    return NextResponse.json(novaZonaEmissao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar Zona de Emissão:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Dados inválidos.", errors: error.errors }, { status: 400 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: "Já existe uma Zona de Emissão com este nome." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: "Erro interno ao criar a Zona de Emissão." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Erro interno no servidor ao criar a Zona de Emissão." }, { status: 500 });
  }
}