"use client";

import { useState, useEffect } from "react";
import CarFilterSidebar from "../../components/CarFilterSidebar";
import CarCard from "../../components/CarCard";
import { supabase } from "../../lib/supabaseClient";
import { SlidersHorizontal } from "lucide-react";

const defaultFilters = {
  transmission: {},
  fuel: {},
  doors: 0,
  price: { min: 0, max: 100000000 },
  year: { min: 1900, max: new Date().getFullYear() },
  features: {},
};

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState("recent");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      let { data: carsData, error } = await supabase.from("cars").select("*");

      if (error) {
        console.error("Error fetching cars:", error);
        return;
      }

      // Ordenar por created_at descendente para recent (asegúrate que exista el campo)
      carsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

        // Puertas: si es 0 no filtrar, si no igualar
        if (filters.doors && car.doors !== filters.doors) return false;

        if (
          car.price < filters.price.min ||
          car.price > filters.price.max ||
          car.year < filters.year.min ||
          car.year > filters.year.max
        )
          return false;

        const features = filters.features || {};
        if (
          Object.entries(features).some(
            ([key, val]) => val && !car.features?.includes(key)
          )
        )
          return false;

        return true;
      });
    }

    // Ordenar después de filtrar
    filtered = sortCars(filtered);

    setFilteredCars(filtered);
  }, [filters, cars, sortOption]);

  const sortCars = (carList) => {
    switch (sortOption) {
      case "price_low":
        return [...carList].sort((a, b) => a.price - b.price);
      case "price_high":
        return [...carList].sort((a, b) => b.price - a.price);
      case "year_high":
        return [...carList].sort((a, b) => b.year - a.year);
      case "recent":
      default:
        return [...carList].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters || defaultFilters);
    if (isMobile) setIsFilterOpen(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      {isMobile && (
        <div className="sticky top-0 z-40 mb-6 bg-white pt-2 pb-4 flex justify-between items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>

          <div className="flex items-center text-sm gap-2">
            <span className="text-gray-700">Ordenar por:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="recent">Más recientes</option>
              <option value="price_low">Precio: menor a mayor</option>
              <option value="price_high">Precio: mayor a menor</option>
              <option value="year_high">Año más nuevo</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <CarFilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
            filters={filters}
          />
        </div>

        <section className="md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No se encontraron autos con esos filtros.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
