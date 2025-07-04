"use client";

import { useEffect, useRef, useState } from "react";
import Atencion from "../components/Atencion";
import CarCard from "../components/CarCard";
import FindHome from "../components/FindHome/FindHome";
import PropertyCard from "../components/PropertyCard";
import CategoriaSelector from "../components/SelectorCategoria";
import { motion } from "framer-motion";
import { getCars, getProperties } from "../lib/api";

export default function Home() {
  const propertyRef = useRef(null);
  const carRef = useRef(null);
  const [recentProperties, setRecentProperties] = useState([]);
  const [recentCars, setRecentCars] = useState([]);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesData, carsData] = await Promise.all([
          getProperties(),
          getCars(),
        ]);

        const sortedProperties = propertiesData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 20);
        const sortedCars = carsData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 20);

        setRecentProperties(sortedProperties);
        setRecentCars(sortedCars);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full text-[var(--text-default)] relative">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#1A295C] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1A295C] opacity-10 rounded-full blur-2xl" />
        <div className="absolute top-[30%] left-[50%] w-[600px] h-[400px] bg-[#1A295C] opacity-5 -translate-x-1/2 rotate-[30deg] clip-path-diagonal blur-xl" />
      </div>

      <div className="relative overflow-x-hidden">
        {/* Líneas diagonales decorativas SOBRE el FindHome sin causar scroll */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {/* Izquierda */}
          <div className="absolute top-[-25%] left-0 w-32 h-[150%] bg-[#1A295C] opacity-10 rotate-[-15deg] origin-top-left clip-path-custom" />

          {/* Derecha */}
          <div className="absolute top-[-25%] right-0 w-32 h-[150%] bg-[#1A295C] opacity-10 rotate-[15deg] origin-top-right clip-path-custom" />
        </div>

        <FindHome />
      </div>

      <section>
        <CategoriaSelector />
      </section>

      {/* PROPIEDADES */}
      <section className="mt-15 relative px-4 sm:px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl text-center sm:text-5xl font-extrabold mb-8 text-[var(--blue-main)] dark:text-[var(--text-hero)] leading-tight relative select-none"
        >
          Propiedades destacadas
          {/* Línea amarilla centrada debajo */}
          <span className="block w-24 h-1 bg-yellow-400 rounded mt-3 mx-auto" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto text-center text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-lg leading-relaxed"
        >
          Encuentra las mejores propiedades disponibles actualmente
        </motion.p>

        <div className="relative">
          <button
            onClick={() => scrollLeft(propertyRef)}
            className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
            aria-label="Scroll propiedades izquierda"
          >
            ◀
          </button>
          <button
            onClick={() => scrollRight(propertyRef)}
            className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
            aria-label="Scroll propiedades derecha"
          >
            ▶
          </button>

          <div
            ref={propertyRef}
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 py-8"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              overscrollBehaviorX: "contain",
            }}
          >
            <div className="flex space-x-4 w-full h-[30rem]">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%] h-full"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUTOS */}
      <section className="relative px-4 sm:px-6 lg:px-12 mt-20">
        <motion.h2
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl text-center sm:text-5xl font-extrabold mb-8 text-[var(--blue-main)] dark:text-[var(--text-hero)] leading-tight relative select-none"
        >
          Autos destacados
          {/* Línea amarilla centrada debajo */}
          <span className="block w-24 h-1 bg-yellow-400 rounded mt-3 mx-auto" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto text-center text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-lg leading-relaxed"
        >
          Explora nuestra selección de vehículos destacados.
        </motion.p>

        <div className="relative">
          <button
            onClick={() => scrollLeft(carRef)}
            className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
            aria-label="Scroll autos izquierda"
          >
            ◀
          </button>
          <button
            onClick={() => scrollRight(carRef)}
            className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
            aria-label="Scroll autos derecha"
          >
            ▶
          </button>

          <div
            ref={carRef}
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 py-8"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              overscrollBehaviorX: "contain",
            }}
          >
            <div className="flex space-x-4 w-full h-[30rem]">
              {recentCars.map((car) => (
                <div
                  key={car.id}
                  className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%] h-full"
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATENCIÓN */}
      <section className="mt-12">
        <div className="mb-3 mt-3">
          <Atencion />
        </div>
      </section>
    </div>
  );
}
