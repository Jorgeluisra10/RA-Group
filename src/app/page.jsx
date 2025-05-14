import properties from "../data/properties";
import car from "../data/Cars";
import PropertyCard from "../components/PropertyCard";
import CarCard from "../components/CarCard"; // Asegúrate de que la ruta sea correcta
import WhatsAppButton from "../components/Whatsapp";
import FindHome from "../components/FindHome";
import Comments from "../components/Comments";

const Home = () => {
  return (
    <main>
      <FindHome />
      <div className="p-6 md:p-10 font-Poppins max-w-screen-xl mx-auto animate-fade-in-up">
        {/* Sección de propiedades */}
        <section className="mb-20">
          <h1 className="mt-8 text-4xl font-semibold mb-4 text-center">
            Propiedades destacadas
          </h1>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
            Encuentra las mejores propiedades disponibles actualmente. Espacios
            modernos, ubicaciones privilegiadas y todo lo que necesitas para
            vivir o invertir con confianza.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Línea divisora */}
        <hr className="border-t border-gray-300 my-12 w-1/2 mx-auto" />

        {/* Sección de autos */}
        <section className="mb-20">
          <h1 className="text-4xl font-semibold mb-4 text-center">
            Autos destacados
          </h1>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
            Explora nuestra selección de vehículos destacados. Calidad,
            rendimiento y estilo en un solo lugar, con opciones que se adaptan a
            tu estilo de vida.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {car.map((c, i) => (
              <CarCard key={i} car={c} />
            ))}
          </div>
        </section>
        <hr className="border-t border-gray-300 w-1/2 mx-auto" />
        {/* Línea divisora */}
      </div>
      <Comments />
      <WhatsAppButton />
    </main>
  );
};

export default Home;

// This is the main page of the application. It imports the properties data and the PropertyCard component.
