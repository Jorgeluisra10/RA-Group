"use client";

import React, { useRef } from "react";
import properties from "../data/properties";
import car from "../data/Cars";
import PropertyCard from "../components/PropertyCard";
import CarCard from "../components/CarCard";
import Comments from "../components/Comments";
import FindHome from "../components/FindHome";

export default function Home() {
  const propertyRef = useRef(null);
  const carRef = useRef(null);

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

  return (
    <>
      {/* --- Find Home --- */}
      <FindHome />

      {/* --- Sección Propiedades --- */}
      <section className="mb-20 relative">
        <h1 className="mt-8 text-4xl font-semibold mb-4 text-center">
          Propiedades destacadas
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Encuentra las mejores propiedades disponibles actualmente. Espacios
          modernos, ubicaciones privilegiadas y todo lo que necesitas para vivir
          o invertir con confianza.
        </p>

        <button
          onClick={() => scrollLeft(propertyRef)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
          aria-label="Scroll propiedades izquierda"
        >
          ◀
        </button>
        <button
          onClick={() => scrollRight(propertyRef)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
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
            {properties.slice(0, 20).map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%] transition-transform duration-300"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sección Autos --- */}
      <section className="mb-20 relative">
        <h1 className="text-4xl font-semibold mb-4 text-center">
          Autos destacados
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Explora nuestra selección de vehículos destacados. Calidad,
          rendimiento y estilo en un solo lugar, con opciones que se adaptan a tu
          estilo de vida.
        </p>

        <button
          onClick={() => scrollLeft(carRef)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
          aria-label="Scroll autos izquierda"
        >
          ◀
        </button>
        <button
          onClick={() => scrollRight(carRef)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
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
            {car.slice(0, 20).map((c, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%] transition-transform duration-300"
              >
                <CarCard car={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Sección Comments --- */}
      <Comments />
    </>
  );
}
