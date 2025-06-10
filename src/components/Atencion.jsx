import { ShieldCheck, RefreshCcw, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-black" />,
    title: "Agentes verificados",
    description:
      "Confianza y respaldo en cada negociación. Nuestros agentes son profesionales certificados con amplia experiencia en el mercado.",
  },
  {
    icon: <RefreshCcw className="w-8 h-8 text-black" />,
    title: "Propiedades y vehículos negociables",
    description:
      "Flexibilidad real para compradores y vendedores. Trabajamos para encontrar el mejor acuerdo que satisfaga a todas las partes.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-black" />,
    title: "Mejores precios del mercado",
    description:
      "Opciones accesibles y competitivas. Analizamos constantemente el mercado para ofrecerte las mejores oportunidades de inversión.",
  },
];

export default function Atencion() {
  return (
    <section className="relative bg-[#0f1c46] py-24 px-4 text-white text-center overflow-hidden">
      {/* Óvalo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-3 bg-yellow-400 rounded-b-full z-0 pointer-events-none select-none" />
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl font-extrabold mb-4">¿Por qué elegirnos?</h2>
        <div className="h-1 w-14 bg-yellow-400 mx-auto mb-6 rounded-full" />
        <p className="max-w-2xl mx-auto mb-12">
          Somos expertos en bienes raíces y vehículos, ofreciendo soluciones
          personalizadas para todas tus necesidades.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 text-black transition-all duration-300 group hover:shadow-2xl"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="bg-yellow-400 rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 text-center">
                {feature.description}
              </p>
              <div className="h-1 w-8 bg-yellow-400 mt-4 mx-auto rounded-full" />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-12 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
        >
          Conoce más
        </motion.button>
      </div>

      {/* Degradado inferior mejorado */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-3 bg-yellow-400 rounded-t-full z-0 pointer-events-none select-none" />
    </section>
  );
}
