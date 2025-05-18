"use client";

import { useState, useEffect } from "react";
import CarFilterSidebar from "../../components/CarFilterSidebar";
import CarCard from "../../components/CarCard";
import { getCars } from "../../lib/api";
import { SlidersHorizontal } from "lucide-react";

const defaultPrice = { min: 0, max: 100000000 };
const defaultYear = { min: 1900, max: new Date().getFullYear() };

export default function CarrosPage() {
  const [cars, setCars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [sortOption, setSortOption] = useState("recent");

  const generateBrandFilter = (cars) => {
    const brands = {};
    cars.forEach((car) => {
      if (car.marca) brands[car.marca.toLowerCase()] = true;
    });
    return brands;
  };

  const generateTransmissionFilter = (cars) => {
    const transmissions = {};
    cars.forEach((car) => {
      if (car.transmision)
        transmissions[car.transmision.toLowerCase()] = true;
    });
    return transmissions;
  };

  const generateFuelFilter = (cars) => {
    const fuels = {};
    cars.forEach((car) => {
      if (car.combustible) fuels[car.combustible.toLowerCase()] = true;
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
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

        setCars(carsData);

        setAppliedFilters({
          brand: generateBrandFilter(carsData),
          price: defaultPrice,
          year: defaultYear,
          transmission: generateTransmissionFilter(carsData),
          fuel: generateFuelFilter(carsData),
          doors: 0,
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
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    }
  };

  const isFilterActive = (filterObj) =>
    filterObj && Object.values(filterObj).some((v) => v);

  const filteredCars = appliedFilters
    ? sortCars(
        cars.filter((car) => {
          const carMarca = car.marca?.toLowerCase() || "";
          const carTransmision = car.transmision?.toLowerCase() || "";
          const carCombustible = car.combustible?.toLowerCase() || "";

          const matchesBrand =
            !isFilterActive(appliedFilters.brand) ||
            appliedFilters.brand[carMarca];

          const matchesPrice =
            Number(car.price) >= appliedFilters.price.min &&
            Number(car.price) <= appliedFilters.price.max;

          const matchesYear =
            Number(car.modelo) >= appliedFilters.year.min &&
            Number(car.modelo) <= appliedFilters.year.max;

          const matchesTransmission =
            !isFilterActive(appliedFilters.transmission) ||
            appliedFilters.transmission[carTransmision];

          const matchesFuel =
            !isFilterActive(appliedFilters.fuel) ||
            appliedFilters.fuel[carCombustible];

          const matchesDoors =
            !appliedFilters.doors ||
            Number(car.puertas) === Number(appliedFilters.doors);

          return (
            matchesBrand &&
            matchesPrice &&
            matchesYear &&
            matchesTransmission &&
            matchesFuel &&
            matchesDoors
          );
        })
      )
    : [];

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters || appliedFilters);
    if (isMobile) setFiltersOpen(false);
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 py-12 mt-12">
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
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="recent">Más recientes</option>
              <option value="price_low">Precio: menor a mayor</option>
              <option value="price_high">Precio: mayor a menor</option>
              <option value="year_new">Año: más nuevo</option>
              <option value="year_old">Año: más viejo</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <CarFilterSidebar
            onApplyFilters={handleApplyFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />
        </div>

        <section className="md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No se encontraron carros con esos filtros.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
