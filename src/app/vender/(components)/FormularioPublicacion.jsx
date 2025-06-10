"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabaseClient";

export default function FormularioPublicacion() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    detalles: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje("");

    // Validaciones adicionales
    if (!form.nombre || !form.email || !form.telefono || !form.detalles) {
      setMensaje("Por favor completa todos los campos.");
      setEnviando(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("publicaciones_propiedades")
        .insert([form]);

      if (error) throw error;

      setMensaje("¡Gracias! Un asesor te contactará en los próximos días.");
      setForm({ nombre: "", email: "", telefono: "", detalles: "" });
    } catch (err) {
      setMensaje(
        "Ocurrió un error al enviar el formulario. Intenta nuevamente."
      );
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 bg-white font-sans"
    >
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0f1c46] mb-8">
          ¿Listo para vender tu propiedad?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["nombre", "email", "telefono"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-[#0f1c46] mb-1 capitalize">
                {field === "email" ? "Correo electrónico" : field}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "telefono"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "email"
                    ? "tucorreo@ejemplo.com"
                    : field === "telefono"
                    ? "Tu número de teléfono"
                    : "Tu nombre"
                }
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-[#0f1c46] mb-1">
              Detalles de tu propiedad
            </label>
            <textarea
              name="detalles"
              placeholder="Cuéntanos brevemente sobre tu propiedad (ubicación, tipo, tamaño, etc.)"
              value={form.detalles}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={enviando}
            className="w-full bg-[#fdc700] hover:bg-[#e6b800] text-[#0f1c46] font-bold text-base rounded-md py-4 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {enviando ? "Enviando..." : "¡Publica tu propiedad hoy!"}
          </motion.button>

          {mensaje && (
            <div className="text-center text-sm mt-2 text-[#0f1c46]">
              {mensaje}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-[#0f1c46]">
          ¿Prefieres contactarnos por WhatsApp?
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3"
        >
          <Link
            href="https://wa.me/5210000000000"
            target="_blank"
            className="flex items-center justify-center gap-2 text-white bg-[#25D366] hover:bg-[#1ec154] font-semibold rounded-md py-3 w-full transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Contáctanos por WhatsApp
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
