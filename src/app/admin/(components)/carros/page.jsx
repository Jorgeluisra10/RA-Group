"use client";

import { useEffect, useState, useMemo } from "react";
import { getCars, deleteCar } from "../../../../lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { PlusCircle, LayoutGrid, List, X } from "lucide-react";
import { useRouter } from "next/navigation";

const pageSize = 20;

export default function CarrosPage() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const router = useRouter();

  const formatCOP = (value) => "$" + value.toLocaleString("es-CO");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
        const uniqueLocations = [...new Set(data.map((car) => car.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error al obtener carros:", error);
      }
    };
    fetchCars();
  }, []);

  const priceOptions = [
    0, 10000000, 20000000, 30000000, 50000000, 70000000,
    100000000, 150000000, 200000000, 300000000, 500000000
  ];

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) =>
        `${car.title} ${car.marca}`.toLowerCase().includes(search.toLowerCase())
      )
      .filter((car) => (minPrice ? car.price >= parseInt(minPrice) : true))
      .filter((car) => (maxPrice ? car.price <= parseInt(maxPrice) : true))
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [cars, search, minPrice, maxPrice, sortOrder]);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredCars.length / pageSize);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar este elemento?");
    if (!confirm) return;

    try {
      await deleteCar(id);
      alert("Eliminado correctamente.");
      setCars((prev) => prev.filter((c) => c.id !== id));
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
      className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${className}`}
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

  const selectClass =
    "rounded-xl px-3 py-2 border text-sm bg-[var(--white)] text-[var(--text-default)] border-[var(--input-border)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]";

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--btn-secondary)]">Carros Publicados</h1>
        <Button
          onClick={() => router.push("/admin")}
          className="bg-[var(--blue-main)] text-white hover:bg-[var(--blue-hover)] flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Agregar Nuevo Carro
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
        <input
          type="text"
          placeholder="Buscar por título o marca..."
          className={`col-span-1 md:col-span-2 ${selectClass}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className={selectClass}
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Desde</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {formatCOP(price)}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Hasta</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {formatCOP(price)}
            </option>
          ))}
          <option value="10000000000">+500.000.000</option>
        </select>
        <select
          className={selectClass}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
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

      {/* Controles de vista */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Mostrando {paginatedCars.length} de {filteredCars.length} carros
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

      {/* Lista de carros */}
      <div
        className={`grid ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {paginatedCars.map((car) => (
          <motion.div
            key={car.id}
            className="rounded-2xl border border-[var(--gray-border)] bg-[var(--white)] shadow-sm hover:shadow-md transition relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {view === "grid" && car.images?.length > 0 ? (
              <img src={car.images[0]} alt={car.title} className="w-full h-44 object-cover" />
            ) : view === "grid" ? (
              <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                Sin imagen
              </div>
            ) : null}
            <CardContent>
              <Badge
                className={`absolute top-2 left-2 ${
                  car.status === "Activo" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {car.status}
              </Badge>
              <h3 className="text-md font-semibold text-[var(--text-default)]">{car.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{car.location}</p>
              <p className="text-[var(--btn-primary)] text-lg font-bold">{formatCOP(car.price)}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Publicado: {format(new Date(car.created_at), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => router.push(`/admin/carros/editar-carro/${car.id}`)}
                  className="border bg-[var(--white)] text-[var(--text-default)] hover:bg-[var(--gray-hover)] text-sm"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(car.id)}
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
