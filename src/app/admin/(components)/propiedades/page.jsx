"use client";

import { useEffect, useState, useMemo } from "react";
import { getProperties, deleteProperty } from "../../../../lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { PlusCircle, LayoutGrid, List, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pageSize = 30;

export default function PropiedadesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const priceOptions = [
    0, 100_000_000, 200_000_000, 300_000_000, 400_000_000, 500_000_000,
    600_000_000, 800_000_000, 1_000_000_000, 2_000_000_000,
  ];

  const formatCOP = (value) => "$" + value.toLocaleString("es-CO");

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (minPrice ? p.price >= parseInt(minPrice) : true))
      .filter((p) => (maxPrice ? p.price <= parseInt(maxPrice) : true))
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [properties, search, minPrice, maxPrice, sortOrder]);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredProperties.length / pageSize);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) return;
    try {
      await deleteProperty(id);
      alert("Eliminado correctamente.");
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error.message);
      alert("Ocurrió un error al eliminar.");
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const Button = ({ children, className = "", ...props }) => (
    <button
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  const Badge = ({ children, className = "" }) => (
    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-xl ${className}`}>
      {children}
    </span>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-4 space-y-2 ${className}`}>{children}</div>
  );

  const selectClass = "rounded-xl px-3 py-2 border text-sm bg-[var(--white)] text-[var(--text-default)] border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]";

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--btn-secondary)]">Propiedades Publicadas</h1>
        <Button
          onClick={() => router.push("/admin")}
          className="bg-[var(--blue-main)] text-white hover:bg-[var(--blue-hover)] flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Agregar Nueva Propiedad
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
        <input
          type="text"
          placeholder="Buscar por título..."
          className={`col-span-1 md:col-span-2 ${selectClass}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select className={selectClass} value={minPrice} onChange={(e) => {
          setMinPrice(e.target.value); setCurrentPage(1);
        }}>
          <option value="">Desde</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>{formatCOP(price)}</option>
          ))}
        </select>
        <select className={selectClass} value={maxPrice} onChange={(e) => {
          setMaxPrice(e.target.value); setCurrentPage(1);
        }}>
          <option value="">Hasta</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>{formatCOP(price)}</option>
          ))}
          <option value="10000000000">+1.000.000.000</option>
        </select>
        <select className={selectClass} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Precio: Mayor a menor</option>
          <option value="asc">Precio: Menor a mayor</option>
        </select>
      </div>

      {/* Limpiar filtros */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={handleClearFilters}
          className="text-[var(--text-default)] border hover:bg-[var(--gray-hover)] flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Limpiar filtros
        </Button>
      </div>

      {/* Vista grid o lista */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Mostrando {paginatedProperties.length} de {filteredProperties.length} propiedades
        </p>
        <div className="flex gap-2">
          {["grid", "list"].map((type) => (
            <Button
              key={type}
              className={`${
                view === type
                  ? "bg-[var(--blue-main)] text-white"
                  : "border bg-[var(--white)] text-[var(--text-default)]"
              }`}
              onClick={() => setView(type)}
            >
              {type === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      </div>

      {/* Propiedades */}
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
            className="rounded-2xl border border-[var(--gray-border)] bg-[var(--white)] shadow-sm hover:shadow-md transition relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {view === "grid" && prop.images?.length > 0 ? (
              <img src={prop.images[0]} alt={prop.title} className="w-full h-44 object-cover" />
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
              <h3 className="text-md font-semibold text-[var(--text-default)]">{prop.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{prop.location}</p>
              <p className="text-[var(--btn-primary)] text-lg font-bold">{formatCOP(prop.price)}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Publicado: {format(new Date(prop.created_at), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-4 mt-2">
                <Link
                  href={`/admin/propiedades/editar-propiedad/${prop.id}`}
                  className="px-4 py-2 rounded-xl border bg-[var(--white)] text-[var(--text-default)] hover:bg-[var(--gray-hover)] text-sm font-medium transition"
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

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              className={`text-sm ${
                currentPage === index + 1
                  ? "bg-[var(--blue-main)] text-white"
                  : "border bg-[var(--white)] text-[var(--text-default)]"
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
