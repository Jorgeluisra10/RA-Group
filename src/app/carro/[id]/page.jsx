import { properties } from "../../../data/properties";
import Link from "next/link";

const PropertyDetail = ({ params }) => {
  const property = properties.find((prop) => prop.id === Number(params.id));

  if (!property) {
    return <div className="p-8">Propiedad no encontrada.</div>;
  }

  return (
    // Dentro de la página de detalle:
    <div>
      <Link
        href="/propiedades"
        className="text-indigo-600 underline mt-6 block"
      >
        Volver a Propiedades
      </Link>
      <div className="p-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
        <p className="text-gray-700 mt-2">{property.description}</p>
        <p className="text-indigo-600 font-bold text-2xl mt-4">
          ${property.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetail;
