"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function PropertyCard({ property }) {
  const [autoplay, setAutoplay] = useState(false);

  if (!property) {
    return (
      <div className="text-red-500 p-4 border rounded-md">
        Datos de la propiedad no disponibles
      </div>
    );
  }

  const images = Array.isArray(property.images)
    ? property.images.filter((img) => typeof img === "string")
    : [];

  const hasMultipleImages = images.length > 1;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: hasMultipleImages && autoplay,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const formatPrice = (price) =>
    typeof price === "number"
      ? `$${price.toLocaleString()}`
      : "Precio no disponible";

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow-md border transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    >
      <div className="h-[210px] w-full bg-gray-200 relative">
        {hasMultipleImages ? (
          <Slider
            {...settings}
            key={autoplay ? "autoplay" : "no-autoplay"}
            className="[&_.slick-dots]:!bottom-2 [&_.slick-dots]:!z-10"
          >
            {images.map((img, idx) => (
              <div key={idx} className="h-[210px] w-full relative">
                <Image
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </Slider>
        ) : images.length === 1 ? (
          <div className="h-[210px] w-full relative">
            <Image
              src={images[0]}
              alt="Imagen única"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
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
