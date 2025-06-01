import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { ReceptorCreateInput, ReceptorSelect } from '~/server/lib/types/types';
import { receptorService } from '~/server/services/receptorService';
import { NotFoundErr } from '~/server/lib/errors/NotFound';

export async function GET(request: Request): Promise<NextResponse<ReceptorSelect[] | { message: string }>> {
    try {
        const zonasEmissao = await receptorService.getAllReceptores();
        return NextResponse.json(zonasEmissao);
    } catch (error) {
        console.error("Failed to fetch zonas de emissão:", error);
        return NextResponse.json(
            { message: "Erro interno ao buscar Zonas de Emissão." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request): Promise<NextResponse<ReceptorSelect | { message: string }>> {
    try {
        const body: ReceptorCreateInput = await request.json();
        const novaZonaEmissao = await receptorService.createReceptor(body);
        return NextResponse.json(novaZonaEmissao, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar Receptor:", error);

        if (error instanceof NotFoundErr) {
            return NextResponse.json({ message: error.message }, { status: 404 });
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Dados inválidos.", errors: error.errors }, { status: 400 });
        }

        return NextResponse.json({ message: "Erro interno no servidor ao criar a Receptor." }, { status: 500 });
    }
}