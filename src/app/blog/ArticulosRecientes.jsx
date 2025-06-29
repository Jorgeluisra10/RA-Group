'use client';

import { motion } from 'framer-motion';

const mockArticles = [
  {
    title: '5 características que hacen que una propiedad se venda más rápido',
    desc: 'Descubre qué elementos son los más valorados por los compradores actuales...',
    date: '12 de julio, 2023',
    author: 'Carlos Mendoza',
    tag: 'Propiedades',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: '¿Eléctrico o híbrido? Guía para elegir tu próximo vehículo',
    desc: 'Analizamos las ventajas y desventajas de cada tecnología para ayudarte a tomar...',
    date: '10 de julio, 2023',
    author: 'Ana Gutiérrez',
    tag: 'Vehículos',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Inversión inmobiliaria vs. mercado de valores: ¿Dónde invertir en 2023?',
    desc: 'Un análisis comparativo de los rendimientos y riesgos de ambas...',
    date: '8 de julio, 2023',
    author: 'Roberto Vega',
    tag: 'Inversiones',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Cómo elegir al agente inmobiliario perfecto para tus necesidades',
    desc: 'Las preguntas clave que debes hacer y las señales que indican que has...',
    date: '5 de julio, 2023',
    author: 'Laura Martínez',
    tag: 'Propiedades',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Mantenimiento preventivo: Cómo extender la vida útil de tu vehículo',
    desc: 'Consejos prácticos y rutinas de mantenimiento que te ayudarán a...',
    date: '2 de julio, 2023',
    author: 'Miguel Ángel Torres',
    tag: 'Vehículos',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Arquitectura sostenible: El futuro de la construcción residencial',
    desc: 'Cómo los nuevos desarrollos están incorporando tecnologías verdes y...',
    date: '30 de junio, 2023',
    author: 'Daniel Herrera',
    tag: 'Tendencias',
    color: 'bg-purple-100 text-purple-700',
  },
];

const ArticulosRecientes = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Título */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-default)]">Artículos recientes</h2>
        <div className="flex gap-3 text-sm flex-wrap">
          {['Todos', 'Propiedades', 'Vehículos', 'Inversiones'].map((cat, idx) => (
            <button
              key={idx}
              className="px-4 py-1.5 rounded-full border text-[var(--text-default)] hover:bg-[var(--gray-hover)] transition font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tarjetas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {mockArticles.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-[var(--navbackground)] rounded-xl shadow-md overflow-hidden border border-[var(--gray-border)] hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Placeholder de imagen */}
            <div className="w-full h-40 bg-[var(--gray-hover)] dark:bg-[var(--gray-border)]" />

            {/* Contenido */}
            <div className="p-5 flex flex-col gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${post.color} w-fit`}>
                {post.tag}
              </span>
              <h3 className="text-[var(--text-default)] font-bold text-lg leading-snug">
                {post.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">{post.desc}</p>
              <div className="text-xs text-[var(--text-secondary)] mt-2 flex items-center justify-between">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Botón Cargar más */}
      <div className="mt-10 flex justify-center">
        <button className="relative px-6 py-2 bg-[var(--blue-main)] text-white font-semibold text-sm rounded-full hover:bg-[var(--blue-hover)] transition-all overflow-hidden btn-shine">
          Cargar más artículos
        </button>
      </div>
    </section>
  );
};

export default ArticulosRecientes;
