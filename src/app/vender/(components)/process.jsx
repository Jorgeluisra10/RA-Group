
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, FileText, User, Home, Eye, CheckCircle } from "lucide-react";

const pasos = [
  {
    icon: <MessageCircle size={28} className="text-[#fdc700]" />,
    title: "1. Contacto inicial",
    desc: "Llenas un formulario o nos escribes por WhatsApp.",
  },
  {
    icon: <FileText size={28} className="text-[#fdc700]" />,
    title: "2. Revisión",
    desc: "Evaluamos tu inmueble y te damos una recomendación de precio.",
  },
  {
    icon: <User size={28} className="text-[#fdc700]" />,
    title: "3. Asignación",
    desc: "Un profesional se encargará de acompañarte.",
  },
  {
    icon: <Home size={28} className="text-[#fdc700]" />,
    title: "4. Publicación",
    desc: "Tu propiedad aparece destacada en el sitio.",
  },
  {
    icon: <Eye size={28} className="text-[#fdc700]" />,
    title: "5. Visitas",
    desc: "El agente coordina visitas y filtra clientes.",
  },
  {
    icon: <CheckCircle size={28} className="text-[#fdc700]" />,
    title: "6. Cierre",
    desc: "Te ayudamos hasta la firma del contrato.",
  },
];

export default function ProcesoVentaInmova() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <section className="py-20 bg-white text-[#0f1c46] font-poppins px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Nuestro proceso</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Conoce los pasos para vender tu propiedad con nosotros de manera rápida y segura
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pasos.map((paso, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-[#fdc700] p-6 text-center hover:scale-[1.02]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#0f1c46] flex items-center justify-center">
                {paso.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{paso.title}</h3>
              <p className="text-sm text-gray-600">{paso.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
