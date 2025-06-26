"use client";

import { useState, useMemo } from "react";
import { MapPin, Search, Car, Home } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../components/MapView"), {
  ssr: false,
});

const mockData = [
  {
    id: 1,
    titulo: "Apartamento moderno",
    tipo: "propiedad",
    ciudad: "Buenos Aires",
    lat: -34.5837,
    lng: -58.4269,
    precio: "$2.500.000",
    detalles: "2 hab. 1 baño 85 m²",
    destacado: true,
  },
  {
    id: 2,
    titulo: "Toyota Corolla 2022",
    tipo: "auto",
    ciudad: "Buenos Aires",
    lat: -34.6037,
    lng: -58.3916,
    precio: "$350.000",
    detalles: "Toyota Corolla 2022",
    destacado: true,
  },
  {
    id: 3,
    titulo: "Casa con jardín",
    tipo: "propiedad",
    ciudad: "Buenos Aires",
    lat: -34.5937,
    lng: -58.4016,
    precio: "$4.200.000",
    detalles: "3 hab. 2 baños 150 m²",
    destacado: false,
  },
];

export default function MapaPage() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("propiedad");
  const [centerOn, setCenterOn] = useState(null);

  const filtered = useMemo(() => {
    const res = mockData.filter(
      (item) =>
        item.tipo === tipo &&
        item.ciudad.toLowerCase().includes(search.toLowerCase())
    );
    if (res.length > 0) setCenterOn({ lat: res[0].lat, lng: res[0].lng });
    return res;
  }, [search, tipo]);

  return (
    <div className="flex flex-col md:flex-row h-[85vh] w-full bg-[var(--background)]">
      {/* Sidebar */}
      <div className="w-full md:w-96 border-b md:border-r md:border-b-0 border-[var(--gray-border)] p-4 flex flex-col">
        {/* Buscador */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ciudad..."
              className="w-full rounded border border-[var(--gray-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]"
            />
            <button className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] p-2 rounded text-white">
              <Search size={20} />
            </button>
          </div>
          <button className="text-sm text-[var(--blue-main)] flex items-center gap-1 hover:underline">
            <MapPin size={16} /> Usar mi ubicación actual
          </button>
        </div>

        {/* Filtro tipo */}
        <div className="mt-4">
          <div className="flex rounded overflow-hidden border border-[var(--gray-border)]">
            {["propiedad", "auto"].map((val) => (
              <button
                key={val}
                onClick={() => setTipo(val)}
                className={`flex-1 p-2 text-sm font-semibold ${
                  tipo === val
                    ? "bg-[var(--blue-main)] text-white"
                    : "bg-[var(--background)] text-[var(--text-default)]"
                }`}
              >
                {val === "propiedad" ? "Propiedades" : "Autos"}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3 scrollbar-hide">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[var(--gray-border)] rounded p-3 shadow-sm cursor-pointer hover:bg-[var(--gray-hover)]"
                onClick={() => setCenterOn({ lat: item.lat, lng: item.lng })}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {item.tipo === "propiedad" ? (
                      <Home size={20} />
                    ) : (
                      <Car size={20} />
                    )}
                    <span className="font-semibold">{item.titulo}</span>
                  </div>
                  {item.destacado && (
                    <span className="bg-[var(--btn-primary)] text-[var(--btn-secondary)] text-xs font-bold px-2 py-0.5 rounded">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="text-[var(--blue-main)] font-bold">{item.precio}</div>
                <div className="text-sm text-[var(--text-secondary)]">{item.detalles}</div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-[var(--text-secondary)] text-sm">
              No hay resultados
            </div>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 relative">
        <MapView mode="busqueda" data={filtered} centerOn={centerOn} />
      </div>
    </div>
  );
}
