"use client";

import { useState, useEffect } from "react";
import PropertyFilterSidebar from "../../components/PropertyFilterSidebar";
import PropertyCard from "../../components/PropertyCard";
import { getProperties } from "../../lib/api";
import { SlidersHorizontal } from "lucide-react";
import BannerCarousel from "./BannerCarousel/BannerCarousel";

const defaultFilters = {
  type: {},
  city: "",
  price: { min: 0, max: 1000000000 },
  beds: 0,
  baths: 0,
  area: { min: 0, max: 10000 },
};

const ITEMS_PER_PAGE = 20;

export default function PropiedadesPage() {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
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

        // Extraer ciudades únicas
        const uniqueCities = [
          ...new Set(data.map((prop) => prop.ciudad).filter(Boolean)),
        ].sort();

        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProperties(data);
        setCities(uniqueCities);
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

      const typeSelected = Object.values(appliedFilters.type ?? {});
      const noTypeSelected =
        typeSelected.length === 0 || typeSelected.every((v) => !v);
      const matchesType =
        noTypeSelected || appliedFilters.type?.[prop.tipo?.toLowerCase()];

      const matchesCity =
        appliedFilters.city === "" || prop.ciudad === appliedFilters.city;

      const matchesPrice =
        prop.price >= (appliedFilters.price?.min ?? 0) &&
        prop.price <= (appliedFilters.price?.max ?? 1000000000);

      const matchesBeds =
        (appliedFilters.beds ?? 0) === 0 ||
        prop.habitaciones >= appliedFilters.beds;

      const matchesBaths =
        (appliedFilters.baths ?? 0) === 0 || prop.banos >= appliedFilters.baths;

      const matchesArea =
        prop.area >= (appliedFilters.area?.min ?? 0) &&
        prop.area <= (appliedFilters.area?.max ?? 10000);

      return (
        matchesType &&
        matchesCity &&
        matchesPrice &&
        matchesBeds &&
        matchesBaths &&
        matchesArea
      );
    })
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  );
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters || defaultFilters);
    setCurrentPage(1);
    if (isMobile) setFiltersOpen(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      <BannerCarousel />
      {isMobile && (
        <div className="sticky top-0 z-40 mb-6 bg-[var(--background)] pt-2 pb-4 flex justify-between items-center gap-2 flex-row-reverse">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 bg-[var(--btn-primary)] text-[var(--btn-secondary)] px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-[var(--blue-hover)] transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <div className="flex items-center text-sm gap-2">
            <span className="text-[var(--text-default)]">Ordenar por:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-[var(--gray-border)] rounded-md px-2 py-1 text-sm bg-[var(--input-bg-light)] text-[var(--text-default)] focus:outline-none"
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
            filters={appliedFilters}
            cities={cities} // pasa las ciudades dinámicas
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
