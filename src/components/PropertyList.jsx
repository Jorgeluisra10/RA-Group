import { properties } from "../../data/properties";
import PropertyCard from "../../components/PropertyCard";

export default function PropertiesPage() {
  return (
    <main className="p-6 md:p-10 font-Poppins max-w-screen-xl mx-auto animate-fade-in-up">
      {/* Sección de propiedades */}
      <section className="mb-20">
        <h1 className="mt-8 text-4xl font-semibold mb-4 text-center">
          Propiedades Disponibles
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
          Encuentra nuestras propiedades disponibles en el mercado. Cada una de
          ellas ha sido seleccionada cuidadosamente para ofrecerte lo mejor en
          calidad y ubicación.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
