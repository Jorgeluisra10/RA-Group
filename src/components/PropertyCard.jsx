"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaBed, FaBath, FaRulerCombined, FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function PropertyCard({ property }) {
  const [autoplay, setAutoplay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 400);
  };

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
      ? `$${price.toLocaleString("es-CO")}`
      : "Precio no disponible";

  const tipoVivienda = ["apartamento", "casa", "oficina", "local"];
  const mostrarDetallesCompletos = tipoVivienda.includes(
    property.tipo?.toLowerCase()
  );

  return (
    <div
      className="relative rounded-xl overflow-hidden border shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02] bg-[var(--navbackground)] flex flex-col h-full"
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    >
      {/* ❤️ Botón Favorito */}
      <button
        onClick={toggleFavorite}
        aria-label="Favorito"
        className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center bg-[var(--navbackground)] rounded-full shadow transition-colors heart-hover"
      >
        {isFavorite ? (
          <FaHeart
            className={`text-[var(--btn-primary)] transition-all duration-200 ${heartAnimation ? "heart-animate" : ""}`}
          />
        ) : (
          <FaRegHeart
            className={`text-[var(--heart-button)] transition-all duration-200 hover:text-[var(--btn-primary)] ${heartAnimation ? "heart-animate" : ""}`}
          />
        )}
      </button>

      {/* 📷 Imágenes */}
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

      {/* 📄 Contenido */}
      <div className="p-4 border-t flex flex-col justify-between flex-grow">
        <span className="text-[var(--btn-primary)] font-bold text-lg mb-1 block">
          {formatPrice(property.price)}
        </span>

        <h2 className="text-base font-semibold text-[var(--text-default)] line-clamp-2 mb-1">
          {property.title || "Sin título"}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
          {property.descripcion || "Sin descripción"}
        </p>

        <p className="text-sm text-[var(--text-secondary)] line-clamp-1 mb-3">
          {`${property.barrio || ""}, ${property.ciudad || ""}`}
        </p>

        <div className={`grid ${mostrarDetallesCompletos ? "grid-cols-3" : "grid-cols-1"} text-xs font-medium text-[var(--text-default)] gap-2 mb-4`}>
          <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
            <FaRulerCombined className="icon-color" />
            {property.area ?? "N/A"} m²
          </div>

          {mostrarDetallesCompletos && (
            <>
              <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
                <FaBed className="icon-color" />
                {property.habitaciones ?? "N/A"} Habitaciones
              </div>
              <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
                <FaBath className="icon-color" />
                {property.banos ?? "N/A"} Baños
              </div>
            </>
          )}
        </div>

        <Link
          href={`/propiedad/${property.id}`}
          className="block text-center font-semibold bg-[var(--blue-main)] text-white py-2 rounded-md hover:bg-[var(--btn-primary)] hover:text-[var(--btn-secondary)] transition-colors duration-300 mt-auto"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
