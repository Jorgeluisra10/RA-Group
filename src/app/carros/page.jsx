"use client";

import carData from "../../data/Cars";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, MapPin, Filter, CarFront } from "lucide-react";

export default function CarrosPage() {
  const [priceRange, setPriceRange] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [doors, setDoors] = useState("");
  const [brand, setBrand] = useState("");
  const [transmission, setTransmission] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);

  const toggleCarSelection = (id) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  const filteredCars = carData.filter((car) => {
    const carPrice = Number(car.price);
    const carYear = car.year;
    const carFuel = car.engine.toLowerCase();
    const carDoors = car.doors;

    let matchesPrice = true;
    if (priceRange === "10-40")
      matchesPrice = carPrice >= 10000000 && carPrice <= 40000000;
    else if (priceRange === "40-100")
      matchesPrice = carPrice > 40000000 && carPrice <= 100000000;
    else if (priceRange === "100-200")
      matchesPrice = carPrice > 100000000 && carPrice <= 200000000;
    else if (priceRange === "200+") matchesPrice = carPrice > 200000000;

    const matchesTransmission =
      transmission === "" ||
      car.transmission.toLowerCase().includes(transmission.toLowerCase());
    const matchesBrand =
      brand === "" || car.title.toLowerCase().includes(brand.toLowerCase());
    const matchesYear = year === "" || carYear === Number(year);
    const matchesFuel = fuel === "" || carFuel.includes(fuel.toLowerCase());
    const matchesDoors = doors === "" || carDoors === Number(doors);

    return (
      matchesPrice &&
      matchesTransmission &&
      matchesBrand &&
      matchesYear &&
      matchesFuel &&
      matchesDoors
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Explora nuestras opciones
        </h1>
        <p className="text-gray-600 mt-2">
          Encuentra el vehículo ideal para ti
        </p>
        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center text-blue-600">
            <CarFront className="w-6 h-6" />
            <span className="text-sm font-medium">Vehículos</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between rounded-t-2xl max-w-7xl mx-auto gap-4">
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="text-xs block">Marca</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm"
            >
              <option value="">Todas</option>
              <option value="Ford">Ford</option>
              <option value="Toyota">Toyota</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Mazda">Mazda</option>
            </select>
          </div>

          <div>
            <label className="text-xs block">Transmisión</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm"
            >
              <option value="">Todas</option>
              <option value="Automática">Automática</option>
              <option value="Mecánica">Mecánica</option>
            </select>
          </div>

          <div>
            <label className="text-xs block">Rango de Precio</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm"
            >
              <option value="">Todos</option>
              <option value="10-40">10M - 40M</option>
              <option value="40-100">40M - 100M</option>
              <option value="100-200">100M - 200M</option>
              <option value="200+">200M+</option>
            </select>
          </div>

          <div>
            <label className="text-xs block">Año</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm w-24"
              placeholder="Ej: 2020"
            />
          </div>

          <div>
            <label className="text-xs block">Combustible</label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm"
            >
              <option value="">Todos</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diésel">Diésel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>

          <div>
            <label className="text-xs block">Puertas</label>
            <select
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-md text-sm"
            >
              <option value="">Todas</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtrar</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-28">
        <p className="text-sm text-gray-600 mt-6">
          {filteredCars.length} resultados encontrados
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredCars.map((carro) => {
            const selected = selectedCars.includes(carro.id);

            const features = [
              carro.transmission,
              carro.engine.includes("Gasolina") ? "Gasolina" : "Diésel",
              `${carro.doors} puertas`,
              carro.badge,
            ];

            return (
              <div
                key={carro.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={carro.images[0]}
                    alt={carro.title}
                    fill
                    className="object-cover"
                  />
                  {selected && (
                    <CheckCircle className="absolute top-2 right-2 text-yellow-400 w-6 h-6" />
                  )}
                  <button
                    onClick={() => toggleCarSelection(carro.id)}
                    className="absolute top-2 left-2 bg-white rounded-full p-1 text-sm shadow"
                  >
                    {selected ? "−" : "+"}
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{carro.title}</h2>
                      <p className="text-sm text-gray-600">{carro.model}</p>
                    </div>
                    <p className="text-right text-lg font-bold text-gray-800">
                      ${carro.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {carro.location}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2 text-xs">
                    {features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/carro/${carro.id}`}
                    className="block bg-yellow-400 text-center mt-4 py-2 font-medium rounded-md hover:bg-yellow-300"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCars.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-lg z-50">
          <div className="flex gap-4 items-center">
            <span className="text-sm">
              Comparar seleccionados ({selectedCars.length})
            </span>
            <div className="flex gap-2">
              {selectedCars.map((id) => {
                const car = carData.find((c) => c.id === id);
                return (
                  <div
                    key={id}
                    className="bg-white text-black rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1"
                  >
                    {car?.title}
                    <button
                      onClick={() => toggleCarSelection(id)}
                      className="ml-1 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold">
            Comparar ahora
          </button>
        </div>
      )}
    </div>
  );
}
