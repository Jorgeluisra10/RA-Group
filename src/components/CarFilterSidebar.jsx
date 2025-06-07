"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const currentYear = new Date().getFullYear();

const initialFilters = {
  brand: {}, // Se inicializa dinámicamente en la página principal
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
  price: { min: 0, max: 500000000 },
  year: { min: 1950, max: currentYear },
  features: {
    aire_acondicionado: false,
    gps: false,
    bluetooth: false,
    camara_reversa: false,
    sensor_parqueo: false,
    asientos_cuero: false,
  },
};

export default function CarFilterSidebar({ onApplyFilters, isOpen, onClose, filters }) {
  // Recibe filtros iniciales desde props para que la marca sea dinámica
  const [localFilters, setLocalFilters] = useState(filters || initialFilters);
  const [isMobile, setIsMobile] = useState(null);

  // Actualizar localFilters si cambian los filtros externos (para reset o cambios)
  useEffect(() => {
    if (filters) setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const toggleCheckbox = (section, key) => {
    setLocalFilters((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleRangeChange = (section, key, value) => {
    value = Number(value);

    setLocalFilters((prev) => {
      let newMin = prev[section].min;
      let newMax = prev[section].max;

      if (key === "min") {
        newMin = Math.min(value, prev[section].max);
      } else {
        newMax = Math.max(value, prev[section].min);
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          min: newMin,
          max: newMax,
        },
      };
    });
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
    if (isMobile) onClose?.();
  };

  const clearFilters = () => {
    onApplyFilters(filters); // Resetea al filtro original desde props
  };

  if (isMobile === null) return null;

  function renderFilters() {
    return (
      <div className="space-y-6 text-sm text-gray-700">
        {/* Marcas */}
        {filters.brand && Object.keys(filters.brand).length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Marca</h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {Object.keys(filters.brand).map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.brand[key]}
                    onChange={() => toggleCheckbox("brand", key)}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Transmisión */}
        <div>
          <h3 className="font-semibold mb-2">Transmisión</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(localFilters.transmission).map((key) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.transmission[key]}
                  onChange={() => toggleCheckbox("transmission", key)}
                  className="cursor-pointer"
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
            {Object.keys(localFilters.fuel).map((key) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.fuel[key]}
                  onChange={() => toggleCheckbox("fuel", key)}
                  className="cursor-pointer"
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <h3 className="font-semibold mb-2">Precio (COP)</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Desde ${localFilters.price.min.toLocaleString()}</span>
              <span>Hasta ${localFilters.price.max.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={500000000}
              step={50000000}
              value={localFilters.price.min}
              onChange={(e) => handleRangeChange("price", "min", e.target.value)}
              className="w-full"
              aria-label="Precio mínimo"
            />
            <input
              type="range"
              min={0}
              max={500000000}
              step={50000000}
              value={localFilters.price.max}
              onChange={(e) => handleRangeChange("price", "max", e.target.value)}
              className="w-full"
              aria-label="Precio máximo"
            />
          </div>
        </div>

        {/* Año */}
        <div>
          <h3 className="font-semibold mb-2">Año</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Desde {localFilters.year.min}</span>
              <span>Hasta {localFilters.year.max}</span>
            </div>
            <input
              type="range"
              min={1950}
              max={currentYear}
              step={1}
              value={localFilters.year.min}
              onChange={(e) => handleRangeChange("year", "min", e.target.value)}
              className="w-full"
              aria-label="Año mínimo"
            />
            <input
              type="range"
              min={1950}
              max={currentYear}
              step={1}
              value={localFilters.year.max}
              onChange={(e) => handleRangeChange("year", "max", e.target.value)}
              className="w-full"
              aria-label="Año máximo"
            />
          </div>
        </div>

        {/* Características */}
        <div>
          <h3 className="font-semibold mb-2">Características</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(localFilters.features).map((key) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.features[key]}
                  onChange={() => toggleCheckbox("features", key)}
                  className="cursor-pointer"
                />
                <span className="capitalize">{key.replaceAll("_", " ")}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Móvil: modal deslizante
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
            <button onClick={onClose} aria-label="Cerrar filtros">
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

  // Desktop: sidebar fijo y sticky arriba
  return (
    <aside className="bg-white w-full md:min-w-[280px] md:max-w-[320px] p-6 rounded-2xl shadow-lg h-fit sticky top-4">
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
}
