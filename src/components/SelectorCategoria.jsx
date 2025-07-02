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

  const cardStyles =
    "bg-[var(--background-overlay)] dark:bg-[var(--navbackground)] shadow-xl p-10 rounded-3xl hover:shadow-2xl transition-all duration-300";

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold mb-4 text-[var(--blue-main)] dark:text-[var(--text-hero)]"
      >
        ¿Qué estás buscando?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] mb-14 max-w-xl mx-auto"
      >
        Explora nuestras categorías principales y encuentra exactamente lo que
        necesitas.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🏡 Propiedades */}
        <motion.div className={cardStyles} whileHover={{ scale: 1.03 }}>
          <div className="w-28 h-28 mx-auto mb-6">
            <Lottie animationData={casaAnimada} loop={true} />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-hero)]">
            Propiedades
          </h3>
          <p className="text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-sm my-3">
            Apartamentos, casas, locales comerciales y más. Encuentra tu hogar
            ideal con la ayuda de nuestros agentes especializados.
          </p>
          <Link
            href="/propiedades"
            className="inline-block mt-4 px-6 py-2 bg-[var(--blue-main)] text-white font-semibold rounded-lg hover:bg-[var(--blue-hover)] transition"
          >
            Explorar Propiedades
          </Link>
        </motion.div>

        {/* 🚗 Vehículos */}
        <motion.div className={cardStyles} whileHover={{ scale: 1.03 }}>
          <div className="w-70 h-43 mx-auto mb-6">
            <Lottie
              animationData={autoAnimado}
              loop={true}
              className="w-60 h-70 mx-auto" // <-- Aumentá los valores
            />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-hero)]">
            Vehículos
          </h3>
          <p className="text-[var(--text-secondary)] dark:text-[var(--text-hero-secondary)] text-sm my-3">
            Coches, motos, vehículos comerciales y más. Encuentra el vehículo
            perfecto con garantía y asesoramiento profesional.
          </p>
          <Link
            href="/vehiculos"
            className="inline-block mt-4 px-6 py-2 bg-[var(--blue-main)] text-white font-semibold rounded-lg hover:bg-[var(--blue-hover)] transition"
          >
            Explorar Vehículos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
