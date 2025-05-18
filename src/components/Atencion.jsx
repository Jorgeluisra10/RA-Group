const Atencion = () => {
  return (
    <section className="relative py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto text-center rounded-lg overflow-hidden bg-[#f0f4ff] shadow-lg shadow-[#1a295c33]">
      {/* Difuminado arriba */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#f0f4ff] to-transparent blur-xl opacity-80 z-20" />
      {/* Difuminado abajo */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f0f4ff] to-transparent blur-xl opacity-80 z-20" />

      {/* Fondo patrón sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=40 height=40 viewBox=0 0 40 40 xmlns=http://www.w3.org/2000/svg><circle cx=1 cy=1 r=1 fill=%231a295c33 fill-opacity=0.1/></svg>')]"
        style={{ backgroundRepeat: "repeat" }}
      />

      {/* Contenido con backdrop-filter */}
      <div className="relative z-30 backdrop-blur-sm bg-white/60 rounded-lg p-10 shadow-inner shadow-[#1a295c22]">
        <h2 className="text-3xl font-extrabold text-[#1A295C] mb-10 drop-shadow-sm">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Rapidez */}
          <div className="flex flex-col items-center space-y-5 transform transition duration-500 hover:scale-105 hover:drop-shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#1A295C] animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-[#1A295C]">Rapidez</h3>
            <p className="text-gray-700 max-w-xs leading-relaxed">
              Encuentra y concreta tus transacciones en tiempo récord.
            </p>
          </div>

          {/* Seguridad */}
          <div className="flex flex-col items-center space-y-5 transform transition duration-500 hover:scale-105 hover:drop-shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#1A295C] animate-pulse-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-3.866 0-7-3.134-7-7V7a7 7 0 0114 0v7c0 3.866-3.134 7-7 7z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-[#1A295C]">Seguridad</h3>
            <p className="text-gray-700 max-w-xs leading-relaxed">
              Transacciones seguras con protección y respaldo en todo momento.
            </p>
          </div>

          {/* Atención personalizada */}
          <div className="flex flex-col items-center space-y-5 transform transition duration-500 hover:scale-105 hover:drop-shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#1A295C] animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 10c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-2a4 4 0 00-4-4H6a2 2 0 00-2 2v2a2 2 0 002 2h4z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-[#1A295C]">
              Atención personalizada
            </h3>
            <p className="text-gray-700 max-w-xs leading-relaxed">
              Nuestro equipo está disponible para ayudarte en cada paso.
            </p>
          </div>

          {/* Variedad */}
          <div className="flex flex-col items-center space-y-5 transform transition duration-500 hover:scale-105 hover:drop-shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#1A295C] animate-pulse-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-[#1A295C]">Variedad</h3>
            <p className="text-gray-700 max-w-xs leading-relaxed">
              Amplia selección de propiedades y autos para todos los gustos.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Animaciones personalizadas aceleradas */
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Atencion;
