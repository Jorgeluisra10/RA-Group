"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { ChevronDown, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function CalendarioPage() {
  const [eventos, setEventos] = useState([]);
  const [formulario, setFormulario] = useState({ open: false, start: null });
  const [formData, setFormData] = useState({ title: "", descripcion: "", color: "#0f1c46" });
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarEventos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("eventos")
        .select("id, title, descripcion, color, fecha")
        .eq("agente", user.id);

      if (!error) {
        setEventos(
          data.map((ev) => ({
            id: ev.id,
            title: ev.title,
            descripcion: ev.descripcion,
            date: ev.fecha,
            color: ev.color,
          }))
        );
      }
    };

    cargarEventos();
  }, []);

  const crearEvento = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !formData.title || !formulario.start) {
      setMensaje("Completa todos los campos obligatorios para guardar el evento.");
      return;
    }

    const { data, error } = await supabase
      .from("eventos")
      .insert([
        {
          title: formData.title,
          descripcion: formData.descripcion,
          color: formData.color,
          fecha: formulario.start,
          agente: user.id,
        },
      ])
      .select();

    if (!error && data.length > 0) {
      setEventos((prev) => [
        ...prev,
        {
          id: data[0].id,
          title: data[0].title,
          descripcion: data[0].descripcion,
          date: data[0].fecha,
          color: data[0].color,
        },
      ]);
      setFormulario({ open: false, start: null });
      setFormData({ title: "", descripcion: "", color: "#0f1c46" });
      setMensaje("");
    }
  };

  const cambiarColor = async (id, nuevoColor) => {
    const { error } = await supabase.from("eventos").update({ color: nuevoColor }).eq("id", id);
    if (!error) {
      setEventos((prev) =>
        prev.map((e) => (e.id === id ? { ...e, color: nuevoColor } : e))
      );
    }
  };

  const eliminarEvento = async (id) => {
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (!error) {
      setEventos((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      <div className="flex gap-6 text-sm mb-4 px-1 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0f1c46]" /> Visitas a propiedades
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#10b981]" /> Visitas a vehículos
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f97316]" /> Reuniones con clientes
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" /> Otros eventos
        </div>
      </div>

      <div className="bg-[var(--white)] rounded-xl shadow border border-[var(--gray-border)] p-4 mb-6 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title prev,next today",
            center: "",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          buttonText={{ today: "Hoy", month: "Mes", week: "Semana", day: "Día", list: "Lista" }}
          height="auto"
          locale="es"
          events={eventos}
          selectable={true}
          select={(info) => setFormulario({ open: true, start: info.startStr })}
          dayMaxEvents={3}
          titleFormat={{ year: "numeric", month: "long" }}
          views={{ dayGridMonth: { titleFormat: { year: "numeric", month: "long" } } }}
          dayHeaderClassNames="text-sm text-[var(--text-secondary)]"
          contentHeight="auto"
          eventClassNames="text-xs rounded-md px-2 py-1 font-medium"
        />
      </div>

      <div className="bg-[var(--white)] rounded-xl shadow border border-[var(--gray-border)]">
        <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--gray-border)]">
          <h2 className="font-semibold text-[var(--text-default)]">Próximos eventos</h2>
          <button className="text-[var(--blue-main)] text-sm hover:underline">Ver todos</button>
        </div>
        <ul className="divide-y divide-[var(--gray-border)] text-sm">
          {eventos.slice(0, 3).map((ev) => (
            <li key={ev.id} className="px-4 py-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => cambiarColor(ev.id, prompt("Nuevo color HEX", ev.color) || ev.color)}
                    className="w-4 h-4 rounded-full mt-1 border-none"
                    style={{ backgroundColor: ev.color }}
                    title="Cambiar color"
                  />
                  <div>
                    <p className="font-medium text-[var(--text-default)]">{ev.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {format(new Date(ev.date), "EEEE, dd 'de' MMMM • HH:mm", { locale: es })}
                    </p>
                    {descripcionExpandida === ev.id && ev.descripcion && (
                      <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{ev.descripcion}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {ev.descripcion && (
                    <button
                      onClick={() =>
                        setDescripcionExpandida((prev) => (prev === ev.id ? null : ev.id))
                      }
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ rotate: -10 }}
                    onClick={() => eliminarEvento(ev.id)}
                    className="text-[var(--text-secondary)] hover:text-red-600"
                  >
                    🗑️
                  </motion.button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal flotante */}
      {formulario.open && (
        <div className="absolute inset-0 z-50 backdrop-blur-sm bg-black/5 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in-up">
            <h3 className="font-semibold text-lg mb-4">Nuevo Evento</h3>
            {mensaje && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-3">
                {mensaje}
              </div>
            )}
            <input
              type="text"
              placeholder="Título"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Descripción (opcional)"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-sm"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
            <label className="block text-sm font-medium mb-1">Color</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            >
              <option value="#0f1c46">Visitas a propiedades</option>
              <option value="#10b981">Visitas a vehículos</option>
              <option value="#f97316">Reuniones con clientes</option>
              <option value="#8b5cf6">Otros eventos</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFormulario({ open: false, start: null })}
                className="text-sm px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={crearEvento}
                className="text-sm px-4 py-2 bg-[var(--btn-primary)] text-white rounded-md hover:bg-yellow-400"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
