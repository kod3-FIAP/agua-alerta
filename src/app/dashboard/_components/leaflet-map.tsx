import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const emissorIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#ef4444"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <circle cx="12" cy="12" r="3" fill="#ef4444"/>
    </svg>
  `),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: "emissor-marker",
});

const receptorIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#3b82f6"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <rect x="9" y="9" width="6" height="6" fill="#3b82f6"/>
    </svg>
  `),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: "receptor-marker",
});

const abrigoIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#22c55e"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <polygon points="12,8 16,14 8,14" fill="#22c55e"/>
    </svg>
  `),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: "abrigo-marker",
});

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

interface LeafletMapProps {
  emissores: EmissorWithZona[];
  receptores: ReceptorWithZona[];
  abrigos: AbrigoWithZona[];
}

type ErrorResponse = {
  message: string;
};

type MarkerType = "emissor" | "receptor" | "abrigo";

interface MapMarkerProps {
  type: MarkerType;
  position: [number, number];
  icon: L.Icon;
  data: EmissorWithZona | ReceptorWithZona | AbrigoWithZona;
  onDelete: () => void;
}

function MapMarker({ type, position, icon, data, onDelete }: MapMarkerProps) {
  let title, color, extra;
  if (type === "emissor") {
    title = "📡 Emissor";
    color = "text-red-600";
    extra = (
      <div className="mt-2 text-xs">
        <p>⚠️ Alerta: {(data as EmissorWithZona).valorAlerta}</p>
        <p>🚨 Emergência: {(data as EmissorWithZona).valorEmergencia}</p>
      </div>
    );
  } else if (type === "receptor") {
    title = "📻 Receptor";
    color = "text-blue-600";
    extra = null;
  } else {
    title = `🏠 ${(data as AbrigoWithZona).nome}`;
    color = "text-green-600";
    extra = null;
  }

  return (
    <Marker position={position} icon={icon}>
      <Popup autoPan={true} closeButton={true} closeOnClick={false}>
        <div className="p-2">
          <h3 className={`font-bold ${color}`}>{title}</h3>
          <p className="text-sm">{"descricao" in data ? data.descricao : ""}</p>
          <p className="text-xs text-gray-600">Zona: {data.zonaEmissao.nome}</p>
          {extra}
          <Button
            variant="destructive"
            size="sm"
            className="mt-2 w-full"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Remover
          </Button>
        </div>
      </Popup>
    </Marker>
  );
}

export default function LeafletMap({
  emissores,
  receptores,
  abrigos,
}: LeafletMapProps) {
  const queryClient = useQueryClient();

  const deleteEmissor = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/v1/emissores/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Emissor removido com sucesso");
      void queryClient.invalidateQueries({ queryKey: ["mapData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteReceptor = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/v1/receptores/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Receptor removido com sucesso");
      void queryClient.invalidateQueries({ queryKey: ["mapData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteAbrigo = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/v1/abrigos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Abrigo removido com sucesso");
      void queryClient.invalidateQueries({ queryKey: ["mapData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {emissores.map((emissor) => (
          <MapMarker
            key={`emissor-${emissor.id}`}
            type="emissor"
            position={[emissor.latitude, emissor.longitude]}
            icon={emissorIcon}
            data={emissor}
            onDelete={() => deleteEmissor.mutate(emissor.id)}
          />
        ))}

        {receptores.map((receptor) => (
          <MapMarker
            key={`receptor-${receptor.id}`}
            type="receptor"
            position={[receptor.latitude, receptor.longitude]}
            icon={receptorIcon}
            data={receptor}
            onDelete={() => deleteReceptor.mutate(receptor.id)}
          />
        ))}

        {abrigos.map((abrigo) => (
          <MapMarker
            key={`abrigo-${abrigo.idAbrigo}`}
            type="abrigo"
            position={[abrigo.latitude, abrigo.longitude]}
            icon={abrigoIcon}
            data={abrigo}
            onDelete={() => deleteAbrigo.mutate(abrigo.idAbrigo)}
          />
        ))}
      </MapContainer>
    </>
  );
}
