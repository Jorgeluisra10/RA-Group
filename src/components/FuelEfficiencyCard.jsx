"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CarFront, Building2, Route } from "lucide-react";

const FuelEfficiencyCard = ({
  fuelType = "Gasolina Corriente",
  pricePerGallon = 15827,
  cityKmPerLiter = 12,
  highwayKmPerLiter = 16,
  tankCapacity = 45,
}) => {
  const [usageType, setUsageType] = useState("mixto");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let kmPerLiter;

    switch (usageType) {
      case "ciudad":
        kmPerLiter = cityKmPerLiter;
        break;
      case "carretera":
        kmPerLiter = highwayKmPerLiter;
        break;
      default:
        kmPerLiter = (cityKmPerLiter + highwayKmPerLiter) / 2;
    }

    const litersPer100 = 100 / kmPerLiter;
    const autonomy = tankCapacity * kmPerLiter;
    const costPerLiter = pricePerGallon / 3.785;
    const fillCost = costPerLiter * tankCapacity;
    const costPerKm = costPerLiter / kmPerLiter;

    setStats({
      kmPerLiter: kmPerLiter.toFixed(1),
      litersPer100: litersPer100.toFixed(2),
      autonomy: autonomy.toFixed(0),
      fillCost: fillCost.toFixed(0),
      costPerKm: costPerKm.toFixed(0),
    });
  }, [usageType, cityKmPerLiter, highwayKmPerLiter, tankCapacity, pricePerGallon]);

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full text-gray-500 text-center">
        Calculando consumo...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Consumo y Autonomía</h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600 mb-1">Tipo de combustible:</p>
        <p className="font-semibold text-blue-600">
          {fuelType} (${pricePerGallon.toLocaleString()} COP/galón)
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 mb-4">
        <button
          onClick={() => setUsageType("ciudad")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            usageType === "ciudad"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-blue-50"
          }`}
        >
          <Building2 className="w-4 h-4" />
          Ciudad
        </button>
        <button
          onClick={() => setUsageType("carretera")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            usageType === "carretera"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600 hover:bg-green-50"
          }`}
        >
          <Route className="w-4 h-4" />
          Carretera
        </button>
        <button
          onClick={() => setUsageType("mixto")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            usageType === "mixto"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600 hover:bg-yellow-50"
          }`}
        >
          <CarFront className="w-4 h-4" />
          Mixto
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium">Consumo:</p>
          <p>{stats.kmPerLiter} km/L</p>
        </div>
        <div>
          <p className="font-medium">Consumo x 100km:</p>
          <p>{stats.litersPer100} L/100km</p>
        </div>
        <div>
          <p className="font-medium">Capacidad tanque:</p>
          <p>{tankCapacity} L</p>
        </div>
        <div>
          <p className="font-medium">Costo de llenado:</p>
          <p className="text-green-700 font-semibold">
            ${Number(stats.fillCost).toLocaleString()} COP
          </p>
        </div>
        <div className="col-span-2">
          <p className="font-medium">Autonomía estimada:</p>
          <p>{stats.autonomy} km</p>
        </div>
        <div className="col-span-2">
          <p className="font-medium text-green-700">Costo por kilómetro:</p>
          <p className="text-lg font-bold text-green-600">
            ${Number(stats.costPerKm).toLocaleString()} COP/km
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FuelEfficiencyCard;
