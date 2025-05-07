const FindHome = () => {
    return (
      <section className="relative bg-[url('/images/Fondo-FindHome.png')] bg-no-repeat bg-cover bg-center text-white font-poppins py-20 px-4 text-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />
  
        {/* Contenido */}
        <header className="mb-10 max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow mb-3">
            Encuentra lo que buscas
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam,
            fuga nam veniam veritatis incidunt nobis error tempora ipsa
            consequatur, modi optio eum corrupti cum. Sed saepe ducimus dolore
            illo esse.
          </p>
        </header>
  
        <form className="relative z-10 bg-white text-black shadow-2xl rounded-xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-4 mb-10">
          <div className="flex flex-col text-left w-full md:w-[30%]">
            <label htmlFor="location" className="text-xs font-semibold mb-1">
              Localización
            </label>
            <select
              id="location"
              name="location"
              className="p-2 border border-gray-300 rounded-md"
            >
              <option>Selecciona una Ciudad</option>
              <option>Tunja</option>
              <option>Bogotá D.C</option>
              <option>Bucaramanga</option>
              <option>Chiquinquirá</option>
            </select>
          </div>
          <div className="flex flex-col text-left w-full md:w-[30%]">
            <label htmlFor="propertyType" className="text-xs font-semibold mb-1">
              Tipo de Propiedad
            </label>
            <select
              id="propertyType"
              name="propertyType"
              className="p-2 border border-gray-300 rounded-md"
            >
              <option>Selecciona un Tipo</option>
              <option>Departamento</option>
              <option>Casa</option>
              <option>Lote</option>
            </select>
          </div>
          <div className="flex flex-col text-left w-full md:w-[30%]">
            <label htmlFor="priceRange" className="text-xs font-semibold mb-1">
              Rango de precio
            </label>
            <select
              id="priceRange"
              name="priceRange"
              className="p-2 border border-gray-300 rounded-md"
            >
              <option>Selecciona un rango</option>
              <option>- $100.000.000</option>
              <option>$100.000.000 a $300.000.000</option>
              <option>$300.000.000 a $600.000.000</option>
              <option>$600.000.000 a $1.000.000.000</option>
              <option>+ $1.000.000.000</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-[#0f1c46] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1a295c] transition-all duration-200 shadow"
          >
            Buscar propiedad
          </button>
        </form>
  
        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <button className="bg-[#ffcc00] text-[#0f1c46] font-semibold px-6 py-2 rounded-md hover:brightness-110 transition">
            Explorar propiedades
          </button>
          <button className="bg-white text-[#0f1c46] font-semibold px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
            Contáctanos
          </button>
          <button className="bg-[#0f1c46] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1a295c] transition">
            Agenda una visita
          </button>
        </div>
      </section>
    );
  };
  
  export default FindHome;
  