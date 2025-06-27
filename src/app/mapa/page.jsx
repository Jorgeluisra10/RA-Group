"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { MapPin, Search, Car, Home, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";

const MapView = dynamic(() => import("../../components/MapView"), {
  ssr: false,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MapaPage() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("propiedad");
  const [data, setData] = useState([]);
  const [centerOn, setCenterOn] = useState({ lat: 4.570868, lng: -74.297333 }); // Colombia
  const [loading, setLoading] = useState(true);
  const geocoderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query =
        tipo === "auto"
          ? supabase.from("cars").select("*")
          : supabase.from("properties").select("*");

      const { data: results, error } = await query;

      if (error) {
        console.error("Error fetching data:", error.message);
        setData([]);
      } else {
        setData(results);
      }

      setLoading(false);
    };

    fetchData();
  }, [tipo]);

  const filtered = useMemo(() => {
    return data
      .filter((item) =>
        item.ciudad?.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => ({
        id: item.id,
        titulo: item.title,
        tipo,
        ciudad: item.ciudad,
        lat: item.lat,
        lng: item.lng,
        precio: `$${Number(item.price).toLocaleString()}`,
        detalles:
          tipo === "auto"
            ? `${item.marca || ""} ${item.modelo || ""}`
            : `${item.habitaciones || 0} hab. ${item.banos || 0} baños ${
                item.area || 0
              } m²`,
        destacado: true,
      }));
  }, [search, data]);

  const buscarCiudad = async () => {
    if (!window.google || !search.trim()) return;

    if (!geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }

    geocoderRef.current.geocode(
      {
        address: `${search}, Colombia`,
        region: "co",
      },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setCenterOn({ lat: location.lat(), lng: location.lng() });
        } else {
          console.warn("No se pudo geocodificar la ciudad:", search);
        }
      }
    );
  };

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
              onKeyDown={(e) => e.key === "Enter" && buscarCiudad()}
            />
            <button
              onClick={buscarCiudad}
              className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] p-2 rounded text-white"
            >
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
          {loading ? (
            <div className="text-center text-sm text-[var(--text-secondary)]">
              Cargando...
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[var(--gray-border)] rounded p-3 shadow-sm cursor-pointer hover:bg-[var(--gray-hover)]"
                onClick={() =>
                  item.lat && item.lng && setCenterOn({ lat: item.lat, lng: item.lng })
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {item.tipo === "propiedad" ? <Home size={20} /> : <Car size={20} />}
                    <span className="font-semibold">{item.titulo}</span>
                  </div>
                  {item.destacado && (
                    <span className="bg-[var(--btn-primary)] text-[var(--btn-secondary)] text-xs font-bold px-2 py-0.5 rounded">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="text-[var(--btn-primary)] font-bold">
                  {item.precio}
                </div>
                <div className="text-sm text-[var(--text-secondary)] flex justify-between items-center">
                  <span>{item.detalles}</span>
                  <div className="flex gap-2">
                    <button className="text-[var(--heart-button)] hover:text-[var(--btn-primary)] transition heart-hover">
                      <Heart size={16} />
                    </button>
                    <button className="text-[var(--heart-button)] hover:text-[var(--btn-primary)] transition heart-hover">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
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
