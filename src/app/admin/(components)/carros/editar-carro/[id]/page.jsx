"use client";

import {
    ArrowLeftCircle,
    Car,
    ChevronLeft,
    ChevronRight,
    DoorOpen,
    Gauge,
    MapPin,
    Settings,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCars } from "../../../../../../lib/api";

const tabs = ["Video", "Mapa"];

const CarDetailPage = () => {
  const { id } = useParams();
  const [carro, setCarro] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Video");
  const [thumbStart, setThumbStart] = useState(0);
  const visibleThumbs = 4;

  useEffect(() => {
    if (!id) return;

    const fetchCarro = async () => {
      try {
        const cars = await getCars();
        const foundCar = cars.find((c) => c.id.toString() === id.toString());
        setCarro(foundCar);
      } catch (error) {
        console.error("Error al obtener el carro:", error);
      }
    };

    fetchCarro();
  }, [id]);

  if (!carro) return <div className="p-8">Cargando...</div>;

  const handleThumbNav = (direction) => {
    if (direction === "prev" && thumbStart > 0) {
      setThumbStart(thumbStart - 1);
    } else if (
      direction === "next" &&
      thumbStart + visibleThumbs < carro.images.length
    ) {
      setThumbStart(thumbStart + 1);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20 max-w-screen-2xl mx-auto py-6">
      <Link
        href="/admin/carros"
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium mb-6 transition-all bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full shadow"
      >
        <ArrowLeftCircle className="w-5 h-5" /> Volver a Carros
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{carro.title}</h1>
        <span className="text-sky-700 bg-sky-100 px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
          ${carro.price.toLocaleString()}
        </span>
      </div>

      <div className="md:flex md:gap-6">
        <div className="md:flex-1">
          <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[400px] mb-4">
            {carro.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={carro.title}
                width={800}
                height={600}
                className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${
                  idx === activeImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={() => handleThumbNav("prev")}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-3 overflow-hidden">
              {carro.images
                .slice(thumbStart, thumbStart + visibleThumbs)
                .map((img, idx) => {
                  const actualIdx = thumbStart + idx;
                  return (
                    <button
                      key={actualIdx}
                      onClick={() => setActiveImage(actualIdx)}
                      className={`rounded-xl overflow-hidden transition-all ring-offset-2 ${
                        actualIdx === activeImage
                          ? "ring-2 ring-blue-600"
                          : "hover:ring-1 hover:ring-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Vista ${actualIdx + 1}`}
                        width={120}
                        height={90}
                        className="object-cover w-28 h-20"
                      />
                    </button>
                  );
                })}
            </div>

            <button
              onClick={() => handleThumbNav("next")}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Descripción del Vehículo
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {carro.description}
            </p>
          </div>
        </div>

        <div className="md:w-[500px] mt-6 md:mt-0 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Características del Vehículo
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Car className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Modelo</p>
                  <p className="text-sm">{carro.modelo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <MapPin className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Ubicación</p>
                  <p className="text-sm">{carro.direccion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Gauge className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Motor</p>
                  <p className="text-sm">{carro.combustible}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Settings className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Transmisión</p>
                  <p className="text-sm">{carro.transmision}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <DoorOpen className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Puertas</p>
                  <p className="text-sm">{carro.puertas}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
