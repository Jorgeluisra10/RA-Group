'use client';
import { useProperties } from "../../../../context/PropertyContext";

export default function PropertiesPage() {
  const { properties } = useProperties();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Panel de Propiedades</h1>

      {properties.length === 0 ? (
        <p className="text-gray-500">No hay propiedades agregadas aún.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Título</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.id} className="text-sm">
                <td className="p-2 border">{prop.title}</td>
                <td className="p-2 border">€{prop.price}</td>
                <td className="p-2 border">{prop.direccion || "No disponible"}</td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
