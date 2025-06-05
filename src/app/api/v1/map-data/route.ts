import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withAuth } from "~/app/api/_utils/withAuth";

export const GET = withAuth(async () => {
  try {
    const [emissores, receptores, abrigos] = await Promise.all([
      db.emissor.findMany({
        include: {
          zonaEmissao: true,
        },
      }),
      db.receptor.findMany({
        include: {
          zonaEmissao: true,
        },
      }),
      db.abrigo.findMany({
        include: {
          zonaEmissao: true,
        },
      }),
    ]);

    return NextResponse.json({
      emissores,
      receptores,
      abrigos,
    });
  } catch (error) {
    console.error("Failed to fetch map data:", error);
    return NextResponse.json(
      { message: "Erro interno ao buscar dados do mapa." },
      { status: 500 },
    );
  }
});
