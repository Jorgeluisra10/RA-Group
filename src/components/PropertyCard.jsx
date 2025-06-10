"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    autoplaySpeed: 2500,
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
      className="relative bg-white rounded-xl overflow-hidden shadow-md border transition-transform hover:scale-[1.02] hover:shadow-lg duration-300 flex flex-col h-full"
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    >
      {/* Imagen o carrusel */}
      <div className="h-[210px] w-full bg-gray-200 relative flex-shrink-0">
        {hasMultipleImages ? (
          <Slider
            {...settings}
            key={autoplay ? "autoplay" : "no-autoplay"}
            className="[&_.slick-dots]:!bottom-2 [&_.slick-dots]:!z-10 h-full"
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

      {/* Contenido */}
      <div className="p-4 border-t flex flex-col justify-between flex-grow">
        {/* Precio */}
        <span className="text-yellow-600 font-bold text-lg mb-1 block">
          {formatPrice(property.price)}
        </span>

        {/* Título */}
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1">
          {property.title || "Sin título"}
        </h2>

        {/* Ubicación */}
        <p className="text-sm text-gray-500 line-clamp-1 mb-3">
          {`${property.barrio || ""}, ${property.ciudad || ""}`}
        </p>

        {/* Íconos de detalles */}
        <div className="grid grid-cols-3 text-xs text-gray-600 gap-2 mb-4">
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

        {/* Botón */}
        <Link
          href={`/propiedad/${property.id}`}
          className="block text-center bg-[#0f1c46] text-white py-2 rounded-md font-medium hover:bg-[#fdc700] transition mt-auto"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
