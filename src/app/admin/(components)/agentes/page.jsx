"use client";

import { useState, useEffect } from "react";
import { BadgeCheck, XCircle, UserRound } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";

export default function AgentesAdminPage() {
  const [tab, setTab] = useState("gestion");
  const [agentes, setAgentes] = useState([]);

  useEffect(() => {
    const fetchAgentes = async () => {
      const { data, error } = await supabase.from("agentes").select("*");
      if (!error) setAgentes(data);
    };
    fetchAgentes();
  }, []);

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResumenCard title="Total Agentes" value={agentes.length.toString()} icon={<UserRound className="icon-color" />} />
        <ResumenCard
          title="Agentes Activos"
          value={agentes.filter(a => a.rol === "activo").length.toString()}
          icon={<BadgeCheck className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20"
        />
        <ResumenCard
          title="Agentes Inactivos"
          value={agentes.filter(a => a.rol === "inactivo").length.toString()}
          icon={<XCircle className="text-red-600" />} color="bg-red-50 dark:bg-red-900/20"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--gray-border)] text-sm font-semibold">
        <button
          onClick={() => setTab("gestion")}
          className={`relative px-4 py-2 transition-all ${tab === "gestion" ? "border-b-2 border-[var(--blue-main)] text-[var(--blue-main)]" : "text-[var(--text-secondary)] hover:text-[var(--blue-hover)]"}`}
        >
          Gestión de Agentes
        </button>
        <button
          onClick={() => setTab("solicitudes")}
          className={`relative px-4 py-2 transition-all ${tab === "solicitudes" ? "border-b-2 border-[var(--blue-main)] text-[var(--blue-main)]" : "text-[var(--text-secondary)] hover:text-[var(--blue-hover)]"}`}
        >
          Solicitudes Pendientes
          <span className="absolute -top-2 -right-3 bg-[var(--accent-yellow)] text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center">5</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="grid md:grid-cols-4 gap-4 items-end border border-[var(--gray-border)] p-4 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--navbackground)] shadow">
        <input type="text" placeholder="Nombre o correo..." className="w-full rounded-md border border-[var(--input-border)] px-3 py-2 text-sm bg-[var(--input-bg-light)] dark:bg-[var(--navbackground)] text-[var(--text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]" />
        <select className="w-full rounded-md border border-[var(--input-border)] px-3 py-2 text-sm bg-[var(--input-bg-light)] dark:bg-[var(--navbackground)] text-[var(--text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]">
          <option>Todos</option>
          <option>Activos</option>
          <option>Inactivos</option>
        </select>
        <select className="w-full rounded-md border border-[var(--input-border)] px-3 py-2 text-sm bg-[var(--input-bg-light)] dark:bg-[var(--navbackground)] text-[var(--text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]">
          <option>Todas</option>
          <option>Más de 10</option>
          <option>Menos de 10</option>
        </select>
        <select className="w-full rounded-md border border-[var(--input-border)] px-3 py-2 text-sm bg-[var(--input-bg-light)] dark:bg-[var(--navbackground)] text-[var(--text-default)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]">
          <option>Más publicaciones</option>
          <option>Menos publicaciones</option>
        </select>
      </div>

      {/* Lista de agentes */}
      <div className="grid md:grid-cols-3 gap-6">
        {agentes.map((agente, i) => (
          <div key={i} className="bg-[var(--white)] dark:bg-[var(--navbackground)] border border-[var(--gray-border)] rounded-xl p-5 shadow transition-shadow hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {agente.foto_url ? (
                  <img src={agente.foto_url} alt="Foto agente" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-white flex items-center justify-center font-bold">
                    {agente.nombre?.split(" ").map(p => p[0]).join("")}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[var(--text-default)] leading-none">{agente.nombre}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{agente.email}</p>
                </div>
              </div>
              <div className={`text-xs font-medium ${agente.rol === "activo" ? "text-green-600" : "text-red-600"}`}>{agente.rol === "activo" ? "● Activo" : "● Inactivo"}</div>
            </div>
            <div className="flex justify-between text-center mt-4 rounded-lg overflow-hidden border border-[var(--gray-border)] bg-[var(--gray-hover)]">
              <div className="flex-1 py-2">
                <p className="font-bold text-xl leading-tight">{agente.ventas ?? 0}</p>
                <p className="text-xs text-[var(--text-secondary)]">Ventas</p>
              </div>
              <div className="flex-1 py-2 border-l border-[var(--gray-border)]">
                <p className="font-bold text-xl leading-tight">{agente.zona_asignada || "—"}</p>
                <p className="text-xs text-[var(--text-secondary)]">Zona</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2 flex justify-between">
              <span>Último acceso:</span>
              <span className="font-medium text-[var(--text-default)]">—</span>
            </p>
            <div className="flex gap-2 mt-4">
              <button className="relative bg-[var(--blue-main)] text-white rounded-lg px-4 py-2 text-sm font-medium overflow-hidden btn-shine">
                Ver detalles
              </button>
              <button className={`${agente.rol === "activo" ? "bg-[var(--gray-hover)] text-[var(--text-default)]" : "bg-[var(--accent-yellow)] text-white"} rounded-lg px-4 py-2 text-sm font-medium`}>
                {agente.rol === "activo" ? "Suspender" : "Reactivar"}
              </button>
            </div>
            {agente.ventas >= 10 && (
              <div className="text-xs inline-flex items-center px-2 py-1 mt-3 bg-yellow-100 text-yellow-700 rounded-full">
                ⭐ Top Performer
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumenCard({ title, value, icon, color = "bg-gray-50 dark:bg-[var(--navbackground)]" }) {
  return (
    <div className={`${color} rounded-xl p-5 flex items-center justify-between shadow-sm border border-[var(--gray-border)]`}>
      <div>
        <p className="text-sm text-[var(--text-secondary)] font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1 text-[var(--text-default)]">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}
