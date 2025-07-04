"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FaGasPump, FaCogs, FaCity, FaCalendarAlt } from "react-icons/fa";
import FavoriteButton from "../components/FavoriteButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CarCard({ car }) {
  const [autoplay, setAutoplay] = useState(false);

  if (!car) {
    return <div className="text-red-500">Datos del carro no disponibles</div>;
  }

  const images = Array.isArray(car.images)
    ? car.images.filter((img) => typeof img === "string")
    : [];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "0";
    return `$${price.toLocaleString("es-CO")}`;
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden border-black dark:border-none shadow-[0_0_8px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(253,216,53,0.4)] transition-all duration-300 transform hover:scale-[1.015] bg-white dark:bg-[var(--navbackground)] flex flex-col h-full"
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    >
      {/* ❤️ Botón Favorito */}
      <FavoriteButton itemId={car.id} itemType="car" />

      {/* 📷 Imágenes */}
      <div className="h-[210px] bg-gray-200 relative flex-shrink-0">
        {images.length > 0 ? (
          <Slider
            {...settings}
            className="[&_.slick-dots]:!bottom-2 [&_.slick-dots]:!z-10 h-full"
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative h-[210px] w-full">
                <Image
                  src={img}
                  alt={car.title || `Carro ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No hay imágenes disponibles
          </div>
        )}
      </div>

      {/* 📄 Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <p className="text-[var(--btn-primary)] font-extrabold text-xl leading-tight mb-1">
          {formatPrice(car.price)}
        </p>

        <h2 className="font-semibold text-base leading-snug line-clamp-2 mb-1 text-[var(--text-default)]">
          {car.title ?? "Sin título"}
        </h2>

        <div className="flex items-center text-sm text-[var(--text-secondary)] gap-2 mb-3">
          <FaCalendarAlt />
          <span>Año {car.modelo ?? "N/A"}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm font-medium text-[var(--text-default)] mb-4">
          <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
            <FaGasPump className="icon-color" />
            {car.combustible ?? "N/A"}
          </div>
          <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
            <FaCogs className="icon-color" />
            {car.transmision ?? "N/A"}
          </div>
          <div className="flex items-center gap-1 bg-[var(--gray-hover)] px-2 py-2 rounded-md justify-center">
            <FaCity className="icon-color" />
            {car.ciudad ?? "N/A"}
          </div>
        </div>

        <Link
          href={`/vehiculo/${car.id}`}
          className="mt-auto block text-center font-semibold bg-[var(--blue-main)] text-white py-2 rounded-md hover:bg-[var(--btn-primary)] hover:text-[var(--btn-secondary)] transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
