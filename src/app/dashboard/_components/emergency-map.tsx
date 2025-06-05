"use client";

import { useQuery } from "@tanstack/react-query";
import { MapClient } from "./map-client";

type EmissorWithZona = {
  id: number;
  descricao: string;
  latitude: number;
  longitude: number;
  valorAlerta: number;
  valorEmergencia: number;
  zonaEmissao: {
    nome: string;
    descricao: string;
  };
};

type ReceptorWithZona = {
  id: number;
  descricao: string;
  latitude: number;
  longitude: number;
  zonaEmissao: {
    nome: string;
    descricao: string;
  };
};

type AbrigoWithZona = {
  idAbrigo: number;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  zonaEmissao: {
    nome: string;
    descricao: string;
  };
};

type MapData = {
  emissores: EmissorWithZona[];
  receptores: ReceptorWithZona[];
  abrigos: AbrigoWithZona[];
};

async function fetchMapData(): Promise<MapData> {
  const response = await fetch("/api/v1/map-data");
  if (!response.ok) {
    throw new Error("Failed to fetch map data");
  }
  return response.json() as Promise<MapData>;
}

export function EmergencyMap() {
  const { data, isLoading } = useQuery<MapData>({
    queryKey: ["mapData"],
    queryFn: fetchMapData,
  });

  if (isLoading || !data) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Mapa de Emissores, Receptores e Abrigos
        </h2>
        <div className="flex h-[600px] w-full items-center justify-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Mapa de Emissores, Receptores e Abrigos
      </h2>
      <div className="h-[600px] w-full">
        <MapClient
          emissores={data.emissores}
          receptores={data.receptores}
          abrigos={data.abrigos}
        />
      </div>
    </div>
  );
}
