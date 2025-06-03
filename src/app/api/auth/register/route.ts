import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: email.split("@")[0], // Use email prefix as default name
      },
    });

    if (result.error) {
      return NextResponse.json(
        { message: result.error.message || "Erro ao criar conta" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Conta criada com sucesso" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
