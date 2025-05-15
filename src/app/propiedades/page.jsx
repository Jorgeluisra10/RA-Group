"use client";

import properties from "../../data/properties";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PropiedadesPage() {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const uniqueCities = [...new Set(properties.map((p) => p.location))];
  const uniqueBeds = [...new Set(properties.map((p) => p.beds))].sort((a, b) => a - b);

  const toggleCity = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleBeds = (beds) => {
    setSelectedBeds((prev) =>
      prev.includes(beds) ? prev.filter((b) => b !== beds) : [...prev, beds]
    );
  };

  const filteredProperties = properties.filter((prop) => {
    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(prop.location);
    const matchesBeds =
      selectedBeds.length === 0 || selectedBeds.some((b) => prop.beds >= b);
    const matchesPrice = prop.price <= maxPrice;
    return matchesCity && matchesBeds && matchesPrice;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center pb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Explora nuestras propiedades</h1>
        <p className="text-gray-600 mt-2 text-lg">Encuentra la opción ideal para ti</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filtros a la izquierda */}
        <aside className="md:w-1/4 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Filtros</h2>
          <div className="space-y-8">
            {/* Ciudad */}
            <div>
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide text-blue-100">Ciudad</h3>
              {uniqueCities.map((city) => (
                <label key={city} className="block text-sm mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => toggleCity(city)}
                    className="mr-2 accent-yellow-400"
                  />
                  {city}
                </label>
              ))}
            </div>

            {/* Habitaciones */}
            <div>
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide text-blue-100">Habitaciones mínimas</h3>
              {uniqueBeds.map((beds) => (
                <label key={beds} className="block text-sm mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBeds.includes(beds)}
                    onChange={() => toggleBeds(beds)}
                    className="mr-2 accent-yellow-400"
                  />
                  {beds} o más
                </label>
              ))}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide text-blue-100">
                Precio máximo
              </label>
              <input
                type="number"
                placeholder="Ej: 500000000"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full bg-white text-black px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              onClick={() => {
                setSelectedCities([]);
                setSelectedBeds([]);
                setMaxPrice(Infinity);
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-md text-sm transition"
            >
              Limpiar filtros
            </button>
          </div>
        </aside>

        {/* Propiedades a la derecha */}
        <section className="md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <Link
              key={prop.id}
              href={`/propiedad/${prop.id}`}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">{prop.location}</p>
                <p className="text-blue-700 font-bold text-lg">
                  ${prop.price.toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.area} m²</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.beds} hab</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.baths} baños</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{prop.garage} parqueaderos</span>
                </div>
                {prop.badge && (
                  <div className="inline-block bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full mt-2">
                    {prop.badge}
                  </div>
                )}
              </div>
            </Link>
          ))}

          {filteredProperties.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No se encontraron propiedades con esos filtros.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
