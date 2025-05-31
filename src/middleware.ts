import { NextRequest, NextResponse } from 'next/server';
import { auth } from '~/server/auth';

export async function middleware(request: NextRequest){
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "É necessário estar logado para efetuar o acesso." }, { status: 401 });
    }
}