import { db } from "~/server/db";
import { MapClient } from "./map-client";

export async function EmergencyMap() {
  // Fetch all data from database
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

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Mapa de Emissores, Receptores e Abrigos
      </h2>
      <div className="h-[600px] w-full">
        <MapClient
          emissores={emissores}
          receptores={receptores}
          abrigos={abrigos}
        />
      </div>
    </div>
  );
}
