"use client";

import { useState, useEffect } from "react";
import PropertyFilterSidebar from "../../components/PropertyFilterSidebar";
import PropertyCard from "../../components/PropertyCard";
import { getProperties } from "../../lib/api";
import { SlidersHorizontal } from "lucide-react";
import BannerCarousel from "./BannerCarousel/BannerCarousel";

const defaultFilters = {
  type: {},
  price: { min: 0, max: 1000000000 },
  beds: 0,
  baths: 0,
  area: { min: 0, max: 10000 },
  features: {},
};

const ITEMS_PER_PAGE = 20;

export default function PropiedadesPage() {
  const [properties, setProperties] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProperties(data);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }
    };

    fetchProperties();
  }, []);

  const sortProperties = (props) => {
    switch (sortOption) {
      case "price_low":
        return [...props].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...props].sort((a, b) => b.price - a.price);
      case "area_high":
        return [...props].sort((a, b) => b.area - a.area);
      case "beds_high":
        return [...props].sort((a, b) => b.habitaciones - a.habitaciones);
      case "recent":
      default:
        return [...props].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }
  };

  const filteredProperties = sortProperties(
    properties.filter((prop) => {
      if (!appliedFilters) return true;

      const matchesType =
        Object.values(appliedFilters.type).every((v) => !v) ||
        appliedFilters.type[prop.tipo?.toLowerCase()];

      const matchesPrice =
        prop.price >= appliedFilters.price.min &&
        prop.price <= appliedFilters.price.max;

      const matchesBeds =
        appliedFilters.beds === 0 || prop.habitaciones >= appliedFilters.beds;

      const matchesBaths =
        appliedFilters.baths === 0 || prop.banos >= appliedFilters.baths;

      const matchesArea =
        prop.area >= appliedFilters.area.min &&
        prop.area <= appliedFilters.area.max;

      const matchesFeatures = Object.entries(appliedFilters.features).every(
        ([key, val]) => (val ? prop.features?.includes(key) : true)
      );

      return (
        matchesType &&
        matchesPrice &&
        matchesBeds &&
        matchesBaths &&
        matchesArea &&
        matchesFeatures
      );
    })
  );

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters || defaultFilters);
    setCurrentPage(1); // Reset page on filter apply
    if (isMobile) setFiltersOpen(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 mt-12 md:px-8 py-12">
      <BannerCarousel />
      {isMobile && (
        <div className="sticky top-0 z-40 mb-6 bg-white pt-2 pb-4 flex justify-between items-center gap-2">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <div className="flex items-center text-sm gap-2">
            <span className="text-gray-700">Ordenar por:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="recent">Más recientes</option>
              <option value="price_low">Precio: menor a mayor</option>
              <option value="price_high">Precio: mayor a menor</option>
              <option value="area_high">Mayor área</option>
              <option value="beds_high">Más habitaciones</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <PropertyFilterSidebar
            onApplyFilters={handleApplyFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />
        </div>

        <section className="md:w-3/4 flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 mt-8">
                No se encontraron propiedades con esos filtros.
              </p>
            )}
          </div>

          {filteredProperties.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
