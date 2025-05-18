"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaGasPump, FaDoorClosed, FaCogs } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CarCard({ car }) {
  if (!car) {
    return <div className="text-red-500">Datos del carro no disponibles</div>;
  }

  const images = Array.isArray(car.images)
    ? car.images.filter((img) => typeof img === "string")
    : [];

    console.log("Car images:", car.images);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md border transition transform hover:scale-[1.02] hover:shadow-lg duration-300">
      <div className="h-40 w-full bg-gray-200 relative">
        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div key={idx} className="h-40 w-full relative">
                <Image
                  src={img}
                  alt={car.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center h-40 w-full bg-gray-100 text-gray-500 text-sm">
            No hay imágenes disponibles
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            {car.marca ?? "Sin marca"} {car.modelo ?? ""}
          </h2>
          <span className="text-yellow-600 font-bold text-sm">
            ${car.price ? Number(car.price).toLocaleString() : "0"}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">Año: {car.modelo ?? "N/A"}</p>

        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-gray-500" />
            {car.combustible ?? "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-gray-500" />
            {car.transmision ?? "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <FaDoorClosed className="text-gray-500" />
            {car.puertas ?? "N/A"} puertas
          </div>
        </div>

        <Link
          href={`/carro/${car.id}`}
          className="block text-center bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
