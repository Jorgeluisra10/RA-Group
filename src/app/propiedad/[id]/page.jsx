'use client';

import Image from 'next/image';
import { Mail, Phone, Share2, Heart, BedDouble, Bath, Car, Ruler, MapPin, Train, Bus, TreeDeciduous, ShoppingBag, Stethoscope, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProperties } from '../../../lib/api';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../../../components/MapView/MapView'), { ssr: false });

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState('transporte');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProperties();
      const result = data.find((p) => String(p.id) === id);
      setProperty(result);
      setMainImage(result?.images[0]);
      setLoading(false);
    };
    fetchData();
  }, [id]);

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

  if (loading) return <div className="p-8">Cargando propiedad...</div>;
  if (!property) return <div className="p-8">Propiedad no encontrada.</div>;

  const whatsappLink = `https://wa.me/5491123456789?text=Hola,%20estoy%20interesado%20en%20la%20propiedad%20${encodeURIComponent(property.title)}`;

  const zonaTabs = [
    { id: 'transporte', icon: <Train className="w-4 h-4" />, label: 'Transporte' },
    { id: 'educacion', icon: <GraduationCap className="w-4 h-4" />, label: 'Educación' },
    { id: 'verdes', icon: <TreeDeciduous className="w-4 h-4" />, label: 'Áreas verdes' },
    { id: 'comercios', icon: <ShoppingBag className="w-4 h-4" />, label: 'Comercios' },
    { id: 'salud', icon: <Stethoscope className="w-4 h-4" />, label: 'Salud' },
  ];

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

          {/* Información zona responsive */}
          <div className="space-y-2 mt-6">
            <h2 className="text-xl font-semibold text-[var(--text-default)]">Información de la zona</h2>
            <div className="bg-[var(--background)] border border-[var(--gray-border)] rounded-lg p-4">
              <div className="flex flex-wrap gap-3 text-sm text-[var(--text-default)] mb-4">
                {zonaTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${
                      selectedTab === tab.id
                        ? 'bg-[var(--text-active)] text-[var(--btn-secondary)]'
                        : 'border-[var(--gray-border)] text-[var(--text-default)] hover:bg-[var(--gray-hover)]'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm text-[var(--text-secondary)]">
                <div>
                  <strong className="text-[var(--text-default)]">Estación Palermo</strong>
                  <p>Línea D - 400m (5 min caminando)</p>
                </div>
                <div>
                  <strong className="text-[var(--text-default)]">Parada Línea 39</strong>
                  <p>Av. Santa Fe - 200m (2 min caminando)</p>
                </div>
                <div>
                  <strong className="text-[var(--text-default)]">Estación Ministro Carranza</strong>
                  <p>Línea Mitre - 800m (10 min caminando)</p>
                </div>
                <div>
                  <strong className="text-[var(--text-default)]">Metrobus Juan B. Justo</strong>
                  <p>500m (6 min caminando)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agente y similares */}
        <div className="flex flex-col gap-6">
          <div className="bg-[var(--background)] border border-[var(--gray-border)] rounded-lg p-4 flex flex-col items-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[var(--blue-main)] text-white flex items-center justify-center font-bold text-lg">
              MR
            </div>
            <div className="text-center">
              <p className="font-semibold text-[var(--text-default)]">María Rodríguez</p>
              <p className="text-sm text-[var(--text-secondary)]">Asesora Inmobiliaria Senior</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--btn-primary)] text-[var(--btn-secondary)] font-semibold px-4 py-2 rounded-md text-center btn-shine relative overflow-hidden"
              >
                Contactar por WhatsApp
              </a>
              <button className="bg-transparent border border-[var(--gray-border)] text-[var(--text-default)] font-medium px-4 py-2 rounded-md hover:bg-[var(--gray-hover)] transition">
                Enviar email
              </button>
            </div>
          </div>

          {/* Similares */}
          <div className="bg-[var(--background)] border border-[var(--gray-border)] rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold text-[var(--text-default)] mb-2">Propiedades similares</h3>
            {[1, 2, 3].map((p, i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image src={property.images[i]} alt={`similar-${i}`} fill className="object-cover" />
                </div>
                <div className="text-sm">
                  <p className="text-[var(--text-default)] font-medium">{property.title}</p>
                  <p className="text-[var(--text-secondary)]">{property.habitaciones} dorm. | {property.banos} baños | {property.area} m²</p>
                  <p className="text-[var(--text-active)] font-semibold text-sm mt-1">${property.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
