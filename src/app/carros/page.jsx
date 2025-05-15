"use client";

import carData from "../../data/Cars";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, MapPin, CarFront } from "lucide-react";

export default function CarrosPage() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedDoors, setSelectedDoors] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  const toggleSelection = (value, setValue) => {
    setValue((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredCars = carData.filter((car) => {
    const carPrice = Number(car.price);
    const carYear = car.year;
    const carFuel = car.engine.toLowerCase();
    const carDoors = car.doors;

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        if (range === "10-40") return carPrice >= 10000000 && carPrice <= 40000000;
        if (range === "40-100") return carPrice > 40000000 && carPrice <= 100000000;
        if (range === "100-200") return carPrice > 100000000 && carPrice <= 200000000;
        if (range === "200+") return carPrice > 200000000;
      });

    const matchesTransmission =
      selectedTransmissions.length === 0 ||
      selectedTransmissions.includes(car.transmission);

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.some((b) => car.title.toLowerCase().includes(b.toLowerCase()));

    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(carYear);

    const matchesFuel =
      selectedFuels.length === 0 ||
      selectedFuels.some((f) => carFuel.includes(f.toLowerCase()));

    const matchesDoors =
      selectedDoors.length === 0 || selectedDoors.includes(carDoors);

    return (
      matchesPrice &&
      matchesTransmission &&
      matchesBrand &&
      matchesYear &&
      matchesFuel &&
      matchesDoors
    );
  });

  const uniqueBrands = [...new Set(carData.map((car) => car.title.split(" ")[0]))];
  const uniqueTransmissions = [...new Set(carData.map((car) => car.transmission))];
  const uniqueYears = [...new Set(carData.map((car) => car.year))].sort((a, b) => b - a);
  const uniqueFuels = ["Gasolina", "Diésel", "Híbrido", "Eléctrico"];
  const uniqueDoors = [2, 4, 5];
  const priceRanges = ["10-40", "40-100", "100-200", "200+"];

  const toggleCarSelection = (id) => {
    setSelectedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Explora nuestras opciones</h1>
          <p className="text-gray-600 mt-2">Encuentra el vehículo ideal para ti</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <div className="bg-blue-900 text-white p-6 rounded-2xl w-full lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Filtrar carros</h2>
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Marca</h3>
                {uniqueBrands.map((b) => (
                  <label key={b} className="block">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleSelection(b, setSelectedBrands)}
                      className="mr-2"
                    />
                    {b}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Transmisión</h3>
                {uniqueTransmissions.map((t) => (
                  <label key={t} className="block">
                    <input
                      type="checkbox"
                      checked={selectedTransmissions.includes(t)}
                      onChange={() => toggleSelection(t, setSelectedTransmissions)}
                      className="mr-2"
                    />
                    {t}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Precio</h3>
                {priceRanges.map((r) => (
                  <label key={r} className="block">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(r)}
                      onChange={() => toggleSelection(r, setSelectedPriceRanges)}
                      className="mr-2"
                    />
                    {r} millones
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Año</h3>
                {uniqueYears.map((y) => (
                  <label key={y} className="block">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(y)}
                      onChange={() => toggleSelection(y, setSelectedYears)}
                      className="mr-2"
                    />
                    {y}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Combustible</h3>
                {uniqueFuels.map((f) => (
                  <label key={f} className="block">
                    <input
                      type="checkbox"
                      checked={selectedFuels.includes(f)}
                      onChange={() => toggleSelection(f, setSelectedFuels)}
                      className="mr-2"
                    />
                    {f}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Puertas</h3>
                {uniqueDoors.map((d) => (
                  <label key={d} className="block">
                    <input
                      type="checkbox"
                      checked={selectedDoors.includes(d)}
                      onChange={() => toggleSelection(d, setSelectedDoors)}
                      className="mr-2"
                    />
                    {d}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="w-full lg:w-3/4">
            <p className="text-sm text-gray-600 mb-4">
              {filteredCars.length} resultados encontrados
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
}
