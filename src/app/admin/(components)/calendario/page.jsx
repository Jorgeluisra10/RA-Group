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
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function CalendarioAdmin() {
  const [eventos, setEventos] = useState([]);
  const [formulario, setFormulario] = useState({ open: false, start: null });
  const [formData, setFormData] = useState({ title: "", descripcion: "", color: "#0f1c46" });
  const [descripcionExpandida, setDescripcionExpandida] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarEventos = async () => {
    const { data, error } = await supabase
      .from("admin_eventos")
      .select("id, title, descripcion, color, fecha")
      .order("fecha", { ascending: true });
    if (!error && data) {
      setEventos(data.map(ev => ({
        id: ev.id.toString(),
        title: ev.title,
        descripcion: ev.descripcion,
        date: ev.fecha,
        color: ev.color
      })));
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const crearEvento = async () => {
    if (!formData.title || !formulario.start) {
      setMensaje("Título y fecha son obligatorios.");
      return;
    }
    const { data, error } = await supabase
      .from("admin_eventos")
      .insert({ title: formData.title, descripcion: formData.descripcion, color: formData.color, fecha: formulario.start })
      .select();
    if (!error && data?.length) {
      await cargarEventos();
      setFormulario({ open: false, start: null });
      setFormData({ title: "", descripcion: "", color: "#0f1c46" });
      setMensaje("");
      toast.success("Evento creado con éxito");
    }
  };

  const cambiarColor = async (id, nuevoColor) => {
    const { error } = await supabase.from("admin_eventos").update({ color: nuevoColor }).eq("id", id);
    if (!error) {
      await cargarEventos();
      toast.success("Color actualizado");
    }
  };

  const eliminarEvento = async (id) => {
    const { error } = await supabase.from("admin_eventos").delete().eq("id", id);
    if (!error) {
      setEventos(evts => evts.filter(e => e.id !== id.toString()));
      toast.success("Evento eliminado correctamente");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      <Toaster position="top-center" />
      <div className="flex gap-6 text-sm mb-4 px-1 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0f1c46]" /> Eventos Admin
        </div>
      </div>

      <div className="bg-[var(--white)] rounded-xl shadow border border-[var(--gray-border)] p-4 mb-6 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title prev,next today",
            center: "",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
          }}
          buttonText={{ today: "Hoy", month: "Mes", week: "Semana", day: "Día", list: "Lista" }}
          height="auto"
          locale="es"
          events={eventos}
          selectable={true}
          select={info => setFormulario({ open: true, start: info.startStr })}
          dayMaxEvents={3}
          titleFormat={{ year: "numeric", month: "long" }}
          dayHeaderClassNames="text-sm text-[var(--text-secondary)]"
          eventClassNames="text-xs rounded-md px-2 py-1 font-medium"
        />
      </div>

      <div className="bg-[var(--white)] rounded-xl shadow border border-[var(--gray-border)]">
        <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--gray-border)]">
          <h2 className="font-semibold text-[var(--text-default)]">Próximos eventos</h2>
          <button className="text-[var(--blue-main)] text-sm hover:underline">Ver todos</button>
        </div>
        <ul className="divide-y divide-[var(--gray-border)] text-sm">
          {eventos.slice(0, 3).map(ev => (
            <li key={ev.id} className="px-4 py-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      const nc = prompt("Nuevo color (hex)", ev.color) || ev.color;
                      cambiarColor(parseInt(ev.id), nc);
                    }}
                    className="w-4 h-4 rounded-full mt-1 border-none"
                    style={{ backgroundColor: ev.color }}
                    title="Cambiar color"
                  />
                  <div>
                    <p className="font-medium text-[var(--text-default)]">{ev.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {format(new Date(ev.date), "EEEE, dd 'de' MMMM", { locale: es })}
                    </p>
                    {descripcionExpandida === ev.id && ev.descripcion && (
                      <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{ev.descripcion}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {ev.descripcion && (
                    <button
                      onClick={() => setDescripcionExpandida(prev => prev === ev.id ? null : ev.id)}
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

      {formulario.open && (
        <div className="absolute inset-0 z-50 backdrop-blur-sm bg-black/5 flex items-center justify-center">
          <div className="bg-[var(--white)] text-[var(--text-default)] rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in-up">
            <h3 className="font-semibold text-lg mb-4">Nuevo Evento</h3>
            {mensaje && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-3">{mensaje}</div>
            )}
            <input
              type="text"
              placeholder="Título"
              className="w-full border border-[var(--gray-border)] bg-transparent text-sm rounded-md px-3 py-2 mb-3"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Descripción (opcional)"
              className="w-full border border-[var(--gray-border)] bg-transparent text-sm rounded-md px-3 py-2 mb-3"
              value={formData.descripcion}
              onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
            />
            <label className="block text-sm font-medium mb-1">Color</label>
            <select
              className="w-full border border-[var(--gray-border)] bg-transparent text-sm rounded-md px-3 py-2 mb-4 text-[var(--text-default)]"
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
            >
              <option value="#0f1c46">Evento admin</option>
              <option value="#10b981">Verde</option>
              <option value="#f97316">Naranja</option>
              <option value="#8b5cf6">Morado</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFormulario({ open: false, start: null })}
                className="text-sm px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
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
