"use client";

import { getProperties } from "../../../../../../lib/api";
import { useEffect, useState } from "react";

export default function EditPropertyForm() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
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
        {properties.map((prop) => (
          <p key={prop.id}>{prop.id}</p>
        ))}
      </p>
    </div>
  );
}
