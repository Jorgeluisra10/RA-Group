"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { PlusCircle, LayoutGrid, List, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext"; // ✅ AGREGADO

const pageSize = 50;

export default function PropiedadesAgentePage() {
  const { user, loading } = useAuth(); // ✅ AGREGADO
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return; // ✅ Esperar a que cargue el usuario

    const fetchUserProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          property_images (
            url
          )
        `
        )
        .eq("agente", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const normalized = data.map((p) => ({
          ...p,
          images: p.property_images?.map((img) => img.url) ?? [],
        }));

        setProperties(normalized);
      } else {
        console.error("Error al obtener propiedades:", error);
      }
    };

    fetchUserProperties();
  }, [user, loading]); // ✅ Incluir user y loading

  const paginatedProperties = properties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(properties.length / pageSize);

  const handleSolicitudBaja = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de solicitar la baja de esta propiedad?"
    );
    if (!confirm) return;

    try {
      const { error } = await supabase
        .from("properties")
        .update({ estado: "Solicitud de baja" })
        .eq("id", id);

      if (error) throw error;

      alert("Solicitud de baja enviada con éxito.");
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: "Solicitud de baja" } : p))
      );
    } catch (error) {
      alert("Ocurrió un error al enviar la solicitud.");
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
        <h1 className="text-2xl font-bold text-[var(--blue-main)]">
          Mis Propiedades Publicadas
        </h1>
        <Button
          onClick={() => router.push("/agente/publicar-propiedad")}
          className="bg-[var(--blue-main)] text-white hover:bg-[var(--blue-hover)] flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Agregar Nueva Propiedad
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Mostrando {paginatedProperties.length} de {properties.length} propiedades
        </p>
        <div className="flex gap-2">
          <Button
            className={`${
              view === "grid"
                ? "bg-[var(--blue-main)] text-white"
                : "border bg-[var(--white)] text-[var(--text-default)]"
            }`}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            className={`${
              view === "list"
                ? "bg-[var(--blue-main)] text-white"
                : "border bg-[var(--white)] text-[var(--text-default)]"
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
            className="bg-[var(--white)] text-[var(--text-default)] rounded-2xl border shadow hover:shadow-md transition relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {view === "grid" && prop.images && prop.images.length > 0 ? (
              <img
                src={prop.images[0]}
                alt={prop.title}
                className="w-full h-44 object-cover"
              />
            ) : (
              <div className="w-full h-44 bg-[var(--gray-border)] flex items-center justify-center text-[var(--text-secondary)] text-sm">
                Sin imagen
              </div>
            )}
            <CardContent>
              <Badge
                className={`absolute top-2 left-2 ${
                  prop.status === "Activo" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {prop.status}
              </Badge>
              <h3 className="text-md font-semibold text-[var(--blue-main)]">
                {prop.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {prop.ciudad}, {prop.barrio}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {prop.tipo} | {prop.area} m² | {prop.habitaciones} hab | {prop.banos} baños
              </p>
              <p className="text-[var(--blue-main)] text-lg font-bold">
                ${prop.price.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Publicado: {format(new Date(prop.created_at), "dd/MM/yyyy")}
              </p>
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => handleSolicitudBaja(prop.id)}
                  className="bg-red-600 text-white hover:bg-red-700 text-sm flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                  Solicitar baja
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
