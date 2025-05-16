"use client";

import { useState, useEffect } from "react";
import CarFilterSidebar from "../../components/CarFilterSidebar"; // Ajusta ruta si es necesario
import CarCard from "../../components/CarCard"; // Ajusta ruta si es necesario
import { supabase } from "../../lib/supabaseClient";
import { SlidersHorizontal } from "lucide-react";

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState("recent");

  // Detectar móvil para responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch carros y sus imágenes desde Supabase
  useEffect(() => {

    const fetchCars = async () => {
      let { data: carsData, error } = await supabase.from("cars").select("*");

      if (error) {
        console.error("Error fetching cars:", error);
        return;
      }

      // Para cada carro, obtener URLs públicas de las imágenes (asumiendo campo images con array de nombres)
      const carsWithUrls = await Promise.all(
        carsData.map(async (car) => {
          if (!car.images || car.images.length === 0)
            return { ...car, images: [] };

          const imagesUrls = car.images.map(
            (imgName) =>
              supabase.storage.from("cars").getPublicUrl(imgName).publicURL
          );

          return { ...car, images: imagesUrls };
        })
      );

      setCars(carsWithUrls);
      setFilteredCars(carsWithUrls);
    };

    fetchCars();
  }, []);

  // Aplicar filtros y orden cuando cambian filters o sortOption o cars
  useEffect(() => {
    if (!cars.length) return;

    let filtered = cars;

    if (filters) {
      filtered = cars.filter((car) => {
        const transmissionKeys = Object.keys(filters.transmission || {}).filter(
          (key) => filters.transmission[key]
        );
        if (
          transmissionKeys.length &&
          !transmissionKeys.includes(car.transmission)
        )
          return false;

        const fuelKeys = Object.keys(filters.fuel || {}).filter(
          (key) => filters.fuel[key]
        );
        if (fuelKeys.length && !fuelKeys.includes(car.fuel)) return false;

        if (filters.doors !== 0 && car.doors !== filters.doors) return false;

        if (car.price < filters.price.min || car.price > filters.price.max)
          return false;

        if (car.year < filters.year.min || car.year > filters.year.max)
          return false;

        for (const [feature, enabled] of Object.entries(
          filters.features || {}
        )) {
          if (enabled && !car.features?.includes(feature)) {
            return false;
          }
        }

        return true;
      });
    }

    setFilteredCars(sortCars(filtered));
  }, [filters, sortOption, cars]);

  const sortCars = (carsArray) => {
    switch (sortOption) {
      case "price_low":
        return [...carsArray].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...carsArray].sort((a, b) => b.price - a.price);
      case "year_new":
        return [...carsArray].sort((a, b) => b.year - a.year);
      case "year_old":
        return [...carsArray].sort((a, b) => a.year - b.year);
      default:
        return carsArray;
    }
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      {isMobile && (
        <div className="sticky top-0 z-40 mb-6 bg-white pt-2 pb-4 flex justify-between items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-sm"
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>

          <div className="flex items-center text-sm gap-2">
            <span className="text-gray-700 whitespace-nowrap">
              Ordenar por:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="recent">Más recientes</option>
              <option value="price_low">Precio: menor a mayor</option>
              <option value="price_high">Precio: mayor a menor</option>
              <option value="year_new">Año: más nuevo</option>
              <option value="year_old">Año: más antiguo</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <CarFilterSidebar
          onApplyFilters={setFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              No se encontraron carros que coincidan con los filtros.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
