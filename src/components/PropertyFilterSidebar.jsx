"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const initialFilters = {
  tipo: {
    casa: false,
    apartamento: false,
    terreno: false,
    oficina: false,
    finca: false,
    local: false,
  },
  precio: { min: 0, max: 1000000000 },
  habitaciones: 0,
  banos: 0,
  area: { min: 0, max: 500 },
  garaje: 0,
  ciudad: "",
};

export default function PropertyFilterSidebar({
  onApplyFilters,
  isOpen,
  onClose,
  filters: externalFilters,
  cities = [],
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!externalFilters || typeof externalFilters !== "object") return;

    const areLocalFiltersUntouched =
      JSON.stringify(filters) === JSON.stringify(initialFilters);

    if (areLocalFiltersUntouched) {
      const mappedBack = {
        tipo: externalFilters.type ?? {},
        precio: externalFilters.price ?? { min: 0, max: 1000000000 },
        habitaciones: externalFilters.beds ?? 0,
        banos: externalFilters.baths ?? 0,
        area: externalFilters.area ?? { min: 0, max: 500 },
        garaje: externalFilters.garage ?? 0,
        ciudad: externalFilters.city ?? "",
      };
      setFilters(mappedBack);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const safeRangeChange = (section, key, value) => {
    const numValue = Number(value);
    setFilters((prev) => {
      let newSection = { ...prev[section], [key]: numValue };
      if (key === "min" && numValue > prev[section].max) newSection.max = numValue;
      if (key === "max" && numValue < prev[section].min) newSection.min = numValue;
      return { ...prev, [section]: newSection };
    });
  };

  const toggleCheckbox = (section, key) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section]?.[key],
      },
    }));
  };

  const handleNumberSelect = (section, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: Number(value),
    }));
  };

  const applyFilters = () => {
    const mappedFilters = {
      type: filters.tipo,
      price: filters.precio,
      beds: filters.habitaciones,
      baths: filters.banos,
      area: filters.area,
      garage: filters.garaje,
      city: filters.ciudad,
    };
    onApplyFilters(mappedFilters);
    if (isMobile) onClose?.();
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onApplyFilters({
      type: initialFilters.tipo,
      price: initialFilters.precio,
      beds: initialFilters.habitaciones,
      baths: initialFilters.banos,
      area: initialFilters.area,
      garage: initialFilters.garaje,
      city: "",
    });
  };

  if (isMobile === null) return null;

  const SelectField = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl px-3 py-2 border border-[var(--gray-border)] bg-[var(--input-bg-light)] text-[var(--text-default)] focus:outline-none"
    >
      {options.map((n) => (
        <option key={n} value={n}>
          {n === 0 ? "Cualquiera" : n}
        </option>
      ))}
    </select>
  );

  const content = (
    <div className="space-y-6 text-sm text-[var(--text-secondary)]">
      {/* Ciudad */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Ciudad</h3>
        <select
          value={filters.ciudad}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, ciudad: e.target.value }))
          }
          className="w-full rounded-xl px-3 py-2 border border-[var(--gray-border)] bg-[var(--input-bg-light)] text-[var(--text-default)] focus:outline-none"
        >
          <option value="">Cualquiera</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">Tipo</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(filters.tipo ?? initialFilters.tipo).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--gray-hover)] text-[var(--text-default)] rounded-lg cursor-pointer transition hover:bg-[var(--blue-hover)] hover:text-white"
            >
              <input
                type="checkbox"
                checked={filters.tipo?.[key] ?? false}
                onChange={() => toggleCheckbox("tipo", key)}
                className="accent-[var(--blue-main)]"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">
          Precio (COP)
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Desde ${filters.precio?.min?.toLocaleString() ?? 0}</span>
            <span>Hasta ${filters.precio?.max?.toLocaleString() ?? 0}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000000000}
            step={50000000}
            value={filters.precio?.min ?? 0}
            onChange={(e) => safeRangeChange("precio", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={1000000000}
            step={50000000}
            value={filters.precio?.max ?? 1000000000}
            onChange={(e) => safeRangeChange("precio", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Habitaciones */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">
          Habitaciones mínimas
        </h3>
        <SelectField
          value={filters.habitaciones ?? 0}
          onChange={(e) => handleNumberSelect("habitaciones", e.target.value)}
          options={[0, 1, 2, 3, 4, 5]}
        />
      </div>

      {/* Baños */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">
          Baños mínimos
        </h3>
        <SelectField
          value={filters.banos ?? 0}
          onChange={(e) => handleNumberSelect("banos", e.target.value)}
          options={[0, 1, 2, 3, 4, 5]}
        />
      </div>

      {/* Área */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">
          Área (m²)
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Desde {filters.area?.min ?? 0} m²</span>
            <span>Hasta {filters.area?.max ?? 0} m²</span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={filters.area?.min ?? 0}
            onChange={(e) => safeRangeChange("area", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={filters.area?.max ?? 500}
            onChange={(e) => safeRangeChange("area", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Garaje */}
      <div>
        <h3 className="font-semibold mb-2 text-[var(--text-default)]">
          Parqueaderos mínimos
        </h3>
        <SelectField
          value={filters.garaje ?? 0}
          onChange={(e) => handleNumberSelect("garaje", e.target.value)}
          options={[0, 1, 2, 3]}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-2 pt-4">
        <button
          className="flex-1 bg-[var(--btn-primary)] text-[var(--btn-secondary)] py-2 px-4 rounded-xl font-semibold"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </button>
        <button
          className="flex-1 border border-[var(--gray-border)] hover:bg-[var(--gray-hover)] text-[var(--text-default)] py-2 px-4 rounded-xl font-semibold"
          onClick={clearFilters}
        >
          Limpiar
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-50 transition duration-300 ${
          isOpen
            ? "visible opacity-100 bg-black/40 backdrop-blur-sm"
            : "invisible opacity-0"
        }`}
      >
        <aside
          className={`absolute top-0 left-0 h-full w-4/5 max-w-xs bg-[var(--input-bg-light)] shadow-xl p-5 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } rounded-r-2xl overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-default)]">
              Filtros
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-[var(--text-secondary)]" />
            </button>
          </div>
          {content}
        </aside>
      </div>
    );
  }

  return (
    <aside className="bg-[var(--input-bg-light)] w-full md:min-w-[280px] md:max-w-[320px] p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-[var(--text-default)]">
        Filtros
      </h2>
      {content}
    </aside>
  );
}
