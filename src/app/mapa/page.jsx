"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Search, Home, Share2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import { useDebounce } from "use-debounce";

const MapView = dynamic(() => import("../../components/MapView/MapView"), {
  ssr: false,
});

const tiposPropiedad = ["apartamento", "casa", "local", "oficina"];

function SidebarList({
  search,
  setSearch,
  tipo,
  setTipo,
  filtered,
  loading,
  handleMarkerClick,
  copiarLink,
}) {
  return (
    <div className="w-full md:w-96 border-t md:border-t-0 md:border-r border-[var(--gray-border)] p-4 flex flex-col overflow-y-auto scrollbar-hide">
      {/* Buscador */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ciudad..."
            className="w-full rounded border border-[var(--gray-border)] px-3 py-2"
          />
          <button
            onClick={() => {}}
            className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] p-2 rounded text-white"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tiposPropiedad.map((tipoItem) => (
          <button
            key={tipoItem}
            onClick={() => setTipo(tipoItem)}
            className={`text-sm px-3 py-1 rounded-full border font-semibold transition-all ${
              tipo.toLowerCase() === tipoItem
                ? "bg-[var(--blue-main)] text-white"
                : "bg-[var(--background)] text-[var(--text-default)] border-[var(--gray-border)]"
            }`}
          >
            {tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)}
          </button>
        ))}
      </div>

      {/* Resultados */}
      <div className="flex-1 mt-4 space-y-3">
        {loading ? (
          <div className="text-center text-sm text-[var(--text-secondary)]">Cargando...</div>
        ) : filtered.length > 0 ? (
          filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative border border-[var(--gray-border)] rounded p-3 shadow-sm cursor-pointer hover:bg-[var(--gray-hover)]"
              onClick={() => handleMarkerClick(item)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Home size={20} />
                  <span className="font-semibold">{item.titulo}</span>
                </div>
                <span className="bg-[var(--btn-primary)] text-black text-xs font-bold px-2 py-0.5 rounded">
                  Destacado
                </span>
              </div>
              <div className="text-[var(--btn-primary)] font-bold">{item.precio}</div>
              <div className="text-sm text-[var(--text-secondary)] flex justify-between items-center">
                <span>{item.detalles}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copiarLink(item.id);
                    }}
                    className="text-[var(--heart-button)] hover:text-[var(--btn-primary)] transition"
                    aria-label="Copiar link"
                  >
                    <Share2 size={16} />
                  </button>
                  <Link href={`/propiedad/${item.id}`} className="hover:text-[var(--btn-primary)]" aria-label="Ver detalle">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-sm text-[var(--text-secondary)]">No hay resultados</div>
        )}
      </div>
    </div>
  );
}

export default function MapaPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [tipo, setTipo] = useState("apartamento");
  const [data, setData] = useState([]);
  const [centerOn, setCenterOn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const geocoderRef = useRef(null);

  // Caching la ciudad en localStorage para no pedir siempre geocoding
  useEffect(() => {
    const cityCache = localStorage.getItem("mapaCityCoords");
    if (cityCache) {
      setCenterOn(JSON.parse(cityCache));
    } else {
      // Primer geocoding para centro inicial (Colombia como ejemplo)
      if (window.google && window.google.maps && !geocoderRef.current) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }
      if (geocoderRef.current) {
        geocoderRef.current.geocode(
          { address: "Colombia", region: "co" },
          (results, status) => {
            if (status === "OK" && results[0]) {
              const loc = results[0].geometry.location;
              const coords = { lat: loc.lat(), lng: loc.lng() };
              setCenterOn(coords);
              localStorage.setItem("mapaCityCoords", JSON.stringify(coords));
            } else {
              console.warn("No se pudo obtener geocoding inicial");
            }
          }
        );
      }
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("properties")
        .select("*")
        .ilike("tipo", `%${tipo}%`)
        .limit(20);

      if (debouncedSearch.trim()) {
        query = query.ilike("ciudad", `%${debouncedSearch.trim()}%`);
      }

      const { data: results, error } = await query;

      if (error) throw error;

      setData(results ?? []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData([]);
    }
    setLoading(false);
    setSelectedProperty(null);
    setSelectedDestination(null);
  }, [tipo, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = useMemo(() => {
    return data.map((item) => ({
      ...item,
      titulo: item.title,
      precio: `$${Number(item.price).toLocaleString()}`,
      detalles: `${item.habitaciones || 0} hab. ${item.banos || 0} baños ${item.area || 0} m²`,
    }));
  }, [data]);

  const markers = useMemo(() => filtered.filter((item) => item.lat && item.lng), [filtered]);

  const handleMarkerClick = useCallback((item) => {
    if (item.lat && item.lng) {
      setCenterOn({ lat: item.lat, lng: item.lng });
      setSelectedProperty(item);
    }
  }, []);

  const copiarLink = (id) => {
    const url = `${window.location.origin}/propiedad/${id}`;
    navigator.clipboard.writeText(url).then(() => alert("Link copiado"));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-[85vh] w-full bg-[var(--background)] relative">
      <SidebarList
        search={search}
        setSearch={setSearch}
        tipo={tipo}
        setTipo={setTipo}
        filtered={filtered}
        loading={loading}
        handleMarkerClick={handleMarkerClick}
        copiarLink={copiarLink}
      />

      <div className="flex-1 relative h-[300px] md:h-[85vh] z-0">
        <MapView
          mode="busqueda"
          data={markers}
          centerOn={centerOn}
          onMarkerClick={handleMarkerClick}
          selectedProperty={selectedProperty}
          selectedDestination={selectedDestination}
          onDestinationSelect={setSelectedDestination}
        />
      </div>
    </div>
  );
}
