"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaGasPump, FaCogs, FaCity } from "react-icons/fa";
import Link from "next/link";
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

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow-md border transition transform hover:scale-[1.02] hover:shadow-lg duration-300 flex flex-col h-full"
      onMouseEnter={() => setAutoplay(true)}
      onMouseLeave={() => setAutoplay(false)}
    >
      {/* Slider */}
      <div className="h-[210px] w-full bg-gray-200 relative flex-shrink-0">
        {images.length > 0 ? (
          <Slider
            {...settings}
            key={autoplay ? "autoplay" : "no-autoplay"}
            className="[&_.slick-dots]:!bottom-2 [&_.slick-dots]:!z-10 h-full"
          >
            {images.map((img, idx) => (
              <div key={idx} className="h-[210px] w-full relative">
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
          <div className="flex items-center justify-center h-[210px] w-full bg-gray-100 text-gray-500 text-sm">
            No hay imágenes disponibles
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 border-t flex flex-col justify-between flex-grow">
        {/* Price */}
        <div className="mb-2">
          <span className="text-yellow-600 font-bold text-lg block">
            ${car.price ? Number(car.price).toLocaleString() : "0"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {car.title ?? "Sin título"}
        </h2>

        {/* Model year */}
        <p className="text-sm text-gray-500 mb-3">
          Año: {car.modelo ?? "N/A"}
        </p>

        {/* Icons row */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-gray-500" />
            {car.combustible ?? "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-gray-500" />
            {car.transmision ?? "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <FaCity className="text-gray-500" />
            {car.ciudad ?? "N/A"}
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/carro/${car.id}`}
          className="block text-center bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors mt-auto"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
