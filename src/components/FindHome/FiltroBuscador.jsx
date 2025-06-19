"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useTheme } from "next-themes";

const FiltroBuscador = () => {
  const router = useRouter();
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [locationsOptions, setLocationsOptions] = useState([]);
  const [propertyTypesOptions, setPropertyTypesOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const { data: propiedades, error: errorProp } = await supabase
        .from("properties")
        .select("ciudad")
        .neq("ciudad", null);

      if (errorProp) {
        console.error("Error fetching ciudades:", errorProp);
        return;
      }

      const ciudadesUnicas = [
        ...new Set(propiedades?.map((p) => p.ciudad).filter(Boolean)),
      ].sort();
      setLocationsOptions(ciudadesUnicas);

      const { data: tiposProp, error: errorTiposProp } = await supabase
        .from("properties")
        .select("tipo")
        .neq("tipo", null);

      if (errorTiposProp) {
        console.error("Error fetching tipos de propiedades:", errorTiposProp);
        return;
      }

      const tiposPropUnicos = [
        ...new Set(tiposProp?.map((p) => p.tipo).filter(Boolean)),
      ];

      const { count: countCars, error: errorCountCars } = await supabase
        .from("cars")
        .select("id", { count: "exact", head: true });

      if (errorCountCars) {
        console.error("Error contando carros:", errorCountCars);
        return;
      }

      const tiposFinales = [...tiposPropUnicos];
      if (countCars > 0 && !tiposFinales.includes("Carro")) {
        tiposFinales.push("Carro");
      }

      tiposFinales.sort();
      setPropertyTypesOptions(tiposFinales);
    }

    fetchOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCar = propertyType.toLowerCase() === "carro";
    const [precioMin, precioMax] = (() => {
      if (priceRange === "") return [null, null];
      if (priceRange === "1000+") return [1000000000, null];
      const [min, max] = priceRange.split("-").map((p) => Number(p) * 1000000);
      return [min, max];
    })();

    const queryParams = new URLSearchParams();

    if (isCar) {
      if (precioMin !== null) queryParams.set("precioMin", precioMin);
      if (precioMax !== null) queryParams.set("precioMax", precioMax);
      if (propertyType) queryParams.set("tipo", propertyType);
      router.push(`/vehiculos?${queryParams.toString()}`);
    } else {
      if (location) queryParams.set("ciudad", location);
      if (propertyType) queryParams.set("tipo", propertyType);
      if (precioMin !== null) queryParams.set("precioMin", precioMin);
      if (precioMax !== null) queryParams.set("precioMax", precioMax);
      router.push(`/propiedades?${queryParams.toString()}`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative z-10 transition-colors duration-300 text-[var(--text-default)]">
      <header className="mb-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-3 text-white dark:text-white">
          Encuentra lo que buscas donde lo sueñas
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--white)] dark:bg-[var(--white)] text-[var(--text-default)] shadow-2xl rounded-xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-4 mb-10 transition-colors duration-300"
      >
        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="location" className="text-xs font-semibold mb-1">
            Localización
          </label>
          <select
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-[var(--gray-border)] bg-[var(--white)] text-[var(--text-default)] rounded-md transition-colors duration-300 dark:bg-[var(--gray-hover)]"
          >
            <option value="">Selecciona una Ciudad</option>
            {locationsOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="propertyType" className="text-xs font-semibold mb-1">
            Tipo de Propiedad
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="p-2 border border-[var(--gray-border)] bg-[var(--white)] text-[var(--text-default)] rounded-md transition-colors duration-300 dark:bg-[var(--gray-hover)]"
          >
            <option value="">Selecciona un Tipo</option>
            {propertyTypesOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="priceRange" className="text-xs font-semibold mb-1">
            Rango de precio
          </label>
          <select
            id="priceRange"
            name="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 border border-[var(--gray-border)] bg-[var(--white)] text-[var(--text-default)] rounded-md transition-colors duration-300 dark:bg-[var(--gray-hover)]"
          >
            <option value="">Selecciona un rango</option>
            <option value="0-100">- $100.000.000</option>
            <option value="100-300">$100.000.000 a $300.000.000</option>
            <option value="300-600">$300.000.000 a $600.000.000</option>
            <option value="600-1000">$600.000.000 a $1.000.000.000</option>
            <option value="1000+">+ $1.000.000.000</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-[var(--blue-main)] text-white font-semibold px-6 py-2 rounded-md hover:bg-[var(--blue-hover)] transition-all duration-200 shadow"
        >
          Buscar propiedad
        </button>
      </form>

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
