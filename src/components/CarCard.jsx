"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  FaGasPump,
  FaCogs,
  FaCity,
  FaRegHeart,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CarCard({ car }) {
  const [autoplay, setAutoplay] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 400);
  };

  if (!car)
    return <div className="text-red-500">Datos del carro no disponibles</div>;

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

  return (
    <div
      className="relative rounded-xl overflow-hidden border shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02] bg-[var(--navbackground)]"
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
      <div className="h-[210px] bg-gray-200">
        {images.length > 0 ? (
          <Slider
            {...settings}
            key={autoplay ? "autoplay" : "no-autoplay"}
            className="[&_.slick-dots]:!bottom-2 [&_.slick-dots]:!z-10 h-full"
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative h-[210px] w-full">
                <Image
                  src={img}
                  alt={car.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No hay imágenes disponibles
          </div>
        )}
      </div>

      {/* 📄 Contenido */}
      <div className="p-4">
        <p className="text-[var(--btn-primary)] font-extrabold text-xl leading-tight mb-1">
          ${car.price ? Number(car.price).toLocaleString("es-CO") : "0"}
        </p>

        <h2 className="font-semibold text-base leading-snug line-clamp-2 mb-1 text-[var(--text-default)]">
          {car.title ?? "Sin título"}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mb-1">
          Única Dueña - Placas de Bogotá
        </p>

        <div className="flex items-center text-sm text-[var(--text-secondary)] gap-2 mb-3">
          <FaCalendarAlt />
          <span>Año {car.modelo ?? "N/A"}</span>
        </div>

        {/* 🧩 Características en recuadros */}
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
          className="mt-2 block text-center font-semibold bg-[var(--blue-main)] text-white py-2 rounded-md hover:bg-[var(--btn-primary)] hover:text-[var(--btn-secondary)] transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
