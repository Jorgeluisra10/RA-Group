"use client";

import { useEffect, useState } from "react";
import { getSolicitudes } from "../../../../lib/api";

export default function ClientesPage() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        setLoading(true);
        const data = await getSolicitudes();
        setSolicitudes(data);
      } catch (error) {
        console.error("Error al cargar solicitudes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerSolicitudes();
  }, []);

  return (
    <section className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-[#0f1c46] mb-6">
        Solicitudes de publicación
      </h1>

      {loading ? (
        <p className="text-gray-600">Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes por el momento.</p>
      ) : (
        <ul className="space-y-4">
          {solicitudes.map((s) => (
            <li
              key={s.id || s.created_at}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold text-[#0f1c46]">{s.nombre}</p>
              <p className="text-sm text-gray-700">
                <strong>Correo:</strong> {s.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Teléfono:</strong> {s.telefono}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                <strong>Detalles:</strong> {s.detalles}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Enviado:{" "}
                {s.created_at
                  ? new Date(s.created_at).toLocaleString()
                  : "Fecha no disponible"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
