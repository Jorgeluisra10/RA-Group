"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProperties } from "../../../../context/PropertyContext";

export default function PropertiesPage() {
  const { properties, eliminarPropiedad } = useProperties();
  const router = useRouter();

  const handleEliminar = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) {
      eliminarPropiedad(id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Panel de Propiedades
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No hay propiedades agregadas aún.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-blue-900 text-left">
                <th className="p-3">Título</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Dirección</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr
                  key={prop.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{prop.title}</td>
                  <td className="p-3">€{prop.price}</td>
                  <td className="p-3">{prop.direccion || "No disponible"}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/propiedades/${prop.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/admin/propiedades/editar-propiedad/${prop.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleEliminar(prop.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
