"use client";
import React from "react";
import dynamic from "next/dynamic";
import { FaGasPump, FaDoorOpen, FaCogs } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// Cargar react-slick dinámicamente solo en cliente
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const CarCard = ({ car }) => {
  if (!car || !Array.isArray(car.images)) {
    return <div className="text-red-500"></div>;
  }

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
      {/* Badge */}
      {car.badge && (
        <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-md text-white ${
          car.badge === "Featured" ? "bg-yellow-500" : "bg-blue-600"
        }`}>
          {car.badge}
        </div>
      )}

      {/* Carrusel de imágenes */}
      <div className="h-48 w-full bg-gray-200">
        <Slider {...settings}>
          {car.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${car.title} ${idx + 1}`}
              className="h-48 w-full object-cover"
            />
          ))}
        </Slider>
      </div>

      {/* Detalles */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <h2 className="mt-6 text-base font-semibold text-gray-900">{car.title}</h2>
          <span className="text-yellow-600 font-bold text-sm">${car.price.toLocaleString("es-CO")}</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{car.location}</p>

        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-gray-500" /> {car.engine}
          </div>
          <div className="flex items-center gap-1">
            <FaDoorOpen className="text-gray-500" /> {car.doors} Puertas
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-gray-500" /> {car.transmission}
          </div>
        </div>

        <Link
          href={`/carro/${car.id}`}
          className="mt-4 w-full inline-block text-center bg-blue-900 text-white py-2 rounded-md font-medium hover:bg-blue-800 transition duration-200"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
// This component is a card that displays car details, including a carousel of images, title, price, location, and specifications like engine type, number of doors, and transmission type. It also includes a button to view more details about the car.