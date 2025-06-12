"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle, Lock, Zap, Heart } from "lucide-react";
import HistoriaTimeline from "./(components)/historia"; // Asegúrate de tener este archivo con los datos de la línea de tiempo

const valores = [
  {
    icon: ShieldCheck,
    title: "Transparencia",
    text: "Comunicación clara y honesta en todo momento.",
    animation: {
      whileHover: { rotate: [0, 10, -10, 0] },
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  },
  {
    icon: MessageCircle,
    title: "Atención al Cliente",
    text: "Servicio personalizado y cercano.",
    animation: {
      whileHover: { scale: [1, 1.1, 1] },
      transition: { duration: 0.6 },
    },
  },
  {
    icon: Lock,
    title: "Compromiso",
    text: "Cumplimos nuestras promesas con dedicación.",
    animation: {
      whileHover: { y: [0, -8, 0] },
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
  {
    icon: Zap,
    title: "Eficiencia",
    text: "Procesos ágiles que respetan tu tiempo.",
    animation: {
      whileHover: { y: [0, -8, 0] },
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  },
  {
    icon: Heart,
    title: "Pasión",
    text: "Amamos lo que hacemos y a quienes servimos.",
    animation: {
      whileHover: { scale: [1, 1.2, 1] },
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  },
];

export default function SobreNosotros() {
  return (
    <main className="bg-white">
      {/* Encabezado */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white px-6"
        style={{
          backgroundImage: "url('/images/fondo.png')", // // Asegúrate de que esté en /public/images/
          backgroundColor: "#464e6a",
        }}
      >
        {/* Capa oscura para contraste */}
        <div className="absolute inset-0 bg-[#464e6a]/90 z-0" />

        {/* Contenido central */}
        <div className="relative z-10 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Donde tu próximo{" "}
            <span className="text-yellow-400">hogar o vehículo</span> comienza{" "}
            <br />
            con <span className="text-yellow-400">confianza</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mt-6">
            Transformamos la experiencia de comprar y vender{" "}
            <br className="hidden md:block" />
            propiedades y vehículos en Colombia
          </p>
          <button className="mt-8 px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition-all">
            Conócenos
          </button>
        </div>

        {/* Flecha animada */}
        <motion.div
          className="absolute bottom-6 text-white text-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Historia */}
      <section>
        <HistoriaTimeline />
      </section>

      {/* Misión y Visión */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-[#1A295C] text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Misión y Visión
          </motion.h2>
          <div className="w-16 h-1 bg-[#FFCC00] rounded-full mx-auto mt-3 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Misión */}
            <motion.div
              className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-[#FFCC00] transition-transform hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-[#1A295C] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-[#FFCC00] text-2xl">🎯</span>
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-center text-[#1A295C]">
                Nuestra Misión
              </h3>
              <p className="mt-2 text-center text-[#1A295C]/80 italic text-sm">
                "Hacer más sencillo, seguro y confiable el proceso de compra o
                venta de propiedades y vehículos en Colombia."
              </p>
              <div className="w-8 h-1 bg-[#FFCC00] rounded-full mx-auto my-4"></div>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Trabajamos cada día para eliminar obstáculos y crear una
                experiencia fluida para todos nuestros usuarios, poniendo la
                tecnología al servicio de las personas.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-[#1A295C] transition-transform hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: 90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-[#FFCC00] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-[#1A295C] text-2xl">🔭</span>
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-center text-[#1A295C]">
                Nuestra Visión
              </h3>
              <p className="mt-2 text-center text-[#1A295C]/80 italic text-sm">
                "Ser la plataforma líder en confianza e innovación inmobiliaria
                y automotriz del país."
              </p>
              <div className="w-8 h-1 bg-[#1A295C] rounded-full mx-auto my-4"></div>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Aspiramos a transformar por completo el mercado, estableciendo
                nuevos estándares de calidad, transparencia y satisfacción del
                cliente en toda Colombia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-[#1A295C] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Valores
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 mt-2 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Los principios que guían cada una de nuestras acciones
          </motion.p>
          <div className="h-1 w-16 bg-[#FFCC00] mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {valores.map(({ icon: Icon, title, text, animation }, index) => (
              <motion.div
                key={index}
                className="relative group bg-white border-t-4 border-[#FFCC00] rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#F5F5F5] text-[#1A295C] group-hover:bg-[#FFCC00] group-hover:text-white transition-colors duration-300"
                  {...animation}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-[#1A295C] text-base mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Formulario de sugerencias */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-[#1A295C] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Tienes alguna sugerencia?
          </motion.h2>
          <p className="text-center text-gray-600 mt-2 mb-8">
            Tu opinión nos ayuda a mejorar
          </p>

          <form className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre (opcional)
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A295C]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tu sugerencia o comentario
              </label>
              <textarea
                placeholder="Escríbenos tu idea..."
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1A295C]/50"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#1A295C] text-white px-6 py-2 rounded-full hover:bg-[#162247] transition-all"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
