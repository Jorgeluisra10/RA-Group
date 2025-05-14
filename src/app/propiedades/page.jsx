// app/propiedades/page.tsx
"use client";

import properties from "../../data/properties";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Filter } from "lucide-react";

export default function PropiedadesPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [minBeds, setMinBeds] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  // Filtrar propiedades según criterios
  const filteredProperties = properties.filter((prop) => {
    const matchesCity =
      selectedCity === "" || prop.location.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesBeds = prop.beds >= minBeds;
    const matchesPrice = prop.price <= maxPrice;

    return matchesCity && matchesBeds && matchesPrice;
  });

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900">Explora nuestras opciones</h1>
        <p className="text-gray-600 mt-2">Encuentra la propiedad ideal para ti</p>
        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center text-blue-600">
            <span className="text-sm font-medium">Propiedades</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center rounded-t-2xl">
        <div className="flex gap-4">
          <button className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full">
            Propiedades
          </button>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-black">
          <select
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white px-3 py-1 rounded-md text-sm"
          >
            <option value="">Todas las ciudades</option>
            {[...new Set(properties.map((p) => p.location))].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min. habitaciones"
            onChange={(e) => setMinBeds(Number(e.target.value))}
            className="bg-white px-3 py-1 rounded-md text-sm w-36"
          />

          <input
            type="number"
            placeholder="Precio máximo"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="bg-white px-3 py-1 rounded-md text-sm w-36"
          />

          <button className="flex items-center gap-1 text-sm text-white">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProperties.map((prop) => (
          <Link
            key={prop.id}
            href={`/propiedad/${prop.id}`}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className="h-48 w-full relative">
              <Image
                src={prop.image}
                alt={prop.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{prop.title}</h2>
              <p className="text-sm text-gray-600">{prop.location}</p>
              <p className="text-blue-600 font-bold text-lg">
                ${prop.price.toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.area} m²</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.beds} hab</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.baths} baños</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.garage} parqueaderos</span>
              </div>
              {prop.badge && (
                <div className="mt-2 inline-block bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {prop.badge}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No se encontraron propiedades con esos filtros.</p>
      )}
    </div>
  );
}
