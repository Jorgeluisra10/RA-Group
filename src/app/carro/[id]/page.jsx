"use client";

import { use, useState } from "react";
import car from "../../../data/Cars";
import Link from "next/link";
import Image from "next/image";
import YoutubeEmbed from "../../../components/YoutubeEmbed";
import FuelEfficiencyCard from "../../../components/FuelEfficiencyCard";
import { ChevronLeft, ChevronRight, Car, MapPin, Settings, Gauge, DoorOpen, ArrowLeftCircle } from "lucide-react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../../components/MapView"), { ssr: false });

const tabs = ["Video", "Mapa"];

const CarDetailPage = ({ params }) => {
  const id = Number(params.id);
  const carro = car.find((item) => item.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Video");
  const [thumbStart, setThumbStart] = useState(0);
  const visibleThumbs = 4;

  if (!carro) {
    return <div className="p-8">Carro no encontrado.</div>;
  }

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
        href="/carros"
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
                style={{ transitionProperty: "opacity" }}
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
          <FuelEfficiencyCard
            fuelType={carro.fuelType}
            pricePerGallon={carro.pricePerGallon}
            cityKmPerLiter={carro.cityKmPerLiter}
            highwayKmPerLiter={carro.highwayKmPerLiter}
            tankCapacity={carro.tankCapacity}
          />

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Características del Vehículo
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Car className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Modelo</p>
                  <p className="text-sm">{carro.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <MapPin className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Ubicación</p>
                  <p className="text-sm">{carro.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Gauge className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Motor</p>
                  <p className="text-sm">{carro.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <Settings className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Transmisión</p>
                  <p className="text-sm">{carro.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition">
                <DoorOpen className="text-blue-600 w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Puertas</p>
                  <p className="text-sm">{carro.doors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors duration-300 border-b-2 ${
                activeTab === tab
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-yellow-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "Video" && (
            <div>
              <YoutubeEmbed videoId={carro.videoId} />
            </div>
          )}
          {activeTab === "Mapa" && (
            <div className="rounded-xl overflow-hidden shadow-lg relative h-[420px]">
              <div className="absolute top-3 left-3 z-10 bg-white/90 text-sm px-4 py-1 rounded-full shadow text-gray-800">
                Muestra la ubicación aproximada del auto respecto a ti
              </div>
              <MapView city={carro.location} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all font-semibold">
          Contactar vendedor
        </button>
      </div>
    </div>
  );
};

export default CarDetailPage;
