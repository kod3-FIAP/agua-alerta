"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="text-gray-600">Carregando mapa...</div>
    </div>
  ),
});

export type EmissorWithZona = {
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

export type ReceptorWithZona = {
  id: number;
  descricao: string;
  latitude: number;
  longitude: number;
  zonaEmissao: {
    nome: string;
    descricao: string;
  };
};

export type AbrigoWithZona = {
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

interface MapClientProps {
  emissores: EmissorWithZona[];
  receptores: ReceptorWithZona[];
  abrigos: AbrigoWithZona[];
}

export function MapClient(props: MapClientProps) {
  return (
    <div className="h-full w-full">
      <LeafletMap {...props} />
    </div>
  );
}
