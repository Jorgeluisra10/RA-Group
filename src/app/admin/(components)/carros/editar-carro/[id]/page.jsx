"use client";

import { getCars } from "../../../../../../lib/api";
import { useEffect, useState } from "react";

export default function EditPropertyForm() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Componente Editar</h1>
      <p>
        {cars.map((car) => (
          <p key={car.id}>{car.id}</p>
        ))}
      </p>
    </div>
  );
}
