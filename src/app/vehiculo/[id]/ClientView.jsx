'use client';

import dynamic from "next/dynamic";
import { useState } from "react";

import CarHeaderInfo from "../(components)/CarHeaderInfo";
import CarImageGallery from "../(components)/CarImageGallery";
import CarSpecsCard from "../(components)/CarSpecsCard";
import InmovaScore from "../(components)/InmovaScore";
import MobileCarDetailTabs from "../(components)/MobileCarDetailTabs";
import YoutubeEmbed from "../(components)/YoutubeEmbed";

const MapView = dynamic(() => import("../../../components/MapView/MapView"), {
  ssr: false,
});

const tabs = ["Video", "Mapa"];

export default function ClientView({ carro }) {
  const [activeTab, setActiveTab] = useState("Video");

  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20 max-w-screen-2xl mx-auto py-6">
      <CarHeaderInfo title={carro.title} price={carro.price} />

      <div className="md:flex md:gap-6 mt-8">
        <div className="md:flex-1">
          <CarImageGallery images={carro.images} title={carro.title} />
          <MobileCarDetailTabs carro={carro} />
        </div>

        <div className="md:w-[500px] mt-6 md:mt-0 space-y-6 hidden md:block animate-fade-in-up">
          <CarSpecsCard carro={carro} />
        </div>
      </div>

      <section className="mt-12 animate-fade-in-up">
        <InmovaScore carroId={carro.id} />
      </section>

      <div className="mt-12">
        <div className="flex gap-6 border-b border-[var(--gray-border)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors duration-300 border-b-2 ${
                activeTab === tab
                  ? "border-[var(--btn-primary)] text-[var(--btn-primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--btn-primary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 animate-fade-in-up">
          {activeTab === "Video" && <YoutubeEmbed youtubeUrl={carro.youtube} />}
          {activeTab === "Mapa" && (
            <div className="rounded-xl overflow-hidden shadow-lg relative h-[420px]">
              <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 text-sm px-4 py-1 rounded-full shadow text-gray-800 dark:text-white">
                Muestra la ubicación aproximada del auto respecto a ti
              </div>
              <MapView mode="detalle" city={carro.ciudad} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 flex justify-center animate-fade-in-up">
        <button className="bg-[var(--blue-main)] hover:bg-[var(--blue-hover)] text-white px-6 py-3 rounded-lg shadow-md transition-all font-semibold">
          Contactar vendedor
        </button>
      </div>
    </div>
  );
}
