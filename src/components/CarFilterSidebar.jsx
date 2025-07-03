"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const currentYear = new Date().getFullYear();

const initialFilters = {
  brand: { selected: "" },
  transmission: { automática: false, manual: false },
  fuel: { gasolina: false, diesel: false, híbrido: false, eléctrico: false },
  price: { min: 0, max: 500000000 },
  year: { min: 1950, max: currentYear },
  puertas: { min: 0, max: 5 },
};

export default function CarFilterSidebar({
  onApplyFilters,
  isOpen,
  onClose,
  filters,
  availableCars,
}) {
  const [local, setLocal] = useState(filters || initialFilters);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    if (filters) setLocal(filters);
  }, [filters]);

  useEffect(() => {
    const cb = () => setIsMobile(window.innerWidth < 768);
    cb();
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);

  const distinctBrands = () => {
    return Array.isArray(availableCars)
      ? [...new Set(availableCars.map((c) => c.marca).filter(Boolean))].sort()
      : [];
  };

  const handleChange = (section, key, val) =>
    setLocal((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: val,
      },
    }));

  const handleRange = (section, key, val) => {
    const num = Number(val);
    setLocal((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        min: key === "min" ? Math.min(num, prev[section].max) : prev[section].min,
        max: key === "max" ? Math.max(num, prev[section].min) : prev[section].max,
      },
    }));
  };

  const apply = () => {
    onApplyFilters(local);
    if (isMobile) onClose?.();
  };

  const clear = () => {
    const cleared = {
      ...initialFilters,
      brand: { selected: "" },
    };
    setLocal(cleared);
    onApplyFilters(cleared);
  };

  if (isMobile === null) return null;

  const header = (
    <h2 className="text-lg font-semibold mb-4 text-[var(--text-default)] text-center">
      Filtros
      <span className="block w-12 h-0.5 mx-auto mt-1 bg-[var(--yellow-light)]" />
    </h2>
  );

  const content = (
    <div className="space-y-6 text-sm text-[var(--text-secondary)]">
      {/* Marca */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Marca</h3>
        <select
          value={local.brand.selected || ""}
          onChange={(e) => handleChange("brand", "selected", e.target.value)}
          className="w-full rounded-xl px-3 py-2 border border-[var(--gray-border)] bg-[var(--input-bg-light)] text-[var(--text-default)] focus:outline-none"
        >
          <option value="">Cualquiera</option>
          {distinctBrands().map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
      </div>

      {/* Transmisión */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Transmisión</h3>
        <div className="flex flex-wrap gap-2">
          {["automática", "manual"].map((tipo) => (
            <label
              key={tipo}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--gray-hover)] rounded-lg cursor-pointer hover:bg-[var(--blue-hover)] hover:text-white transition"
            >
              <input
                type="checkbox"
                className="accent-[var(--blue-main)]"
                checked={local.transmission[tipo]}
                onChange={() =>
                  handleChange("transmission", tipo, !local.transmission[tipo])
                }
              />
              <span className="capitalize">{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Combustible */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Combustible</h3>
        <div className="flex flex-wrap gap-2">
          {["gasolina", "diesel", "híbrido", "eléctrico"].map((tipo) => (
            <label
              key={tipo}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--gray-hover)] rounded-lg cursor-pointer hover:bg-[var(--blue-hover)] hover:text-white transition"
            >
              <input
                type="checkbox"
                className="accent-[var(--blue-main)]"
                checked={local.fuel[tipo]}
                onChange={() => handleChange("fuel", tipo, !local.fuel[tipo])}
              />
              <span className="capitalize">{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Precio (COP)</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Desde ${local.price.min.toLocaleString()}</span>
            <span>Hasta ${local.price.max.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500000000"
            step="50000000"
            value={local.price.min}
            onChange={(e) => handleRange("price", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="500000000"
            step="50000000"
            value={local.price.max}
            onChange={(e) => handleRange("price", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Año */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Año</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Desde {local.year.min}</span>
            <span>Hasta {local.year.max}</span>
          </div>
          <input
            type="range"
            min="1950"
            max={currentYear}
            step="1"
            value={local.year.min}
            onChange={(e) => handleRange("year", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min="1950"
            max={currentYear}
            step="1"
            value={local.year.max}
            onChange={(e) => handleRange("year", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const footerButtons = (
    <div className="flex gap-2 pt-4">
      <button
        className="flex-1 bg-[var(--btn-primary)] text-[var(--btn-secondary)] py-2 px-4 rounded-xl"
        onClick={apply}
      >
        Aplicar filtros
      </button>
      <button
        className="flex-1 border border-[var(--gray-border)] hover:bg-[var(--gray-hover)] text-[var(--text-default)] py-2 px-4 rounded-xl"
        onClick={clear}
      >
        Limpiar
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Fondo oscuro */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Sidebar izquierdo */}
        <aside
          className={`absolute top-0 left-0 h-full w-4/5 max-w-xs bg-[var(--input-bg-light)] shadow-xl p-5 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--text-secondary)]"
          >
            <X className="w-6 h-6" />
          </button>

          {header}
          {content}
          {footerButtons}
        </aside>
      </div>
    );
  }

  // Escritorio
  return (
    <aside className="bg-[var(--input-bg-light)] p-6 rounded-2xl shadow-lg w-full md:max-w-[320px] sticky top-4">
      {header}
      {content}
      {footerButtons}
    </aside>
  );
}
