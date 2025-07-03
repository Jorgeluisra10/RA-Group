"use client";

import Link from "next/link";
import { FaHome, FaCar, FaHeart } from "react-icons/fa";

export default function FavoritosContent({
  tab,
  setTab,
  favoritos,
  loading,
  favoritosFiltrados,
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  orderFilter,
  setOrderFilter,
  propertyTypeFilter,
  setPropertyTypeFilter,
  handleRemoveFavorite,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-1 text-center text-[var(--text-default)]">
        Tus Favoritos
      </h1>
      <p className="text-center mb-6 text-sm text-gray-600">
        Gestiona tus propiedades y vehículos guardados
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-3 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold ${
            tab === "property"
              ? "bg-[var(--blue-main)] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setTab("property")}
        >
          <FaHome />
          Propiedades
          <span className="ml-1 inline-block bg-white rounded-full text-[var(--blue-main)] font-bold px-2 text-xs leading-5">
            {favoritos.filter((f) => f.item_type === "property").length}
          </span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold ${
            tab === "car"
              ? "bg-[var(--blue-main)] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setTab("car")}
        >
          <FaCar />
          Vehículos
          <span className="ml-1 inline-block bg-white rounded-full text-[var(--blue-main)] font-bold px-2 text-xs leading-5">
            {favoritos.filter((f) => f.item_type === "car").length}
          </span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6 justify-between">
        <input
          type="search"
          placeholder="Buscar en favoritos..."
          className="flex-grow border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {tab === "property" && (
          <select
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="apartamento">Apartamentos</option>
            <option value="casa">Casas</option>
            <option value="oficina">Oficinas</option>
          </select>
        )}

        <select
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Todos los precios</option>
          <option value="low">Menor a 500.000.000</option>
          <option value="high">Mayor o igual a 500.000.000</option>
        </select>

        <select
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
        >
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguos</option>
        </select>

        <button
          type="button"
          className="text-sm px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => {
            setSearch("");
            setPriceFilter("all");
            setOrderFilter("recent");
            setPropertyTypeFilter("all");
          }}
        >
          × Limpiar
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="text-center text-gray-600 py-16">Cargando favoritos...</div>
      ) : favoritosFiltrados.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          No hay favoritos para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoritosFiltrados.map(({ id, detalle }) => {
            if (!detalle) return null;

            const isProp = tab === "property";
            const ruta = isProp ? `/propiedad/${detalle.id}` : `/vehiculo/${detalle.id}`;

            return (
              <div
                key={id}
                className="relative rounded-lg shadow-md border bg-white hover:shadow-lg transition p-4 flex flex-col"
              >
                <span
                  className={`inline-block mb-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                    isProp
                      ? detalle.tipo === "apartamento"
                        ? "bg-blue-400"
                        : detalle.tipo === "casa"
                        ? "bg-green-400"
                        : detalle.tipo === "oficina"
                        ? "bg-purple-400"
                        : "bg-gray-400"
                      : "bg-gray-600"
                  }`}
                >
                  {isProp
                    ? detalle.tipo?.charAt(0).toUpperCase() + detalle.tipo?.slice(1)
                    : "Vehículo"}
                </span>

                <div className="flex-grow flex items-center justify-center bg-gray-100 rounded mb-4 min-h-[130px]">
                  {isProp ? (
                    <FaHome className="text-gray-400 text-6xl" />
                  ) : (
                    <FaCar className="text-gray-400 text-6xl" />
                  )}
                </div>

                <h3 className="font-semibold text-[var(--text-default)] text-lg mb-1 line-clamp-2">
                  {detalle.title}
                </h3>

                <p className="text-yellow-500 font-bold text-lg mb-1">
                  ${Number(detalle.price).toLocaleString("es-CO")}
                </p>

                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {detalle.descripcion || detalle.modelo}
                </p>

                <div className="flex gap-2 mb-4 flex-wrap text-xs text-gray-600">
                  {isProp && detalle.habitaciones && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.habitaciones} Habitaciones
                    </span>
                  )}
                  {isProp && detalle.banos && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.banos} Baños
                    </span>
                  )}
                  {isProp && detalle.area && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.area} m²
                    </span>
                  )}
                  {detalle.ciudad && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.ciudad}
                    </span>
                  )}
                  {!isProp && detalle.modelo && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      Año {detalle.modelo}
                    </span>
                  )}
                  {!isProp && detalle.combustible && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.combustible}
                    </span>
                  )}
                  {!isProp && detalle.transmision && (
                    <span className="px-2 py-1 bg-gray-200 rounded">
                      {detalle.transmision}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex gap-2">
                  <Link
                    href={ruta}
                    className="flex-grow bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md text-center font-semibold"
                  >
                    Ver detalle
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(detalle.id)}
                    aria-label="Eliminar favorito"
                    className="flex items-center justify-center p-2 rounded-md border border-gray-300 hover:border-red-500 text-red-500 hover:text-red-600 transition"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}