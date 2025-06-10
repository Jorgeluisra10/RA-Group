"use client";

import { motion } from "framer-motion";
import HistoriaTimeline from "./(components)/historia"; // Asegúrate de tener este archivo con los datos de la línea de tiempo

export default function SobreNosotros() {
  return (
    <main className="bg-white">
      {/* Encabezado */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white px-6"
        style={{
          backgroundImage: "url('/images/fondo.png')",// // Asegúrate de que esté en /public/images/
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
      <section >
          <HistoriaTimeline />
      </section>

      {/* Misión y Visión */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-[#1A295C] text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Misión y Visión
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 border border-[#1A295C]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1A295C] text-[#FFCC00] flex items-center justify-center text-xl mr-3">
                  ⚡
                </div>
                <h3 className="text-xl font-semibold text-[#1A295C]">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-600">
                Ofrecer la mejor experiencia en la compra y venta de inmuebles y
                vehículos, garantizando confianza, agilidad y atención
                personalizada.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 border border-[#FFCC00]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFCC00] text-[#1A295C] flex items-center justify-center text-xl mr-3">
                  👁️
                </div>
                <h3 className="text-xl font-semibold text-[#1A295C]">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-600">
                Convertirnos en la empresa líder en el sector inmobiliario y
                automotriz en Colombia, reconocida por innovación, transparencia
                y excelencia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-[#1A295C] text-center"
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
            Principios que guían cada acción y nos permiten ofrecer un servicio
            excepcional y confiable.
          </motion.p>
          <div className="h-1 w-16 bg-[#FFCC00] mx-auto mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Transparencia",
                text: "Comunicación clara y honesta en todo momento.",
              },
              {
                icon: "💬",
                title: "Atención al Cliente",
                text: "Servicio personalizado y cercano.",
              },
              {
                icon: "🔒",
                title: "Compromiso",
                text: "Cumplimos nuestras promesas con dedicación.",
              },
              {
                icon: "⚡",
                title: "Eficiencia",
                text: "Procesos ágiles que respetan tu tiempo.",
              },
              {
                icon: "❤️",
                title: "Pasión",
                text: "Amamos lo que hacemos y a quienes servimos.",
              },
            ].map((valor, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md text-center border border-gray-200 hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl text-[#1A295C] mb-3">{valor.icon}</div>
                <h3 className="font-bold text-[#1A295C] mb-2">{valor.title}</h3>
                <p className="text-sm text-gray-600">{valor.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
