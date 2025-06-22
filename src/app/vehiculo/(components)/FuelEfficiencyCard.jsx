"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CarFront, Building2, Route } from "lucide-react";

const FuelEfficiencyCard = ({ car }) => {
  const [usageType, setUsageType] = useState("mixto");
  const [stats, setStats] = useState(null);

  const pricePerGallonMap = {
    "Gasolina Corriente": 15827,
    "Gasolina Extra": 19500,
    "Diésel": 9065,
    "Gas Natural": 10000,
  };

  useEffect(() => {
    if (!car) return;

    const {
      fuel_type = "Gasolina Corriente",
      tank_capacity = 45,
      fuel_efficiency_city = 12,
      fuel_efficiency_highway = 16,
    } = car;

    const pricePerGallon = pricePerGallonMap[fuel_type] || 15827;
    const costPerLiter = pricePerGallon / 3.785;

    let kmPerLiter;

    switch (usageType) {
      case "ciudad":
        kmPerLiter = fuel_efficiency_city;
        break;
      case "carretera":
        kmPerLiter = fuel_efficiency_highway;
        break;
      default:
        kmPerLiter = (fuel_efficiency_city + fuel_efficiency_highway) / 2;
    }

    const litersPer100 = 100 / kmPerLiter;
    const costPer100km = litersPer100 * costPerLiter;
    const fillCost = costPerLiter * tank_capacity;
    const autonomy = kmPerLiter * tank_capacity;

    setStats({
      fuelType: fuel_type,
      pricePerGallon,
      costPerLiter: costPerLiter.toFixed(0),
      kmPerLiter: kmPerLiter.toFixed(1),
      litersPer100: litersPer100.toFixed(2),
      costPer100km: costPer100km.toFixed(0),
      fillCost: fillCost.toFixed(0),
      autonomy: autonomy.toFixed(0),
    });
  }, [car, usageType]);

  if (!car || !stats) {
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
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full overflow-hidden"
    >
      {/* Difuminado top/bottom */}
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-10 rounded-t-2xl" />
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10 rounded-b-2xl" />

      <h3 className="text-xl font-bold text-gray-800 mb-4 z-20 relative">Consumo y Autonomía</h3>

      <div className="mb-4 relative z-20">
        <p className="text-sm font-medium text-gray-600 mb-1">Tipo de combustible:</p>
        <p className="font-semibold text-blue-600">
          {stats.fuelType} (${Number(stats.pricePerGallon).toLocaleString()} COP/galón)
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 mb-4 relative z-20">
        {[
          { label: "Ciudad", value: "ciudad", icon: Building2 },
          { label: "Carretera", value: "carretera", icon: Route },
          { label: "Mixto", value: "mixto", icon: CarFront },
        ].map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setUsageType(value)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              usageType === value
                ? value === "ciudad"
                  ? "bg-blue-100 text-blue-700"
                  : value === "carretera"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 relative z-20">
        <div>
          <p className="font-medium">Consumo:</p>
          <p>{stats.kmPerLiter} km/L</p>
        </div>
        <div>
          <p className="font-medium">Consumo x 100km:</p>
          <p>{stats.litersPer100} L/100km</p>
        </div>
        <div>
          <p className="font-medium">Costo x 100km:</p>
          <p>${Number(stats.costPer100km).toLocaleString()} COP</p>
        </div>
        <div>
          <p className="font-medium">Capacidad tanque:</p>
          <p>{car.tank_capacity} L</p>
        </div>
        <div>
          <p className="font-medium">Costo de llenado:</p>
          <p className="text-green-700 font-semibold">
            ${Number(stats.fillCost).toLocaleString()} COP
          </p>
        </div>
        <div>
          <p className="font-medium">Autonomía estimada:</p>
          <p>{stats.autonomy} km</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FuelEfficiencyCard;
