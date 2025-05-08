import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md border transition transform hover:scale-[1.02] hover:shadow-lg duration-300">
      {/* Badge */}
      {property.badge && (
        <div
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-md text-white ${
            property.badge === "Featured" ? "bg-yellow-500" : "bg-blue-600"
          }`}
        >
          {property.badge}
        </div>
      )}

      {/* Image Section */}
      <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            {property.title}
          </h2>
          <span className="text-yellow-600 font-bold text-sm">
            ${property.price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{property.location}</p>

        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-gray-500" /> {property.area} m²
          </div>
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" /> {property.beds} Beds
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" /> {property.baths} Baths
          </div>
        </div>

        <Link
          href={`/propiedad/${property.id}`}
          className="mt-4 w-full inline-block text-center bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-800 transition duration-200"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
