"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ArticulosRecientes from "./ArticulosRecientes";
import NewletterBox from "./NewletterBox";

const categories = [
  { label: "Mercado Inmobiliario", color: "bg-yellow-400 text-black" },
  { label: "Consejos para Compradores", color: "bg-blue-600 text-white" },
  { label: "Inversiones", color: "bg-green-500 text-white" },
  { label: "Vehículos", color: "bg-red-500 text-white" },
  { label: "Tendencias", color: "bg-purple-600 text-white" },
];

const BlogSection = () => {
  return (
    <>
      <section className="w-full">
        {/* Encabezado Hero */}
        <div className="bg-[var(--blue-main)] text-white py-14 px-6 md:px-10 text-center">
          <motion.div
            className="max-w-4xl mx-auto animate-fade-in-up"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-[var(--btn-primary)]">IMNO</span>BLOG
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6">
              Descubre las últimas tendencias del mercado inmobiliario, consejos
              para compradores y vendedores, y todo lo que necesitas saber sobre
              bienes raíces y vehículos.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className={`text-sm font-medium py-1.5 px-4 rounded-full ${cat.color} shadow-md cursor-pointer hover:scale-105 transition-transform duration-200`}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Publicación destacada */}
        <motion.section
          className="w-full max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center animate-fade-in-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Imagen */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/house-keys.jpg" // Cambia esta ruta si usas Supabase u otra
              alt="Casa y llaves"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Texto */}
          <div className="bg-white dark:bg-[var(--navbackground)] rounded-xl p-6 shadow-md border border-[var(--gray-border)]">
            <span className="inline-block text-xs font-semibold text-[var(--blue-main)] bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full mb-2">
              Tendencias
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[var(--text-default)] mb-3">
              El auge de los espacios multifuncionales en viviendas
              post-pandemia
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              La pandemia ha transformado nuestra forma de vivir y trabajar,
              creando una nueva demanda de espacios flexibles en nuestros
              hogares. Descubre cómo los desarrolladores están adaptando sus
              diseños.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-4">
              <span className="font-semibold">Sofía Ramírez</span> ·{" "}
              <span>15 de julio, 2023</span> · <span>8 min de lectura</span>
            </div>
            <button className="relative inline-flex items-center gap-2 px-5 py-2 bg-[var(--blue-main)] text-white text-sm font-semibold rounded-full hover:bg-[var(--blue-hover)] transition-all overflow-hidden btn-shine">
              Leer artículo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.section>
      </section>
      <section>
        <ArticulosRecientes />
      </section>
      <section>
        <NewletterBox />
      </section>
    </>
  );
};

export default BlogSection;
