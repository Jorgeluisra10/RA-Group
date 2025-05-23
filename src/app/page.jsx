"use client";

import React, { useRef, useEffect, useState } from "react";
import { getCars, getProperties } from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import CarCard from "../components/CarCard";
import Comments from "../components/Comments";
import FindHome from "../components/FindHome";
import Atencion from "../components/Atencion";


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
    <div className="min-h-screen w-full bg-white text-[#1A295C] relative mt-10">
      {/* Fondo decorativo global */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#1A295C] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1A295C] opacity-10 rounded-full blur-2xl" />
        <div className="absolute top-[30%] left-[50%] w-[600px] h-[400px] bg-[#1A295C] opacity-5 -translate-x-1/2 rotate-[30deg] clip-path-diagonal blur-xl" />
      </div>

      {/* Find Home */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-24 z-10 pointer-events-none">
          <div className="h-[200%] w-full bg-[#1A295C] opacity-10 rotate-[-15deg] origin-top-left clip-path-custom" />
        </div>
        <div className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none">
          <div className="h-[200%] w-full bg-[#1A295C] opacity-10 rotate-[15deg] origin-top-right clip-path-custom" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-white/30 to-white z-10 pointer-events-none" />
        <FindHome />
      </div>

      {/* Propiedades */}
      <section className="py-10 relative px-4 sm:px-6 lg:px-12 bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-[#1A295C]">
          Propiedades destacadas
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Encuentra las mejores propiedades disponibles actualmente.
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

        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div
            ref={propertyRef}
            className="flex space-x-4 px-2 md:px-4 w-full overflow-hidden min-h-[28rem]"
            style={{ scrollBehavior: "smooth" }}
          >
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Autos */}
      <section className="py-10 relative px-4 sm:px-6 lg:px-12 bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-[#1A295C]">
          Autos destacados
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
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

        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div
            ref={carRef}
            className="flex space-x-4 px-2 md:px-4 w-full overflow-hidden min-h-[28rem]"
            style={{ scrollBehavior: "smooth" }}
          >
            {recentCars.map((car) => (
              <div
                key={car.id}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </section>
            <section>
        <div>
          <Atencion />
        </div>
      </section>

      {/* Comentarios */}
      <div className="bg-[#f9f9f9] text-[#1A295C] pb-12 max-w-7xl mx-auto rounded-xl shadow-lg px-6 sm:px-12 mb-10">
        <Comments />
      </div>
    </div>
  );
}
