import { useState, useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

const initialFilters = {
  tipo: {
    casa: false,
    apartamento: false,
    terreno: false,
    oficina: false,
    local: false,
  },
  precio: { min: 0, max: 1000000000 },
  habitaciones: 0,
  banos: 0,
  area: { min: 0, max: 500 },
  garaje: 0, // número mínimo de parqueaderos
};

export default function PropertyFilterSidebar({
  onApplyFilters,
  isOpen,
  onClose,
}) {
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

  const content = (
    <div className="space-y-6 text-sm text-gray-700">
      {/* Tipo */}
      <div>
        <h3 className="font-semibold mb-2">Tipo</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(filters.tipo).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.tipo[key]}
                onChange={() => toggleCheckbox("tipo", key)}
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
            <span>Desde ${filters.precio.min.toLocaleString()}</span>
            <span>Hasta ${filters.precio.max.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000000000}
            step={50000000}
            value={filters.precio.min}
            onChange={(e) => handleRangeChange("precio", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={1000000000}
            step={50000000}
            value={filters.precio.max}
            onChange={(e) => handleRangeChange("precio", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Habitaciones */}
      <div>
        <h3 className="font-semibold mb-2">Habitaciones mínimas</h3>
        <select
          value={filters.habitaciones}
          onChange={(e) =>
            handleNumberSelect("habitaciones", parseInt(e.target.value))
          }
          className="w-full border rounded px-2 py-1"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n === 0 ? "Cualquiera" : n}
            </option>
          ))}
        </select>
      </div>

      {/* Baños */}
      <div>
        <h3 className="font-semibold mb-2">Baños mínimos</h3>
        <select
          value={filters.banos}
          onChange={(e) =>
            handleNumberSelect("banos", parseInt(e.target.value))
          }
          className="w-full border rounded px-2 py-1"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n === 0 ? "Cualquiera" : n}
            </option>
          ))}
        </select>
      </div>

      {/* Área */}
      <div>
        <h3 className="font-semibold mb-2">Área (m²)</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Desde {filters.area.min} m²</span>
            <span>Hasta {filters.area.max} m²</span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={filters.area.min}
            onChange={(e) => handleRangeChange("area", "min", e.target.value)}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={filters.area.max}
            onChange={(e) => handleRangeChange("area", "max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Garaje */}
      <div>
        <h3 className="font-semibold mb-2">Parqueaderos mínimos</h3>
        <select
          value={filters.garaje}
          onChange={(e) =>
            handleNumberSelect("garaje", parseInt(e.target.value))
          }
          className="w-full border rounded px-2 py-1"
        >
          {[0, 1, 2, 3].map((n) => (
            <option key={n} value={n}>
              {n === 0 ? "Cualquiera" : n}
            </option>
          ))}
        </select>
      </div>

      {/* Botones */}
      <div className="flex gap-2 pt-2">
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
    </div>
  );

  // Mobile
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          isOpen ? "visible bg-black/40 backdrop-blur-sm" : "invisible"
        }`}
      >
        <aside
          className={`absolute left-0 top-0 h-full w-80 mt-15 bg-white shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } p-5 overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          {content}
        </aside>
      </div>
    );
  }

  // Desktop
  return (
    <aside className="bg-white w-full md:min-w-[280px] md:max-w-[320px] p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      {content}
    </aside>
  );
}
