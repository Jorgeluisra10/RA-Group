export default function HeaderVendeConInmova() {
  return (
    <section className="relative overflow-hidden bg-[#0f1c46] text-white font-poppins">
      {/* Fondo con formas curvas usando pseudo-elementos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-[#ffffff1a] rounded-full mix-blend-overlay blur-2xl" />
        <div className="absolute -bottom-20 -right-32 w-[500px] h-[500px] bg-[#ffffff1a] rounded-full mix-blend-overlay blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c46] via-[#0f1c46] to-[#0f1c46]/90 opacity-90" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Quieres vender tu propiedad con Inmova?
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Déjalo en manos expertas. Te guiamos de principio a fin.
        </p>
        <button className="bg-[#fdc700] text-[#0f1c46] font-semibold py-3 px-6 rounded-md text-lg hover:bg-[#e6b800] transition">
          Comienza ahora
        </button>
      </div>

      {/* Degradado inferior tipo sombra */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
