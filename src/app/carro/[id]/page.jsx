"use client";

import { useState } from "react";
import car from "../../../data/Cars";
import Link from "next/link";
import Image from "next/image";
import YoutubeEmbed from "../../../components/YoutubeEmbed";

// Lista de pestañas para la navegación de secciones
const tabs = ["Video", "Mapa"];

const CarDetailPage = ({ params }) => {
  const carro = car.find((item) => item.id === Number(params.id));
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Video");

  if (!carro) {
    return <div className="p-8">Carro no encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link
        href="/carros"
        className="text-blue-600 hover:underline font-medium mb-4 inline-block transition-all"
      >
        ← Volver a Carros
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{carro.title}</h1>
        <span className="text-yellow-500 bg-yellow-100 px-4 py-2 rounded-full font-semibold text-lg shadow">
          ${carro.price.toLocaleString()}
        </span>
      </div>

      <div className="mb-6">
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

        <div className="flex gap-3 justify-center flex-wrap">
          {carro.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`rounded-xl overflow-hidden transition-all ring-offset-2 ${
                idx === activeImage
                  ? "ring-2 ring-blue-600"
                  : "hover:ring-1 hover:ring-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`Vista ${idx + 1}`}
                width={120}
                height={90}
                className="object-cover w-28 h-20"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 mt-7 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-yellow-400 inline-block pb-1">Descripción</h2>
          <p className="leading-relaxed text-gray-600 text-justify">{carro.description}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Características</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex justify-between border-b pb-2">
              <span className="font-semibold">🛞 Modelo:</span>
              <span>{carro.model}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-semibold">📍 Ubicación:</span>
              <span>{carro.location}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-semibold">🔧 Motor:</span>
              <span>{carro.engine}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-semibold">⚙️ Transmisión:</span>
              <span>{carro.transmission}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">🚪 Puertas:</span>
              <span>{carro.doors}</span>
            </li>
          </ul>
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
            <div className="text-gray-700 italic">(Aquí se mostrará el mapa)</div>
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
