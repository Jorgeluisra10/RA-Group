"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MapCarousel({ photos = [] }) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative">
      {/* Carrusel con flechas */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".swiper-prev",
          nextEl: ".swiper-next",
        }}
        pagination={{ clickable: true }}
        className="rounded-lg overflow-hidden"
        spaceBetween={10}
        slidesPerView={1}
      >
        {photos.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Imagen ${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}

        {/* Flechas */}
        <div className="swiper-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-1 rounded-full shadow hover:bg-gray-200 cursor-pointer z-40">
          <ChevronLeft size={18} />
        </div>
        <div className="swiper-next absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-1 rounded-full shadow hover:bg-gray-200 cursor-pointer z-40">
          <ChevronRight size={18} />
        </div>
      </Swiper>
    </div>
  );
}
