"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FiltrosPropiedades() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    const { name, value } = e.target;

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // Asegura que tipo=propiedad siempre esté presente
    params.set("tipo", "propiedad");

    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-md bg-white">
      <select
        name="ciudad"
        onChange={handleChange}
        defaultValue={searchParams.get("ciudad") || ""}
        className="w-full border p-2 rounded"
      >
        <option value="">Ciudad</option>
        <option value="Bogotá">Bogotá</option>
        <option value="Medellín">Medellín</option>
        <option value="Chiquinquirá">Chiquinquirá</option>
        <option value="Cartagena">Cartagena</option>
      </select>

      <select
        name="tipo_propiedad"
        onChange={handleChange}
        defaultValue={searchParams.get("tipo_propiedad") || ""}
        className="w-full border p-2 rounded"
      >
        <option value="">Tipo de propiedad</option>
        <option value="Casa">Casa</option>
        <option value="Apartamento">Apartamento</option>
        <option value="Finca">Finca</option>
        <option value="Lote">Lote</option>
      </select>

      <input
        type="number"
        name="precio_min"
        placeholder="Precio mínimo"
        defaultValue={searchParams.get("precio_min") || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="precio_max"
        placeholder="Precio máximo"
        defaultValue={searchParams.get("precio_max") || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="habitaciones"
        onChange={handleChange}
        defaultValue={searchParams.get("habitaciones") || ""}
        className="w-full border p-2 rounded"
      >
        <option value="">Habitaciones</option>
        <option value="1">1 habitación</option>
        <option value="2">2 habitaciones</option>
        <option value="3">3 habitaciones</option>
        <option value="4">4 o más</option>
      </select>
    </div>
  );
}
