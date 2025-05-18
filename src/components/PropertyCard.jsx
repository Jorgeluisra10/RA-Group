"use client";
import React from "react";
import dynamic from "next/dynamic";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function PropertyCard({ property }) {
  if (!property) {
    return (
      <div className="text-red-500 p-4 border rounded-md">
        Datos de la propiedad no disponibles
      </div>
    );
  }

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : null;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const formatPrice = (price) =>
    typeof price === "number" ? `$${price.toLocaleString()}` : "Precio no disponible";

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md border transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
      <div className="h-40 w-full bg-gray-200">
        {images ? (
          <Slider {...settings}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${property.title || "Propiedad"} imagen ${idx + 1}`}
                className="h-40 w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/300x200?text=Sin+imagen";
                }}
              />
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No hay imágenes disponibles
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            {property.title || "Sin título"}
          </h2>
          <span className="text-yellow-600 font-bold text-sm">
            {formatPrice(property.price)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3 truncate">
          {`${property.barrio || ""}, ${property.ciudad || ""}`}
        </p>

        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-gray-500" />
            {property.area ?? "N/A"} m²
          </div>
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" />
            {property.habitaciones ?? "N/A"} Hab.
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            {property.banos ?? "N/A"} Baños
          </div>
        </div>

        <Link
          href={`/propiedad/${property.id}`}
          className="block text-center bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-800 transition duration-200"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
