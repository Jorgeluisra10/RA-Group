"use client";
import { ShieldCheck, RefreshCcw, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[var(--blue-main)]" />,
    title: "Agentes verificados",
    description:
      "Confianza y respaldo en cada negociación. Nuestros agentes son profesionales certificados con amplia experiencia en el mercado.",
  },
  {
    icon: <RefreshCcw className="w-8 h-8 text-[var(--blue-main)]" />,
    title: "Propiedades y vehículos negociables",
    description:
      "Flexibilidad real para compradores y vendedores. Trabajamos para encontrar el mejor acuerdo que satisfaga a todas las partes.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-[var(--blue-main)]" />,
    title: "Mejores precios del mercado",
    description:
      "Opciones accesibles y competitivas. Analizamos constantemente el mercado para ofrecerte las mejores oportunidades de inversión.",
  },
];

export default function Atencion() {
  const router = useRouter();

  return (
    <section
      className="relative py-24 px-4 text-center overflow-hidden"
      style={{
        backgroundColor: "var(--footerbackground)",
        color: "var(--white)",
      }}
    >
      {/* Óvalo superior */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-3 rounded-b-full z-0 pointer-events-none select-none"
        style={{ backgroundColor: "var(--btn-primary)" }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl text-white font-extrabold mb-4">
          ¿Por qué elegirnos?
        </h2>
        <div
          className="h-1 w-14 mx-auto mb-6 rounded-full"
          style={{ backgroundColor: "var(--btn-primary)" }}
        />
        <p className="max-w-2xl text-white mx-auto mb-12">
          Somos expertos en bienes raíces y vehículos, ofreciendo soluciones
          personalizadas para todas tus necesidades.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl shadow-lg p-6 transition-all duration-300 group hover:shadow-2xl"
              style={{
                backgroundColor: "var(--white)",
                color: "var(--text-default)",
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--btn-primary)" }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-center">
                {feature.title}
              </h3>
              <p
                className="text-sm text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                {feature.description}
              </p>
              <div
                className="h-1 w-8 mt-4 mx-auto rounded-full"
                style={{ backgroundColor: "var(--btn-primary)" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/sobre-nosotros")}
          className="mt-12 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
          style={{
            backgroundColor: "var(--btn-primary)",
            color: "black",
          }}
        >
          Conoce más
        </motion.button>
      </div>

      {/* Degradado inferior */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-3 rounded-t-full z-0 pointer-events-none select-none"
        style={{ backgroundColor: "var(--btn-primary)" }}
      />
    </section>
  );
}
