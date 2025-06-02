"use client";

import { useEffect, useState } from "react";
import { getProperties, deleteProperty } from "../../../../lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { PlusCircle, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

const pageSize = 50;

export default function PropiedadesPage() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");

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

  const paginatedProperties = properties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(properties.length / pageSize);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProperty(id);
      alert("Eliminado correctamente.");
      // Actualizar lista
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error.message);
      alert("Ocurrió un error al eliminar.");
    }
  };

  const Button = ({ children, className = "", ...props }) => (
    <button
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const Badge = ({ children, className = "" }) => (
    <span
      className={`inline-block text-xs font-semibold px-2 py-1 rounded-xl ${className}`}
    >
      {children}
    </span>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-4 space-y-2 ${className}`}>{children}</div>
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#0B1D3B]">
          Propiedades Publicadas
        </h1>
        <Button className="bg-[#0B1D3B] text-white hover:bg-[#13294b] flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Agregar Nueva Propiedad
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Mostrando {paginatedProperties.length} de {properties.length}{" "}
          propiedades
        </p>
        <div className="flex gap-2">
          <Button
            className={`${
              view === "grid" ? "bg-[#0B1D3B] text-white" : "border bg-white"
            }`}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            className={`${
              view === "list" ? "bg-[#0B1D3B] text-white" : "border bg-white"
            }`}
            onClick={() => setView("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        className={`grid ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {paginatedProperties.map((prop) => (
          <motion.div
            key={prop.id}
            className="bg-white rounded-2xl border shadow hover:shadow-md transition relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {view === "grid" && prop.images && prop.images.length > 0 ? (
              <img
                src={prop.images[0]}
                alt={prop.title}
                className="w-full h-44 object-cover"
              />
            ) : view === "grid" ? (
              <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                Sin imagen
              </div>
            ) : null}
            <CardContent>
              <Badge
                className={`absolute top-2 left-2 ${
                  prop.status === "Activo" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {prop.status}
              </Badge>
              <h3 className="text-md font-semibold text-[#0B1D3B]">
                {prop.title}
              </h3>
              <p className="text-sm text-gray-500">{prop.location}</p>
              <p className="text-[#0B1D3B] text-lg font-bold">
                ${prop.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Publicado: {format(new Date(prop.created_at), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-4 mt-2">
                <Link
                  href={`/admin/propiedades/editar-propiedad/${prop.id}`}
                  className="px-4 py-2 rounded-xl border bg-white text-gray-800 hover:bg-gray-50 text-sm font-medium transition"
                >
                  Editar
                </Link>
                <Button
                  onClick={() => handleDelete(prop.id)}
                  className="bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              className={`text-sm ${
                currentPage === index + 1
                  ? "bg-[#0B1D3B] text-white"
                  : "border bg-white"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
