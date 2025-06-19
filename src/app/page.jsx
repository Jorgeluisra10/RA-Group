"use client";

import { useEffect, useRef, useState } from "react";
import Atencion from "../components/Atencion";
import CarCard from "../components/CarCard";
import FindHome from "../components/FindHome/FindHome";
import PropertyCard from "../components/PropertyCard";
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
    <div className="min-h-screen w-full text-[var(--text-default)] relative mt-10">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#1A295C] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1A295C] opacity-10 rounded-full blur-2xl" />
        <div className="absolute top-[30%] left-[50%] w-[600px] h-[400px] bg-[#1A295C] opacity-5 -translate-x-1/2 rotate-[30deg] clip-path-diagonal blur-xl" />
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-24 z-10 pointer-events-none">
          <div className="h-[200%] w-full bg-[#1A295C] opacity-10 rotate-[-15deg] origin-top-left clip-path-custom" />
        </div>
        <div className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none">
          <div className="h-[200%] w-full bg-[#1A295C] opacity-10 rotate-[15deg] origin-top-right clip-path-custom" />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none" />
        <FindHome />
      </div>

      <section className="mt-15 relative px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-[var(--text-default)]">
          Propiedades destacadas
        </h1>
        <p className="text-[var(--text-secondary)] mb-6 max-w-3xl mx-auto text-center">
          Encuentra las mejores propiedades disponibles actualmente
        </p>

        <button
          onClick={() => scrollLeft(propertyRef)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
          aria-label="Scroll propiedades izquierda"
        >
          ◀
        </button>
        <button
          onClick={() => scrollRight(propertyRef)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
          aria-label="Scroll propiedades derecha"
        >
          ▶
        </button>

        <div
          ref={propertyRef}
          className="overflow-x-scroll overflow-y-hidden scrollbar-hide touch-pan-x -mx-4 px-4"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex space-x-4 w-full h-[30rem] touch-pan-x">
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
      </section>

      <section className="relative px-4 sm:px-6 lg:px-12 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-[var(--text-default)]">
          Autos destacados
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto text-center">
          Explora nuestra selección de vehículos destacados.
        </p>

        <button
          onClick={() => scrollLeft(carRef)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
          aria-label="Scroll autos izquierda"
        >
          ◀
        </button>
        <button
          onClick={() => scrollRight(carRef)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1A295C] text-white shadow-md rounded-full p-2 z-10 hover:bg-[#16204c]"
          aria-label="Scroll autos derecha"
        >
          ▶
        </button>

        <div
          ref={carRef}
          className="overflow-x-scroll overflow-y-hidden scrollbar-hide touch-pan-x -mx-4 px-4"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
          }}
        >
          <div className="flex space-x-4 w-full h-[30rem] touch-pan-x">
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
      </section>

      <section className="mt-12">
        <div>
          <div className="relative z-10">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-[120px]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="degrade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0e1a46" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 C400,120 1040,0 1440,100 L1440,0 L0,0 Z"
                fill="url(#degrade)"
              />
            </svg>
          </div>

          <Atencion />

          <div className="relative z-10">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-[120px]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="degrade-bottom" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0e1a46" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M1440,120 C1040,0 400,120 0,20 L0,120 L1440,120 Z"
                fill="url(#degrade-bottom)"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
