"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useAuth } from "../../../../context/AuthContext";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, FileText } from "lucide-react";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("useEffect ejecutado", { user, loading });

    const fetchClientes = async () => {
      if (loading || !user) {
        console.log("No hay user o sigue cargando:", { loading, user });
        return;
      }

      console.log("User ID dentro de fetchClientes:", user.id);

      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("agente", user.id)
        .order("derivado_fecha", { ascending: false });

      if (error) {
        console.error("Error al cargar clientes:", error);
      } else {
        setClientes(data);
      }
    };

    fetchClientes();
  }, [user, loading]);

  const getIniciales = (nombre) =>
    nombre
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const estadosColor = {
    Activo: "bg-green-100 text-green-800",
    Pendiente: "bg-yellow-100 text-yellow-700",
    "En proceso": "bg-blue-100 text-blue-700",
    VIP: "bg-purple-100 text-purple-700",
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-[var(--text-secondary)]">
        Cargando clientes...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filtros */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="px-4 py-2 rounded-lg border text-sm w-full sm:w-[250px] text-[var(--text-default)] border-[var(--gray-border)] bg-[var(--background)]"
        />
        <div className="flex flex-wrap gap-2 items-center">
          <select className="px-3 py-2 rounded-lg border text-sm text-[var(--text-default)] border-[var(--gray-border)] bg-[var(--background)]">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>VIP</option>
          </select>
          <select className="px-3 py-2 rounded-lg border text-sm text-[var(--text-default)] border-[var(--gray-border)] bg-[var(--background)]">
            <option>Interés</option>
            <option>Propiedades</option>
            <option>Vehículos</option>
          </select>
          <button className="bg-[var(--blue-main)] text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-[var(--blue-hover)] transition">
            Filtrar
          </button>
          <button className="bg-[var(--btn-primary)] text-[var(--btn-secondary)] px-4 py-2 rounded-lg text-sm shadow hover:opacity-90 transition">
            + Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[var(--gray-border)] mb-4 text-sm overflow-x-auto">
        {[
          "Todos los clientes",
          "Interesados en propiedades",
          "Interesados en vehículos",
          "Clientes VIP",
          "Archivados",
        ].map((tab, i) => (
          <button
            key={i}
            className={`pb-2 border-b-2 whitespace-nowrap ${
              i === 0
                ? "border-[var(--blue-main)] text-[var(--blue-main)] font-medium"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--blue-main)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.length === 0 && (
          <p className="text-[var(--text-secondary)]">
            No hay clientes registrados.
          </p>
        )}
        {clientes.map((cliente) => (
          <motion.div
            key={cliente.id}
            className="bg-[var(--white)] rounded-xl shadow border border-[var(--gray-border)] p-4 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--btn-primary)] text-[var(--btn-secondary)] flex items-center justify-center text-sm font-semibold shadow-sm">
                  {getIniciales(cliente.nombre)}
                </div>
                <div>
                  <h2 className="font-semibold text-[var(--text-default)] text-sm">
                    {cliente.nombre}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Derivado:{" "}
                    {new Date(cliente.derivado_fecha).toLocaleDateString(
                      "es-MX",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-default)] text-xl leading-none">
                ⋮
              </button>
            </div>

            <div className="text-sm text-[var(--text-secondary)] space-y-1 mb-2">
              <p>📞 {cliente.telefono}</p>
              <p>📧 {cliente.email}</p>
              <p>📍 {cliente.ubicacion}</p>
            </div>

            <div className="text-sm text-[var(--text-secondary)] space-y-1 mb-2">
              <p>
                Interés: <strong>{cliente.interes}</strong>
              </p>
              <p>
                Presupuesto:{" "}
                <strong>
                  ${cliente.presupuesto_min?.toLocaleString()} - $
                  {cliente.presupuesto_max?.toLocaleString()}
                </strong>
              </p>
            </div>

            <div className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  estadosColor[cliente.estado] ||
                  "bg-[var(--gray-hover)] text-[var(--text-secondary)]"
                }`}
              >
                {cliente.estado}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-[var(--text-secondary)]">
              <button className="flex items-center gap-1 hover:text-[var(--blue-main)]">
                <MessageSquare size={16} /> Mensaje
              </button>
              <button className="flex items-center gap-1 hover:text-[var(--blue-main)]">
                <Calendar size={16} /> Agendar
              </button>
              <button className="flex items-center gap-1 hover:text-[var(--blue-main)]">
                <FileText size={16} /> Notas
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
