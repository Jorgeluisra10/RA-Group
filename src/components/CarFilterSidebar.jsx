"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const initialFilters = {
  brand: {},
  transmission: {
    automática: false,
    manual: false,
  },
  fuel: {
    gasolina: false,
    diesel: false,
    híbrido: false,
    eléctrico: false,
  },
  doors: 0,
  price: { min: 0, max: 500000000 },
  year: { min: 2000, max: new Date().getFullYear() },
  features: {
    aire_acondicionado: false,
    gps: false,
    bluetooth: false,
    camara_reversa: false,
    sensor_parqueo: false,
    asientos_cuero: false,
  },
};

export default function CarFilterSidebar({ onApplyFilters, isOpen, onClose }) {
  const [filters, setFilters] = useState(initialFilters);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const toggleCheckbox = (section, key) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleRangeChange = (section, key, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: Number(value),
      },
    }));
  };

  const handleNumberSelect = (section, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    if (isMobile) onClose?.();
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
  };

  if (isMobile === null) return null;

  // Móvil: filtros en la parte superior, modal deslizante
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          isOpen ? "visible bg-black/40 backdrop-blur-sm" : "invisible"
        }`}
      >
        <aside
          className={`absolute left-0 top-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } p-5 overflow-y-auto max-h-[80vh] rounded-b-2xl`}
          style={{ maxHeight: "80vh" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {renderFilters()}
          <div className="flex gap-2 pt-4">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={applyFilters}
            >
              Aplicar Filtros
            </button>
            <button
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded"
              onClick={clearFilters}
            >
              Limpiar
            </button>
          </div>
        </aside>
      </div>
    );
  }

  // Desktop: sidebar fijo a la izquierda
  return (
    <aside className="bg-white w-full md:min-w-[280px] md:max-w-[320px] p-6 rounded-2xl shadow-lg h-fit sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      {renderFilters()}
      <div className="flex gap-2 pt-4">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </button>
        <button
          className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded"
          onClick={clearFilters}
        >
          Limpiar
        </button>
      </div>
    </aside>
  );

  function renderFilters() {
    return (
      <div className="space-y-6 text-sm text-gray-700">
        {/* Transmisión */}
        <div>
          <h3 className="font-semibold mb-2">Transmisión</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(filters.transmission).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.transmission[key]}
                  onChange={() => toggleCheckbox("transmission", key)}
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Combustible */}
        <div>
          <h3 className="font-semibold mb-2">Combustible</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(filters.fuel).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.fuel[key]}
                  onChange={() => toggleCheckbox("fuel", key)}
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Puertas */}
        <div>
          <h3 className="font-semibold mb-2">Número de puertas</h3>
          <select
            value={filters.doors}
            onChange={(e) => handleNumberSelect("doors", parseInt(e.target.value))}
            className="w-full border rounded px-2 py-1"
          >
            {[0, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Cualquiera" : n}
              </option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div>
          <h3 className="font-semibold mb-2">Precio (COP)</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Desde ${filters.price.min.toLocaleString()}</span>
              <span>Hasta ${filters.price.max.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={500000000}
              step={50000000}
              value={filters.price.min}
              onChange={(e) => handleRangeChange("price", "min", e.target.value)}
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={500000000}
              step={50000000}
              value={filters.price.max}
              onChange={(e) => handleRangeChange("price", "max", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Año */}
        <div>
          <h3 className="font-semibold mb-2">Año</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Desde {filters.year.min}</span>
              <span>Hasta {filters.year.max}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={new Date().getFullYear()}
              step={1}
              value={filters.year.min}
              onChange={(e) => handleRangeChange("year", "min", e.target.value)}
              className="w-full"
            />
            <input
              type="range"
              min={2000}
              max={new Date().getFullYear()}
              step={1}
              value={filters.year.max}
              onChange={(e) => handleRangeChange("year", "max", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Características */}
        <div>
          <h3 className="font-semibold mb-2">Características</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(filters.features).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.features[key]}
                  onChange={() => toggleCheckbox("features", key)}
                />
                <span className="capitalize">{key.replaceAll("_", " ")}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
