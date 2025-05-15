"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const FindHome = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica básica para determinar la redirección
    const isCar = propertyType.toLowerCase().includes("carro"); // Puedes ajustar esto si tienes más criterios

    if (isCar) {
      router.push("/carros");
    } else {
      const queryParams = new URLSearchParams({
        ciudad: location,
        tipo: propertyType,
        precio: priceRange,
      }).toString();

      router.push(`/propiedades?${queryParams}`);
    }
  };

  return (
    <section className="relative bg-[url('/images/Fondo-FindHome.png')] bg-no-repeat bg-cover bg-center text-white font-poppins py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0" />

      <header className="mb-10 max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-3">
          Encuentra lo que buscas, donde lo sueñas
        </h1>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
          Explora nuestra selección de autos y propiedades disponibles en las
          principales ciudades de Colombia. Filtra por ciudad y tipo para
          encontrar justo lo que necesitas, de forma rápida y sencilla.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white text-black shadow-2xl rounded-xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-4 mb-10"
      >
        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="location" className="text-xs font-semibold mb-1">
            Localización
          </label>
          <select
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona una Ciudad</option>
            <option value="Tunja">Tunja</option>
            <option value="Bogotá D.C">Bogotá D.C</option>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Chiquinquirá">Chiquinquirá</option>
          </select>
        </div>
        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="propertyType" className="text-xs font-semibold mb-1">
            Tipo de Propiedad
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona un Tipo</option>
            <option value="Departamento">Departamento</option>
            <option value="Casa">Casa</option>
            <option value="Lote">Lote</option>
            <option value="Carro">Carro</option> {/* si también quieres buscar carros desde aquí */}
          </select>
        </div>
        <div className="flex flex-col text-left w-full md:w-[30%]">
          <label htmlFor="priceRange" className="text-xs font-semibold mb-1">
            Rango de precio
          </label>
          <select
            id="priceRange"
            name="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona un rango</option>
            <option value="0-100">- $100.000.000</option>
            <option value="100-300">$100.000.000 a $300.000.000</option>
            <option value="300-600">$300.000.000 a $600.000.000</option>
            <option value="600-1000">$600.000.000 a $1.000.000.000</option>
            <option value="1000+">+ $1.000.000.000</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-[#0f1c46] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1a295c] transition-all duration-200 shadow"
        >
          Buscar propiedad
        </button>
      </form>

      <div className="relative z-10 flex flex-wrap justify-center gap-4">
        <button className="bg-[#ffcc00] text-[#0f1c46] font-semibold px-6 py-2 rounded-md hover:brightness-110 transition">
          Explorar propiedades
        </button>
        <button className="bg-white text-[#0f1c46] font-semibold px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
          Contáctanos
        </button>
        <button className="bg-[#0f1c46] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1a295c] transition">
          Agenda una visita
        </button>
      </div>
    </section>
  );
};

export default FindHome;
