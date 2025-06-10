"use client";

import { motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";

export default function CostosYConfianza() {
  return (
    <>
      {/* Bloque de costos */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 bg-[#f9f9f9] font-poppins"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#0f1c46] flex items-center justify-center p-10">
            <CheckCircle size={64} className="text-[#fdc700]" />
          </div>
          <div className="p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0f1c46] mb-4">
              Costos transparentes
            </h3>
            <ul className="space-y-4 text-[#0f1c46]">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#fdc700] mt-1" />
                <span className="font-medium">
                  Publicar tu propiedad no tiene costo inicial.
                </span>
              </li>
              <hr className="my-3" />
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <Info size={16} className="text-[#fdc700] mt-1" />
                Las comisiones de venta oscilan entre el 2.5% y 3.5%, según el agente y tipo de propiedad.
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Bloque de confianza */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0f1c46] text-white text-center py-16 px-4 font-poppins"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Confía en quienes saben vender
        </h3>
        <p className="text-[#fdc700] text-lg mb-4">
          +500 propiedades gestionadas con éxito
        </p>
        <div className="flex justify-center gap-2 text-[#fdc700] text-xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </motion.section>
    </>
  );
}
