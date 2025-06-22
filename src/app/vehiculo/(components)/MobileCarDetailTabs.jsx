"use client";

import { useState } from "react";
import FuelEfficiencyCard from "./FuelEfficiencyCard";
import {
  Car,
  MapPin,
  Settings,
  Gauge,
  DoorOpen,
} from "lucide-react";

export default function MobileCarDetailTabs({ carro }) {
  const [tab, setTab] = useState("descripcion");

  return (
    <div className="md:hidden mt-8">
      <div className="flex justify-around border-b border-[var(--gray-border)]">
        {[
          { key: "descripcion", label: "Descripción" },
          { key: "consumo", label: "Consumo" },
          { key: "caracteristicas", label: "Características" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`pb-2 text-sm font-medium transition-colors duration-300 border-b-2 ${
              tab === key
                ? "border-[var(--blue-main)] text-[var(--blue-main)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--blue-main)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4 animate-fade-in-up">
        {tab === "descripcion" && (
          <div className="bg-[var(--white)] rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-default)] border-b pb-2">
              Descripción del Vehículo
            </h2>
            <p className="text-[var(--text-secondary)] whitespace-pre-line">
              {carro.description}
            </p>
          </div>
        )}

        {tab === "consumo" && (
          <FuelEfficiencyCard
            car={{
              fuel_type: carro.combustible,
              fuel_efficiency_city: carro.ciudad_consumo,
              fuel_efficiency_highway: carro.carretera_consumo,
              tank_capacity: carro.capacidad_tanque,
            }}
          />
        )}

        {tab === "caracteristicas" && (
          <div className="bg-[var(--white)] rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-default)] border-b pb-2">
              Características del Vehículo
            </h2>
            <div className="grid grid-cols-2 gap-4 text-[var(--text-secondary)]">
              {[
                { icon: Car, label: "Modelo", value: carro.modelo },
                { icon: MapPin, label: "Ubicación", value: carro.direccion },
                { icon: Gauge, label: "Motor", value: carro.combustible },
                { icon: Settings, label: "Transmisión", value: carro.transmision },
                { icon: DoorOpen, label: "Puertas", value: carro.puertas },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--gray-hover)]"
                >
                  <Icon className="w-5 h-5 icon-color" />
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
