"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const currentYear = new Date().getFullYear();
const initialFilters = {
  texto: "",
  ciudad: "",
  tipo: "",
  marca: "",
  transmision: "",
  combustible: "",
  precioMin: 0,
  precioMax: 1000000000,
  anioMin: 1950,
  anioMax: currentYear,
  habitaciones: 0,
  banos: 0,
  areaMin: 0,
  areaMax: 500,
  garaje: 0,
  puertasMin: 0,
};

export default function FiltrosAvanzadosBusqueda({
  filters = initialFilters, // Recibimos filtros desde afuera
  onApplyFilters,
  isOpen = false,
  onClose,
  cities = [],
  types = [],
  brands = [],
}) {
  const [internalFilters, setInternalFilters] = useState(filters);
  const [isMobile, setIsMobile] = useState(null);

  // Sincronizar estado interno si cambia la prop externa
  useEffect(() => {
    setInternalFilters(filters);
  }, [filters]);

  // Detect viewport
  useEffect(() => {
    const cb = () => setIsMobile(window.innerWidth < 768);
    cb();
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);

  const update = (key, val) => setInternalFilters((f) => ({ ...f, [key]: val }));

  const apply = () => {
    onApplyFilters(internalFilters);
    if (isMobile) onClose?.();
  };

  const clearAll = () => {
    setInternalFilters(initialFilters);
    onApplyFilters(initialFilters);
  };

  const controls = (
    <div className="grid gap-4 text-[var(--text-default)]">
      {/* Texto */}
      <input
        type="text"
        placeholder="Buscar palabra clave..."
        value={internalFilters.texto}
        onChange={(e) => update("texto", e.target.value)}
        className="w-full border rounded p-2"
      />

      {/* Ciudad / Tipo */}
      <select value={internalFilters.ciudad} onChange={(e) => update("ciudad", e.target.value)}>
        <option value="">Ciudad</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select value={internalFilters.tipo} onChange={(e) => update("tipo", e.target.value)}>
        <option value="">Tipo</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Vehículo */}
      <select value={internalFilters.marca} onChange={(e) => update("marca", e.target.value)}>
        <option value="">Marca (vehículo)</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select value={internalFilters.transmision} onChange={(e) => update("transmision", e.target.value)}>
        <option value="">Transmisión</option>
        <option value="automática">Automática</option>
        <option value="manual">Manual</option>
      </select>
      <select value={internalFilters.combustible} onChange={(e) => update("combustible", e.target.value)}>
        <option value="">Combustible</option>
        <option value="gasolina">Gasolina</option>
        <option value="diesel">Diésel</option>
        <option value="híbrido">Híbrido</option>
        <option value="eléctrico">Eléctrico</option>
      </select>

      {/* Precios */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Precio min"
          value={internalFilters.precioMin}
          onChange={(e) => update("precioMin", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Precio max"
          value={internalFilters.precioMax}
          onChange={(e) => update("precioMax", Number(e.target.value))}
        />
      </div>

      {/* Año, habitaciones, baños */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Año min"
          value={internalFilters.anioMin}
          onChange={(e) => update("anioMin", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Año max"
          value={internalFilters.anioMax}
          onChange={(e) => update("anioMax", Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Habitaciones min"
          value={internalFilters.habitaciones}
          onChange={(e) => update("habitaciones", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Baños min"
          value={internalFilters.banos}
          onChange={(e) => update("banos", Number(e.target.value))}
        />
      </div>

      {/* Área, garaje, puertas */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Área min(m²)"
          value={internalFilters.areaMin}
          onChange={(e) => update("areaMin", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Área max"
          value={internalFilters.areaMax}
          onChange={(e) => update("areaMax", Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Garaje min"
          value={internalFilters.garaje}
          onChange={(e) => update("garaje", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Puertas min"
          value={internalFilters.puertasMin}
          onChange={(e) => update("puertasMin", Number(e.target.value))}
        />
      </div>
    </div>
  );

  const footer = (
    <div className="flex gap-2 pt-4">
      <button onClick={apply} className="flex-1 bg-[var(--blue-main)] text-white py-2 rounded">
        Aplicar filtros
      </button>
      <button onClick={clearAll} className="flex-1 border py-2 rounded">
        Limpiar
      </button>
    </div>
  );

  if (isMobile === null) return null;

  // Sidebar móvil
  if (isMobile) {
    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <aside
          className={`absolute left-0 top-0 w-4/5 max-w-xs bg-white p-6 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2>Filtros</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          {controls}
          {footer}
        </aside>
      </div>
    );
  }

  // Panel desktop
  return (
    <aside className="bg-white p-6 rounded-lg shadow w-full md:max-w-[320px]">
      <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda</h2>
      {controls}
      {footer}
    </aside>
  );
}
