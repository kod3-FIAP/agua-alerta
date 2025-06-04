import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom colored icons using URL encoding
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

export default function LeafletMap({
  emissores,
  receptores,
  abrigos,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={[-23.5505, -46.6333]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Emissores - Red markers */}
      {emissores.map((emissor) => (
        <Marker
          key={`emissor-${emissor.id}`}
          position={[emissor.latitude, emissor.longitude]}
          icon={emissorIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-red-600">📡 Emissor</h3>
              <p className="text-sm">{emissor.descricao}</p>
              <p className="text-xs text-gray-600">
                Zona: {emissor.zonaEmissao.nome}
              </p>
              <div className="mt-2 text-xs">
                <p>⚠️ Alerta: {emissor.valorAlerta}</p>
                <p>🚨 Emergência: {emissor.valorEmergencia}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Receptores - Blue markers */}
      {receptores.map((receptor) => (
        <Marker
          key={`receptor-${receptor.id}`}
          position={[receptor.latitude, receptor.longitude]}
          icon={receptorIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-blue-600">📻 Receptor</h3>
              <p className="text-sm">{receptor.descricao}</p>
              <p className="text-xs text-gray-600">
                Zona: {receptor.zonaEmissao.nome}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Abrigos - Green markers */}
      {abrigos.map((abrigo) => (
        <Marker
          key={`abrigo-${abrigo.idAbrigo}`}
          position={[abrigo.latitude, abrigo.longitude]}
          icon={abrigoIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-green-600">🏠 {abrigo.nome}</h3>
              <p className="text-sm">{abrigo.descricao}</p>
              <p className="text-xs text-gray-600">
                Zona: {abrigo.zonaEmissao.nome}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
