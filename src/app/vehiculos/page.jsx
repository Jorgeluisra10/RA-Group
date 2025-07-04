"use client";

import { useState, useEffect } from "react";
import CarFilterSidebar from "../../components/CarFilterSidebar";
import CarCard from "../../components/CarCard";
import { getCars } from "../../lib/api";
import { SlidersHorizontal } from "lucide-react";
import BannerCarousel from "./Banner Carousel/page";

const defaultPrice = { min: 0, max: 500_000_000 };
const defaultYear = { min: 1950, max: new Date().getFullYear() };
const CARS_PER_PAGE = 20;

export default function CarrosPage() {
  const [cars, setCars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const generateTransmissionFilter = (cars) => {
    const transmissions = {};
    cars.forEach((car) => {
      if (car.transmision) transmissions[car.transmision.toLowerCase()] = false;
    });
    return transmissions;
  };

  const generateFuelFilter = (cars) => {
    const fuels = {};
    cars.forEach((car) => {
      if (car.combustible) fuels[car.combustible.toLowerCase()] = false;
    });
    return fuels;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        carsData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setCars(carsData);
        setAppliedFilters({
          brand: { selected: "" },
          price: defaultPrice,
          year: defaultYear,
          transmission: generateTransmissionFilter(carsData),
          fuel: generateFuelFilter(carsData),
          features: {
            aire_acondicionado: false,
            gps: false,
            bluetooth: false,
            camara_reversa: false,
            sensor_parqueo: false,
            asientos_cuero: false,
          },
        });
      } catch (error) {
        console.error("Error fetching cars:", error.message);
      }
    };
    fetchCars();
  }, []);

  const sortCars = (list) => {
    switch (sortOption) {
      case "price_low":
        return [...list].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...list].sort((a, b) => b.price - a.price);
      case "year_new":
        return [...list].sort((a, b) => b.modelo - a.modelo);
      case "year_old":
        return [...list].sort((a, b) => a.modelo - b.modelo);
      case "recent":
      default:
        return [...list].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  const isFilterActive = (filterObj) =>
    filterObj && Object.values(filterObj).some((v) => v === true);

  const filteredCars = appliedFilters
    ? cars.filter((car) => {
        // Marca
        if (
          appliedFilters.brand.selected &&
          appliedFilters.brand.selected.toLowerCase() !==
            car.marca?.toLowerCase()
        )
          return false;

        // Precio
        if (
          Number(car.price) < appliedFilters.price.min ||
          Number(car.price) > appliedFilters.price.max
        )
          return false;

        // Año
        if (
          Number(car.modelo) < appliedFilters.year.min ||
          Number(car.modelo) > appliedFilters.year.max
        )
          return false;

        // Transmisión
        if (
          isFilterActive(appliedFilters.transmission) &&
          !appliedFilters.transmission[car.transmision?.toLowerCase()]
        )
          return false;

        // Combustible
        if (
          isFilterActive(appliedFilters.fuel) &&
          !appliedFilters.fuel[car.combustible?.toLowerCase()]
        )
          return false;

        // Características
        if (appliedFilters.features) {
          for (const [key, value] of Object.entries(appliedFilters.features)) {
            if (value && !car.features?.includes(key)) {
              return false;
            }
          }
        }

        return true;
      })
    : cars;

  const sortedCars = sortCars(filteredCars);

  const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);
  const paginatedCars = sortedCars.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setFiltersOpen(false);
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      {/* Hero section */}
      <BannerCarousel />

      {/* Controles y filtros */}
      <div className="container mx-auto px-4 mt-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        {!isMobile && appliedFilters && (
          <aside className="w-full md:w-1/4 md:sticky md:top-24 h-fit">
            <CarFilterSidebar
              filters={appliedFilters}
              availableCars={cars}
              onApplyFilters={handleApplyFilters}
            />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 w-full">
          {/* Filtro móvil */}
          {isMobile && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-secondary)] px-5 py-2.5 rounded-xl text-sm shadow-md transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtros
              </button>

              {appliedFilters && (
                <CarFilterSidebar
                  filters={appliedFilters}
                  availableCars={cars}
                  onApplyFilters={handleApplyFilters}
                  isOpen={filtersOpen}
                  onClose={() => setFiltersOpen(false)}
                />
              )}
            </div>
          )}

          {/* Lista de carros */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCars.length > 0 ? (
              paginatedCars.map((car) => <CarCard key={car.id} car={car} />)
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No hay carros que coincidan con los filtros.
              </p>
            )}
          </section>

          {/* Paginación */}
          {totalPages > 1 && (
            <nav className="mt-10 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Anterior
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Siguiente
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}
