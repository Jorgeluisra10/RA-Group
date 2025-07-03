"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter de next/navigation
import { supabase } from "../../lib/supabaseClient";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const FiltroBuscador = ({
  onSearchParamsChange,
  onTextSearch,
  initialSearchText = "",
}) => {
  const router = useRouter();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState(initialSearchText);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [locationsOptions, setLocationsOptions] = useState([]);
  const [propertyTypesOptions, setPropertyTypesOptions] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchOptions() {
      const { data: propiedades } = await supabase
        .from("properties")
        .select("ciudad")
        .neq("ciudad", null);

      const ciudadesUnicas = [
        ...new Set(propiedades?.map((p) => p.ciudad).filter(Boolean)),
      ].sort();
      setLocationsOptions(ciudadesUnicas);

      const { data: tiposProp } = await supabase
        .from("properties")
        .select("tipo")
        .neq("tipo", null);

      const tiposPropUnicos = [
        ...new Set(tiposProp?.map((p) => p.tipo).filter(Boolean)),
      ];

      const { count: countCars } = await supabase
        .from("cars")
        .select("id", { count: "exact", head: true });

      const tiposFinales = [...tiposPropUnicos];
      if (countCars > 0 && !tiposFinales.includes("Carro")) {
        tiposFinales.push("Carro");
      }

      tiposFinales.sort();
      setPropertyTypesOptions(tiposFinales);
    }

    fetchOptions();
  }, []);

  // Esta función construye el objeto filtros basado en los selects
  const buildFiltersFromSelects = () => {
    const [precioMin, precioMax] = (() => {
      if (priceRange === "") return [null, null];
      if (priceRange === "1000+") return [1000000000, null];
      const [min, max] = priceRange.split("-").map((p) => Number(p) * 1000000);
      return [min, max];
    })();

    return {
      ciudad: location || null,
      tipo: propertyType || null,
      precioMin,
      precioMax,
    };
  };

  // Navegar a /buscar con query params
  const navigateToBuscar = (filtersObj, textoBusqueda = "") => {
    const query = new URLSearchParams();

    // Añadir filtros no nulos
    Object.entries(filtersObj).forEach(([key, val]) => {
      if (val !== null && val !== "" && val !== undefined) {
        query.set(key, val);
      }
    });

    // Añadir texto de búsqueda
    if (textoBusqueda.trim()) {
      query.set("texto", textoBusqueda.trim());
    }

    router.push(`/buscar?${query.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtros = buildFiltersFromSelects();

    onSearchParamsChange?.(filtros);
    navigateToBuscar(filtros, ""); // Navega con filtros, sin texto
  };

  const handleTextSearch = () => {
    if (!searchText.trim()) return;
    onTextSearch?.(searchText.trim());

    // Navega con solo texto y los filtros actuales vacíos (o nulos)
    navigateToBuscar({}, searchText.trim());
  };

  if (!mounted) return null;

  return (
    <div className="relative z-10 transition-colors duration-300 text-[var(--text-default)]">
      <header className="mb-10 max-w-3xl mx-auto text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-3 text-white dark:text-white">
          Encuentra lo que buscas donde lo sueñas
        </h1>
        <button
          onClick={() => setSearchMode(!searchMode)}
          aria-label="Buscar"
          className="absolute top-0 right-0 p-2 md:p-3 rounded-full bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] transition-colors"
        >
          <Search className="text-white w-5 h-5" />
        </button>
      </header>

      <AnimatePresence>
        {!searchMode && (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-[var(--white)] dark:bg-[var(--white)] text-[var(--text-default)] shadow-2xl rounded-xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-4 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Select Ciudad */}
            <div className="flex flex-col text-left w-full md:w-[30%]">
              <label htmlFor="location" className="text-xs font-semibold mb-1">
                Localización
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border border-[var(--gray-border)] rounded-md dark:bg-[var(--gray-hover)]"
              >
                <option value="">Selecciona una Ciudad</option>
                {locationsOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Tipo */}
            <div className="flex flex-col text-left w-full md:w-[30%]">
              <label
                htmlFor="propertyType"
                className="text-xs font-semibold mb-1"
              >
                Tipo de Propiedad
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="p-2 border border-[var(--gray-border)] rounded-md dark:bg-[var(--gray-hover)]"
              >
                <option value="">Selecciona un Tipo</option>
                {propertyTypesOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Precio */}
            <div className="flex flex-col text-left w-full md:w-[30%]">
              <label htmlFor="priceRange" className="text-xs font-semibold mb-1">
                Rango de precio
              </label>
              <select
                id="priceRange"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-2 border border-[var(--gray-border)] rounded-md dark:bg-[var(--gray-hover)]"
              >
                <option value="">Selecciona un rango</option>
                <option value="0-100">- $100.000.000</option>
                <option value="100-300">$100.000.000 a $300.000.000</option>
                <option value="300-600">$300.000.000 a $600.000.000</option>
                <option value="600-1000">$600.000.000 a $1.000.000.000</option>
                <option value="1000+">+ $1.000.000.000</option>
              </select>
            </div>

            {/* Botón buscar */}
            <button
              type="submit"
              className="w-full md:w-auto bg-[var(--blue-main)] text-white font-semibold px-6 py-2 rounded-md hover:bg-[var(--blue-hover)] transition-all"
            >
              Buscar propiedad
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-3 border border-[var(--gray-border)] rounded-md dark:bg-[var(--gray-hover)]"
                placeholder="Buscar propiedades o vehículos..."
                onKeyDown={(e) => e.key === "Enter" && handleTextSearch()}
              />
              <button
                onClick={handleTextSearch}
                className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] text-white px-4 py-2 rounded-md"
              >
                Buscar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones extras, puedes adaptar */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4">
        <button className="bg-[var(--yellow-light)] text-[var(--blue-main)] font-semibold px-6 py-2 rounded-md hover:brightness-110 transition">
          Explorar propiedades
        </button>
        <button className="bg-[var(--white)] text-[var(--text-default)] font-semibold px-6 py-2 rounded-md border border-[var(--gray-border)] hover:bg-[var(--gray-hover)] transition">
          Contáctanos
        </button>
        <button className="bg-[var(--blue-main)] text-white font-semibold px-6 py-2 rounded-md hover:bg-[var(--blue-hover)] transition">
          Agenda una visita
        </button>
      </div>
    </div>
  );
};

export default FiltroBuscador;
