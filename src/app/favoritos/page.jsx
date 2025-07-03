"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import { FaHome, FaCar, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function FavoritosPage() {
  const { user, loadingSession } = useAuth();
  const [tab, setTab] = useState("property"); // 'property' o 'car'
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtros
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // all, low, high
  const [orderFilter, setOrderFilter] = useState("recent"); // recent, oldest

  // Para propiedades: filtro tipo
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all"); // all, apartamento, casa, oficina

  // Carga los favoritos del usuario según tab
  useEffect(() => {
    if (!user) return;
    fetchFavoritos();
  }, [user, tab]);

  async function fetchFavoritos() {
    setLoading(true);
    try {
      // Trae favoritos del usuario y tipo seleccionado
      const { data: favs, error: favError } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .eq("item_type", tab)
        .order("created_at", { ascending: false });

      if (favError) throw favError;

      if (!favs || favs.length === 0) {
        setFavoritos([]);
        setLoading(false);
        return;
      }

      // Dependiendo del tipo, traemos detalles de propiedades o carros
      if (tab === "property") {
        const itemIds = favs.map((f) => f.item_id);
        const { data: properties, error: propError } = await supabase
          .from("properties")
          .select("*")
          .in("id", itemIds);

        if (propError) throw propError;

        // Unir favoritos con datos completos
        const favoritosCompletos = favs.map((fav) => {
          const detalle = properties.find((p) => p.id === fav.item_id);
          return { ...fav, detalle };
        });

        setFavoritos(favoritosCompletos);
      } else if (tab === "car") {
        const itemIds = favs.map((f) => f.item_id);
        const { data: cars, error: carError } = await supabase
          .from("cars")
          .select("*")
          .in("id", itemIds);

        if (carError) throw carError;

        const favoritosCompletos = favs.map((fav) => {
          const detalle = cars.find((c) => c.id === fav.item_id);
          return { ...fav, detalle };
        });

        setFavoritos(favoritosCompletos);
      }
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      toast.error("Error cargando favoritos");
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  }

  // Función para eliminar favorito
  async function handleRemoveFavorite(itemId) {
    if (!user) return;
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId)
        .eq("item_type", tab);

      if (error) throw error;

      toast.success("Eliminado de favoritos");
      fetchFavoritos();
    } catch {
      toast.error("Error eliminando favorito");
    }
  }

  // Filtrado local en frontend
  const favoritosFiltrados = useMemo(() => {
    let items = favoritos.filter((fav) => fav.detalle !== undefined);

    if (search.trim()) {
      const s = search.trim().toLowerCase();
      items = items.filter((fav) => {
        const d = fav.detalle;
        if (tab === "property") {
          return (
            (d.title?.toLowerCase().includes(s) ||
              d.descripcion?.toLowerCase().includes(s) ||
              d.barrio?.toLowerCase().includes(s) ||
              d.ciudad?.toLowerCase().includes(s)) ?? false
          );
        } else {
          // Carro: título, ciudad, marca, modelo
          return (
            (d.title?.toLowerCase().includes(s) ||
              d.ciudad?.toLowerCase().includes(s) ||
              d.marca?.toLowerCase().includes(s) ||
              d.modelo?.toLowerCase().includes(s)) ?? false
          );
        }
      });
    }

    if (tab === "property" && propertyTypeFilter !== "all") {
      items = items.filter(
        (fav) => fav.detalle.tipo?.toLowerCase() === propertyTypeFilter
      );
    }

    if (priceFilter !== "all") {
      items = items.filter((fav) => {
        const precio = Number(fav.detalle.price ?? fav.detalle.precio ?? 0);
        if (priceFilter === "low") return precio < 500000000;
        if (priceFilter === "high") return precio >= 500000000;
        return true;
      });
    }

    if (orderFilter === "recent") {
      items = items.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (orderFilter === "oldest") {
      items = items.sort((a, b) =>
        new Date(a.created_at) - new Date(b.created_at)
      );
    }

    return items;
  }, [favoritos, search, propertyTypeFilter, priceFilter, orderFilter, tab]);

  if (loadingSession) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">
        Debes iniciar sesión para ver tus favoritos.
      </div>
    );
  }

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
          aria-label="Mostrar propiedades favoritas"
        >
          <FaHome />
          Propiedades{" "}
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
          aria-label="Mostrar vehículos favoritos"
        >
          <FaCar />
          Vehículos{" "}
          <span className="ml-1 inline-block bg-white rounded-full text-[var(--blue-main)] font-bold px-2 text-xs leading-5">
            {favoritos.filter((f) => f.item_type === "car").length}
          </span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6 justify-between">
        <input
          type="search"
          placeholder="Buscar en favoritos..."
          className="flex-grow border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Solo propiedades tienen filtro tipo */}
        {tab === "property" && (
          <select
            className="border border-gray-300 rounded-md py-2 px-3 text-sm"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
            aria-label="Filtrar por tipo de propiedad"
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
          aria-label="Filtrar por precio"
        >
          <option value="all">Todos los precios</option>
          <option value="low">Menor a 500.000.000</option>
          <option value="high">Mayor o igual a 500.000.000</option>
        </select>

        <select
          className="border border-gray-300 rounded-md py-2 px-3 text-sm"
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          aria-label="Ordenar favoritos"
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
          aria-label="Limpiar filtros"
        >
          × Limpiar
        </button>
      </div>

      {/* Lista favoritos */}
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

            if (tab === "property") {
              return (
                <div
                  key={id}
                  className="relative rounded-lg shadow-md border bg-white hover:shadow-lg transition p-4 flex flex-col"
                >
                  {/* Etiqueta tipo */}
                  <span
                    className={`inline-block mb-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                      detalle.tipo === "apartamento"
                        ? "bg-blue-400"
                        : detalle.tipo === "casa"
                        ? "bg-green-400"
                        : detalle.tipo === "oficina"
                        ? "bg-purple-400"
                        : "bg-gray-400"
                    }`}
                  >
                    {detalle.tipo?.charAt(0).toUpperCase() + detalle.tipo?.slice(1)}
                  </span>

                  {/* Imagen placeholder */}
                  <div className="flex-grow flex items-center justify-center bg-gray-100 rounded mb-4 min-h-[130px]">
                    {/* Puedes poner aquí una imagen si tienes */}
                    <FaHome className="text-gray-400 text-6xl" />
                  </div>

                  <h3 className="font-semibold text-[var(--text-default)] text-lg mb-1 line-clamp-2">
                    {detalle.title}
                  </h3>

                  <p className="text-yellow-500 font-bold text-lg mb-1">
                    ${Number(detalle.price).toLocaleString("es-CO")}
                  </p>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {detalle.descripcion}
                  </p>

                  <div className="flex gap-2 mb-4 flex-wrap text-xs text-gray-600">
                    {detalle.habitaciones && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.habitaciones} Habitaciones
                      </span>
                    )}
                    {detalle.banos && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.banos} Baños
                      </span>
                    )}
                    {detalle.area && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.area} m²
                      </span>
                    )}
                    {(detalle.barrio || detalle.ciudad) && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.barrio
                          ? detalle.barrio + (detalle.ciudad ? ", " + detalle.ciudad : "")
                          : detalle.ciudad}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/propiedad/${detalle.id}`}
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
            }

            // Vehículos
            if (tab === "car") {
              return (
                <div
                  key={id}
                  className="relative rounded-lg shadow-md border bg-white hover:shadow-lg transition p-4 flex flex-col"
                >
                  {/* Etiqueta tipo vehículo */}
                  <span className="inline-block mb-2 px-2 py-1 rounded text-xs font-semibold text-white bg-gray-600">
                    Vehículo
                  </span>

                  {/* Imagen placeholder */}
                  <div className="flex-grow flex items-center justify-center bg-gray-100 rounded mb-4 min-h-[130px]">
                    {/* Puedes poner aquí una imagen si tienes */}
                    <FaCar className="text-gray-400 text-6xl" />
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
                    {detalle.combustible && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.combustible}
                      </span>
                    )}
                    {detalle.transmision && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.transmision}
                      </span>
                    )}
                    {detalle.ciudad && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {detalle.ciudad}
                      </span>
                    )}
                    {detalle.modelo && (
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        Año {detalle.modelo}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/vehiculo/${detalle.id}`}
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
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
