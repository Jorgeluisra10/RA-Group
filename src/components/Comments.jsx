const Comments = () => {
    return (
      <div className="bg-white px-4 text-center">
        {/* Título */}
        <div className="mb-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Lo que dicen nuestros Clientes
          </h2>
        </div>
  
        {/* Subtítulo */}
        <div className="mb-10">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Escucha a nuestros clientes satisfechos que encontraron sus propiedades soñadas con Prestige Properties.
          </p>
        </div>
  
        {/* Tarjeta 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto md:inline-block md:mx-4 md:align-top text-left">
          <div
            className="text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg mb-2"
            style={{ backgroundColor: '#1A295C' }}
          >
            JD
          </div>
          <div className="font-semibold text-gray-800">Juan Ramirez</div>
          <div className="text-sm text-gray-500 mb-2">Comprador</div>
          <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
          <p className="text-sm text-gray-700 italic">
            Trabajar con Prestige Properties fue un verdadero placer. Entendieron nuestras necesidades perfectamente y encontraron nuestra casa soñada en poco tiempo. Todo el proceso fue fluido y sin estrés.
          </p>
        </div>
  
        {/* Tarjeta 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto md:inline-block md:mx-4 md:align-top text-left">
          <div
            className="text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg mb-2"
            style={{ backgroundColor: '#1A295C' }}
          >
            AG
          </div>
          <div className="font-semibold text-gray-800">Andrés Gamboa</div>
          <div className="text-sm text-gray-500 mb-2">Comprador</div>
          <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
          <p className="text-sm text-gray-700 italic">
            Como inversionista, valoro mucho la visión del mercado y la guía profesional de Prestige Properties. Me ayudaron a encontrar propiedades con excelente potencial de retorno.
          </p>
        </div>
  
        {/* Tarjeta 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto md:inline-block md:mx-4 md:align-top text-left">
          <div
            className="text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg mb-2"
            style={{ backgroundColor: '#1A295C' }}
          >
            MG
          </div>
          <div className="font-semibold text-gray-800">Maria García</div>
          <div className="text-sm text-gray-500 mb-2">Compradora</div>
          <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
          <p className="text-sm text-gray-700 italic">
            Estaba nerviosa por comprar mi primera casa, pero el equipo de Prestige me acompañó en cada paso con paciencia y experiencia. No podría estar más feliz.
          </p>
        </div>
      </div>
    );
  };
  
  export default Comments;
  