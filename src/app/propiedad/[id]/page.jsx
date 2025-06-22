"use client";
import { UserCircle2, ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { getProperties } from "../../../lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Carrusel de imágenes mejorado con miniaturas
const ImageGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="rounded-lg overflow-hidden"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[400px]">
              <Image
                src={img}
                alt={`img-${idx}`}
                fill
                className="object-cover w-full h-full"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          watchSlidesProgress
          modules={[Navigation, Thumbs]}
          className="rounded-md"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={`thumb-${idx}`}>
              <div className="relative w-full h-20 cursor-pointer">
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-cover rounded border hover:border-blue-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const PropertyDetail = ({ params }) => {
  const { id } = use(params);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getProperties();
      const prop = data.find((item) => String(item.id) === id);
      setProperty(prop);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="p-8">Cargando propiedad...</div>;
  }

  if (!property) {
    return <div className="p-8">Propiedad no encontrada.</div>;
  }

  const whatsappLink = `https://wa.me/573103216174?text=Hola%2C%20estoy%20interesado%20en%20la%20propiedad%20%22${encodeURIComponent(
    property.title
  )}%20%C2%BFPodemos%20hablar%3F`;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <span className="text-yellow-500 text-2xl font-bold">
          ${property.price.toLocaleString()}
        </span>
      </div>

      {/* Carrusel de imágenes */}
      <ImageGallery images={property.images} />

      {/* Iconos de características */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div>
          <strong>{property.area} m²</strong>
          <p>Área</p>
        </div>
        <div>
          <strong>{property.habitaciones}</strong>
          <p>Habitaciones</p>
        </div>
        <div>
          <strong>{property.banos}</strong>
          <p>Baños</p>
        </div>
        <div>
          <strong>{property.garaje}</strong>
          <p>Parqueaderos</p>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {property.description}
        </p>
      </div>

      {/* Agente */}

      <div className="bg-gray-100 p-4 rounded-md flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
          <UserCircle2 className="w-10 h-10" />
        </div>
        <div>
          <p className="font-semibold text-lg">Juan Pablo Zambrano</p>
          <p className="text-sm text-gray-600">
            Agente inmobiliario en Boyacá, Colombia.
          </p>
        </div>
      </div>
    

      {/* Certificación energética */}
      {property.energyCertificate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Certificación energética
          </h2>
          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">
            {property.energyCertificate}
          </span>
        </div>
      )}

      {/* Planos */}
      {property.plans?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Planos de la propiedad</h2>
          <div className="flex flex-wrap gap-4">
            {property.plans.map((plan, idx) => (
              <div
                key={idx}
                className="w-60 h-40 relative rounded shadow hover:scale-105 transition-transform overflow-hidden"
              >
                <Image
                  src={`/images/planos/${plan}`}
                  alt={`Plano ${idx}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón WhatsApp */}
      <div className="text-center mt-10">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full shadow hover:bg-yellow-600 transition-colors hover:scale-105 duration-300"
        >
          Consultar por esta propiedad
        </a>
      </div>
    </div>
  );
};

export default PropertyDetail;
