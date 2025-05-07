import { properties } from "../data/properties";
import car from "../data/Cars";
import PropertyCard from "../components/PropertyCard";
import WhatsAppButton from "@/components/Whatsapp";
import CarCard from "@/components/CarCard";

const Home = () => {
  return (
    <main className="p-8">
      <h1 className="mt-7 text-3xl font-bold mb-8">Propiedades destacadas</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-8 mt-7">Autos destacados</h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-6">
        {car.map((c, i) => (
          <CarCard key={i} car={c} />
        ))}
      </div>
      <WhatsAppButton />
    </main>
  );
};

export default Home;

// This is the main page of the application. It imports the properties data and the PropertyCard component.