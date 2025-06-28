"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Search, Home, Share2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapView = dynamic(() => import("../../components/MapView/MapView"), {
  ssr: false,
});

export default function MapaPage() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Apartamento");
  const [data, setData] = useState([]);
  const [centerOn, setCenterOn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const geocoderRef = useRef(null);

  // Para hover y posición del carrusel
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [carouselPos, setCarouselPos] = useState({ top: 0, left: 0 });
  const carouselWidth = 280; // ancho carrusel
  const carouselHeight = 150; // alto carrusel

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: results, error } = await supabase.from("properties").select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        setData([]);
      } else {
        setData(results);
      }

      setLoading(false);
      setSelectedProperty(null);
      setSelectedDestination(null);
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let list = data.filter((item) => item.tipo?.toLowerCase() === tipo.toLowerCase());

    if (search.trim()) {
      list = list.filter((item) => item.ciudad?.toLowerCase().includes(search.toLowerCase()));
    }

    return list
      .slice(0, 10)
      .map((item) => ({
        ...item,
        titulo: item.title,
        precio: `$${Number(item.price).toLocaleString()}`,
        detalles: `${item.habitaciones || 0} hab. ${item.banos || 0} baños ${item.area || 0} m²`,
      }));
  }, [search, data, tipo]);

  const markers = useMemo(() => {
    return data.filter((item) => item.lat && item.lng);
  }, [data]);

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
          const destination = { lat: location.lat(), lng: location.lng() };
          setCenterOn(destination);
          setSelectedDestination(destination);
        } else {
          console.warn("No se pudo geocodificar la ciudad:", search);
        }
      }
    );
  };

  const handleMarkerClick = (item) => {
    if (item.lat && item.lng) {
      setCenterOn({ lat: item.lat, lng: item.lng });
      setSelectedProperty(item);
    }
  };

  const tiposPropiedad = ["apartamento", "casa", "local", "oficina"];

  const copiarLink = (id) => {
    const url = `${window.location.origin}/propiedad/${id}`;
    navigator.clipboard.writeText(url).then(() => alert("Link copiado"));
  };

  // Control hover y posición del carrusel
  const handleMouseEnter = (event, property) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Detectar viewport para responsividad
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = rect.top + window.scrollY;
    let left = rect.right + 20 + window.scrollX;

    // Si viewport pequeño (menos de md ~768px), mostrar carrusel centrado arriba del mapa
    if (vw < 768) {
      // Calculamos el centro horizontal de la pantalla para centrar carrusel
      left = vw / 2 - carouselWidth / 2 + window.scrollX;
      // Ubicar carrusel justo encima del listado (que está abajo del mapa)
      top = rect.top - carouselHeight - 10 + window.scrollY;
      // Si top queda muy arriba, ajustamos para que se vea abajo
      if (top < window.scrollY + 10) {
        top = rect.bottom + 10 + window.scrollY;
      }
    } else {
      // En pantallas grandes, verificar si carrusel se sale por la derecha
      if (left + carouselWidth > window.scrollX + vw) {
        left = rect.left - carouselWidth - 20 + window.scrollX; // mostramos a la izquierda del item
      }
      // Verificar que no se salga abajo
      if (top + carouselHeight > window.scrollY + vh) {
        top = window.scrollY + vh - carouselHeight - 10;
      }
    }

    setCarouselPos({ top, left });
    setHoveredProperty(property);
  };

  const handleMouseLeave = () => {
    setHoveredProperty(null);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-[85vh] w-full bg-[var(--background)] relative">
      {/* LISTA */}
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
              onKeyDown={(e) => e.key === "Enter" && buscarCiudad()}
            />
            <button
              onClick={buscarCiudad}
              className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] p-2 rounded text-white"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tiposPropiedad.map((tipoItem) => (
              <button
                key={tipoItem}
                onClick={() => setTipo(tipoItem)}
                className={`text-sm px-3 py-1 rounded-full border font-semibold transition-all ${
                  tipo === tipoItem
                    ? "bg-[var(--blue-main)] text-white"
                    : "bg-[var(--background)] text-[var(--text-default)] border-[var(--gray-border)]"
                }`}
              >
                {tipoItem.charAt(0).toUpperCase() + tipoItem.slice(1)}
              </button>
            ))}
          </div>
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
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseLeave={handleMouseLeave}
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
                      className="text-[var(--heart-button)] hover:text-[var(--btn-primary)] transition heart-hover"
                    >
                      <Share2 size={16} />
                    </button>
                    <Link href={`/propiedad/${item.id}`} className="hover:text-[var(--btn-primary)]">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-[var(--text-secondary)] text-sm">No hay resultados</div>
          )}
        </div>
      </div>

      {/* MAPA */}
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

        {/* Carrusel flotante */}
        {hoveredProperty && hoveredProperty.images && hoveredProperty.images.length > 0 && (
          <div
            className="absolute bg-white rounded shadow-lg border p-1 z-50"
            style={{
              top: carouselPos.top,
              left: carouselPos.left,
              width: carouselWidth,
              maxHeight: carouselHeight,
              overflow: "hidden",
            }}
            onMouseEnter={() => setHoveredProperty(hoveredProperty)} // mantener visible si pasa mouse sobre carrusel
            onMouseLeave={handleMouseLeave}
          >
            <Slider {...sliderSettings}>
              {hoveredProperty.images.slice(0, 5).map((img, idx) => (
                <div key={idx} className="relative h-[140px] w-full">
                  <Image
                    src={img}
                    alt={`Imagen ${idx + 1}`}
                    fill
                    className="object-cover rounded"
                    sizes={`${carouselWidth}px`}
                    priority={false}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
