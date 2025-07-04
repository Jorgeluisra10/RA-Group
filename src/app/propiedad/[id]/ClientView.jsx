'use client';

import Image from 'next/image';
import { Heart, BedDouble, Bath, Car, Ruler, MapPin, Share2 } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import AgentCard from './(components)/AgentCard';
import ZonaInfo from './(components)/ZonaInfo';
import SimilarProperties from './(components)/SimilarProperties';

const MapView = dynamic(() => import('../../../components/MapView/MapView'), { ssr: false });

export default function ClientView({ property }) {
  const [mainImage, setMainImage] = useState(property?.images?.[0]);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (error) {
      console.error('Error al compartir', error);
    }
  };

  const handleContact = (type) => {
    const message = `Hola, estoy interesado en la propiedad ${property.title}`;
    if (type === 'whatsapp') {
      const url = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else if (type === 'email') {
      window.location.href = `mailto:contacto@tupropiedad.com?subject=Interés en ${property.title}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-fade-in-up">
      {/* Imagen Principal + botones */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden">
        <Image src={mainImage} alt="Principal" fill className="object-cover transition duration-300" priority />
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={toggleLike} className="bg-[var(--navbackground)] hover: p-2 rounded-full shadow heart-hover">
            <Heart className={`w-5 h-5 ${liked ? 'fill-[var(--btn-primary)] text-[var(--btn-primary)] heart-animate' : 'text-[var(--heart-button)]'}`} />
          </button>
          <button onClick={handleShare} className="bg-[var(--navbackground)] hover: p-2 rounded-full shadow heart-hover">
            <Share2 className="w-5 h-5 text-[var(--heart-button)]" />
          </button>
        </div>
      </div>

      {/* Galería miniaturas */}
      <div className="flex gap-2 overflow-x-auto px-1 pb-2">
        {property.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className="min-w-[80px] md:min-w-[100px] h-[60px] md:h-[70px] relative rounded overflow-hidden focus:outline-none hover:scale-105 transition"
          >
            <Image src={img} alt={`img-${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Título, dirección, precio */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-default)]">
            {property.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {property.direccion || 'Dirección no disponible'}
          </p>
        </div>
        <span className="text-[var(--text-active)] text-2xl font-semibold">
          ${property.price.toLocaleString()}
        </span>
      </div>

      {/* Características */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div className="flex flex-col items-center">
          <BedDouble className="w-5 h-5 mb-1 icon-color" />
          <strong className="text-[var(--text-default)]">{property.habitaciones} Dormitorios</strong>
        </div>
        <div className="flex flex-col items-center">
          <Bath className="w-5 h-5 mb-1 icon-color" />
          <strong className="text-[var(--text-default)]">{property.banos} Baños</strong>
        </div>
        <div className="flex flex-col items-center">
          <Car className="w-5 h-5 mb-1 icon-color" />
          <strong className="text-[var(--text-default)]">{property.garaje} Cocheras</strong>
        </div>
        <div className="flex flex-col items-center">
          <Ruler className="w-5 h-5 mb-1 icon-color" />
          <strong className="text-[var(--text-default)]">{property.area} m²</strong>
        </div>
      </div>

      {/* Descripción + Agente + Similares */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-xl font-semibold text-[var(--text-default)]">Descripción</h2>
          <div className="bg-[var(--gray-hover)] p-4 rounded-md">
            <p className="text-[var(--text-secondary)] whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Mapa Interactivo */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-[var(--text-default)]">Ubicación</h2>
            <MapView ciudad={property.ciudad || 'Buenos Aires'} />
          </div>

          <ZonaInfo />
        </div>

        <div className="flex flex-col gap-6">
          <AgentCard property={property} onContact={handleContact} />
          <SimilarProperties property={property} />
        </div>
      </div>
    </div>
  );
}
