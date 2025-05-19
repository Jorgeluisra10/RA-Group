"use client";

import { useEffect, useState } from "react";
import { getCars } from "../../../../lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";

const pageSize = 20;

export default function CarrosPage() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [locations, setLocations] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    status: "",
    date: "",
  });

  const router = useRouter();

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

  const filteredCars = cars.filter((car) => {
    const matchesTitle = car.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const matchesLocation = filters.location
      ? car.location === filters.location
      : true;
    const matchesStatus = filters.status ? car.status === filters.status : true;
    const matchesDate = filters.date
      ? format(new Date(car.created_at), "dd/MM/yyyy") === filters.date
      : true;
    return matchesTitle && matchesLocation && matchesStatus && matchesDate;
  });

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredCars.length / pageSize);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
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

  const Input = ({ className = "", ...props }) => (
    <input
      className={`border px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0B1D3B] ${className}`}
      {...props}
    />
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
        <h1 className="text-2xl font-bold text-[#0B1D3B]">Carros Publicados</h1>
        <Button className="bg-[#0B1D3B] text-white hover:bg-[#13294b] flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Agregar Nuevo Carro
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-end">
        <Input
          placeholder="Buscar carro..."
          value={filters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          className="w-48"
        />
        <select
          className="border rounded-xl px-2 py-2 text-sm"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">Todas las ubicaciones</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          className="border rounded-xl px-2 py-2 text-sm"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <div className="relative">
          <Input
            type="text"
            placeholder="dd/mm/aaaa"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="pr-10 w-36"
          />
          <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button
          className="border bg-white hover:bg-gray-50"
          onClick={() =>
            setFilters({ title: "", location: "", status: "", date: "" })
          }
        >
          Limpiar filtros
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Mostrando {paginatedCars.length} de {filteredCars.length} carros
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
        {paginatedCars.map((car) => (
          <motion.div
            key={car.id}
            className="bg-white rounded-2xl border shadow hover:shadow-md transition relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {view === "grid" && car.images && car.images.length > 0 ? (
              <img
                src={car.images[0]}
                alt={car.title}
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
                  car.status === "Activo" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {car.status}
              </Badge>
              <h3 className="text-md font-semibold text-[#0B1D3B]">
                {car.title}
              </h3>
              <p className="text-sm text-gray-500">{car.location}</p>
              <p className="text-[#0B1D3B] text-lg font-bold">
                €{car.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Publicado: {format(new Date(car.created_at), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  className="border bg-white text-gray-800 hover:bg-gray-50 text-sm"
                  onClick={() =>
                    router.push(`/admin/carros/editar-carro/${car.id}`)
                  }
                >
                  Editar
                </Button>

                <Button className="bg-red-600 text-white hover:bg-red-700 text-sm">
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
