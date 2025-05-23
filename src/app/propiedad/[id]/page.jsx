'use client';
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { getProperties } from "../../../lib/api"; // Asegúrate de tener esta función
import Image from "next/image";

// Carrusel de imágenes con efecto de lupa al hacer hover
const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden group rounded-lg">
        <Image
          src={mainImage}
          alt="Vista principal"
          width={800}
          height={400}
          className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>
      <div className="flex gap-3 mt-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`w-24 h-24 rounded cursor-pointer border ${
              img === mainImage ? "border-blue-500" : "border-transparent"
            } hover:scale-105 transition-transform duration-300 relative`}
            onClick={() => setMainImage(img)}
          >
            <Image
              src={img}
              alt={`img-${idx}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const PropertyDetail = ({ params }) => {
  const { id } = use(params);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getProperties(); // Función que trae todas las propiedades
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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Volver */}
      <Link
        href="/propiedades"
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium mb-6 transition-all bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full shadow"
      >
        <ArrowLeftCircle className="w-5 h-5" /> Volver a Propiedades
      </Link>

      {/* Encabezado */}
      <div className="flex justify-between items-center">
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
        <p className="text-gray-700">{property.description}</p>
      </div>

      {/* Agente */}
      <div className="bg-gray-100 p-4 rounded-md flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div>
          <p className="font-semibold">{property.agent?.name || "Sin agente"}</p>
          <p className="text-sm text-gray-500">{property.agent?.email || "-"}</p>
        </div>
      </div>

      {/* Características */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Características</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {property.features
            ? Object.entries(property.features).map(([key, values]) => (
                <div key={key}>
                  <h3 className="font-semibold capitalize text-gray-600">{key}</h3>
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                    {values.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            : <p className="text-gray-500">No hay características disponibles.</p>
          }
        </div>
      </div>

      {/* Certificación energética */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Certificación energética</h2>
        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full">
          {property.energyCertificate || "-"}
        </span>
      </div>

      {/* Planos */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Planos de la propiedad</h2>
        <div className="flex flex-wrap gap-4">
          {property.plans?.map((plan, idx) => (
            <div key={idx} className="w-60 h-40 relative rounded shadow hover:scale-105 transition-transform overflow-hidden">
              <Image
                src={`/images/planos/${plan}`}
                alt={`Plano ${idx}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          )) || <p className="text-gray-500">No hay planos disponibles.</p>}
        </div>
      </div>

      {/* Botón interactivo */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-colors hover:scale-105 duration-300">
          Ver Tour Virtual 360°
        </button>
      </div>
    </div>
  );
};

export default PropertyDetail;
