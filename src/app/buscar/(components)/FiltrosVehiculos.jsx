"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FiltrosVehiculos() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(e.target.name, e.target.value);
    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <select name="marca" onChange={handleChange} defaultValue={searchParams.get("marca") || ""}>
        <option value="">Marca</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
      </select>

      <input
        name="precio_min"
        type="number"
        placeholder="Precio mínimo"
        defaultValue={searchParams.get("precio_min") || ""}
        onChange={handleChange}
      />
      <input
        name="precio_max"
        type="number"
        placeholder="Precio máximo"
        defaultValue={searchParams.get("precio_max") || ""}
        onChange={handleChange}
      />
    </div>
  );
}
