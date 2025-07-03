"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Lottie from "lottie-react";
import casaAnimada from "../../public/lottie/casa.json";
import autoAnimado from "../../public/lottie/auto.json";
import { motion } from "framer-motion";

export default function CategoriasSelector() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const cardBaseStyles =
    "bg-[var(--background-overlay)] dark:bg-[var(--navbackground)] shadow-xl rounded-3xl p-10 cursor-pointer relative overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-colors duration-300";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const shineEffect = {
    initial: { x: "-100%" },
    animate: { x: "200%" },
    transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-center select-none">
      <motion.h2
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold mb-8 text-[var(--blue-main)] dark:text-[var(--text-hero)] leading-tight relative inline-block select-none"
      >
        ¿Qué estás buscando?
        {/* Línea amarilla centrada debajo */}
        <span className="block w-24 h-1 bg-yellow-400 rounded mt-3 mx-auto" />
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
        className="max-w-xl mx-auto mb-16 text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-lg leading-relaxed"
      >
        Explora nuestras categorías principales y encuentra exactamente lo que
        necesitas.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Propiedades */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(255, 204, 0, 0.5)",
            transition: { duration: 0.4 },
          }}
          className={`${cardBaseStyles} group`}
          role="button"
          tabIndex={0}
          aria-label="Explorar propiedades"
          onKeyDown={(e) => {
            if (e.key === "Enter") window.location.href = "/propiedades";
          }}
        >
          <div className="w-28 h-28 mx-auto mb-6 pointer-events-none">
            <Lottie animationData={casaAnimada} loop={true} />
          </div>

          <motion.h3
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05, color: "var(--btn-primary)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-semibold text-[var(--text-hero)] mb-3 group-hover:text-[var(--btn-primary)] relative inline-block"
          >
            Propiedades
            {/* Línea amarilla debajo */}
            <span className="block w-16 h-1 bg-yellow-400 rounded mt-1 mx-auto" />
          </motion.h3>

          <p className="text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-base mb-6 leading-relaxed">
            Apartamentos, casas, locales comerciales y más. Encuentra tu hogar
            ideal con la ayuda de nuestros agentes especializados.
          </p>

          <Link
            href="/propiedades"
            className="inline-block mt-auto px-8 py-3 font-semibold text-white rounded-lg bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] transition-colors duration-300"
          >
            Explorar Propiedades
          </Link>
        </motion.div>

        {/* Vehículos */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(255, 204, 0, 0.5)",
            transition: { duration: 0.4 },
          }}
          className={`${cardBaseStyles} group`}
          role="button"
          tabIndex={0}
          aria-label="Explorar vehículos"
          onKeyDown={(e) => {
            if (e.key === "Enter") window.location.href = "/vehiculos";
          }}
        >
          <div className="w-36 h-30 mx-auto mb-6 pointer-events-none">
            <Lottie animationData={autoAnimado} loop={true} />
          </div>

          <motion.h3
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05, color: "var(--btn-primary)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-semibold text-[var(--text-hero)] mb-3 group-hover:text-[var(--btn-primary)] relative inline-block"
          >
            Vehículos
            {/* Línea amarilla debajo */}
            <span className="block w-16 h-1 bg-yellow-400 rounded mt-1 mx-auto" />
          </motion.h3>

          <p className="text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-base mb-6 leading-relaxed">
            Coches, motos, vehículos comerciales y más. Encuentra el vehículo
            perfecto con garantía y asesoramiento profesional.
          </p>

          <Link
            href="/vehiculos"
            className="inline-block mt-auto px-8 py-3 font-semibold text-white rounded-lg bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] transition-colors duration-300"
          >
            Explorar Vehículos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
