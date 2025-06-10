"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const timelineData = [
  {
    title: "Los inicios",
    description:
      "Nacimos en Chiquinquirá, Boyacá con una idea clara: transformar la forma en que los colombianos compran y venden propiedades y vehículos.",
    icon: "🌱",
    image: "images/ilustracion.png",
  },
  {
    title: "Primeros pasos",
    description:
      "Identificamos los principales problemas del mercado: falta de transparencia, procesos lentos y poca confianza entre las partes.",
    icon: "🛠️",
    image: "images/pensando.png",
  },
  {
    title: "Crecimiento",
    description:
      "Fuimos expandiendo nuestros servicios a más ciudades de Colombia, manteniendo nuestros valores.",
    icon: "📈",
    image: "images/fondo2.png",
  },
  {
    title: "Innovación constante",
    description:
      "Incorporamos tecnología para hacer más eficientes los procesos, siempre pensando en el usuario.",
    icon: "💡",
    image: "images/fondo3.png",
  },
  {
    title: "Hoy",
    description:
      "Somos una plataforma reconocida en el mercado inmobiliario y automotriz colombiano, con miles de transacciones exitosas.",
    icon: "🏁",
    image: "images/fondo4.png",
  },
];

export default function HistoriaTimeline() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          Nuestra Historia
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mt-2 rounded" />
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center">
        <div className="absolute w-1 bg-slate-900 h-full left-1/2 transform -translate-x-1/2 z-0" />

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`w-full flex justify-${
                isLeft ? "start" : "end"
              } relative z-10`}
            >
              {/* Línea y punto */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-8 w-5 h-5 bg-yellow-400 border-4 border-white rounded-full shadow-md z-20" />

              {/* Card */}
              <div className="w-full max-w-[47%]">
                <FlipCard {...item} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FlipCard({ title, description, icon, image }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-3xl cursor-pointer perspective group-hover:scale-[1.01] transition-transform"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d", minHeight: "290px" }} // <-- Cambiado aquí
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center text-center backface-hidden">
          <h3 className="text-xl font-semibold text-slate-800">
            {icon} {title}
          </h3>
          <p className="text-slate-600 mt-2 text-sm">{description}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-white rounded-lg overflow-hidden shadow-md transform rotate-y-180 backface-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
