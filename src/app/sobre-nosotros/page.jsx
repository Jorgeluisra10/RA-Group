'use client';

import { motion } from "framer-motion";

export default function SobreNosotros() {
  return (
    <main className="bg-white">
      {/* Encabezado */}
      <section className="bg-[#1A295C] text-white py-16 relative overflow-hidden mt-15">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#FFCC00]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Conectando personas con su hogar ideal y su vehículo soñado
          </motion.p>
          <div className="h-1 w-24 bg-[#FFCC00] mx-auto mt-4" />
        </div>
      </section>

      {/* Historia */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[#1A295C] mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nuestra Historia
          </motion.h2>
          <p className="text-gray-700 mb-4">
            <strong>RA Group</strong> nació en Chiquinquirá, Boyacá, Colombia, con la visión de transformar la experiencia de compra y venta de propiedades y autos. Somos una empresa apasionada por conectar a nuestros clientes con opciones de calidad, con transparencia, agilidad y el mejor servicio del país.
          </p>
          <p className="text-gray-700">
            Desde nuestros inicios, nos hemos comprometido a ofrecer soluciones integrales que satisfagan las necesidades de nuestros clientes, brindando asesoramiento personalizado y un servicio excepcional en cada etapa del proceso.
          </p>
        </div>
        <motion.div
          className="relative shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-white p-6 rounded-lg z-10">
            <img
              src="/sobre-nosotros/chiquinquira-ilustracion.svg"
              alt="Chiquinquirá, Boyacá"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-full h-full bg-[#FFCC00] rounded-lg z-0" />
        </motion.div>
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
                <h3 className="text-xl font-semibold text-[#1A295C]">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600">
                “Brindar la mejor experiencia al cliente en la compra y venta de inmuebles y autos en Colombia.”
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
                <h3 className="text-xl font-semibold text-[#1A295C]">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600">
                “Ser la empresa líder en soluciones inmobiliarias y automotrices, reconocida por la confianza y la innovación.”
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
            Los principios que guían nuestro trabajo diario y nos permiten ofrecer un servicio excepcional.
          </motion.p>
          <div className="h-1 w-16 bg-[#FFCC00] mx-auto mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "🛡️", title: "Transparencia", text: "Información clara y honesta en cada transacción." },
              { icon: "💬", title: "Servicio al cliente", text: "Atención personalizada y excepcional en todo momento." },
              { icon: "🔒", title: "Compromiso", text: "Dedicación total a cumplir con nuestras promesas." },
              { icon: "⚡", title: "Agilidad", text: "Procesos eficientes para ahorrar tiempo a nuestros clientes." },
              { icon: "❤️", title: "Pasión", text: "Amor por lo que hacemos y por ayudar a nuestros clientes." },
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