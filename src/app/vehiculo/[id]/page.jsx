import { getCars } from "../../../lib/api";
import ClientView from "./ClientView";

export const dynamic = 'force-dynamic'; // SSR en rutas dinámicas

export async function generateMetadata({ params }) {
  const allCars = await getCars();
  const carro = allCars.find((c) => String(c.id) === params.id);

  if (!carro) {
    return {
      title: 'Vehículo no encontrado - Imnoba',
      description: 'No se encontró el vehículo solicitado',
    };
  }

  return {
    title: `${carro.title} - Imnoba`,
    description: carro.description?.slice(0, 160) || 'Vehículo en venta en Imnoba',
    openGraph: {
      title: `${carro.title} - Imnoba`,
      description: carro.description?.slice(0, 160),
      url: `https://imnoba.com/vehiculo/${carro.id}`,
      images: [
        {
          url: carro.images?.[0] || '/fallback.jpg',
          width: 800,
          height: 600,
          alt: carro.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${carro.title} - Imnoba`,
      description: carro.description?.slice(0, 160),
      images: [carro.images?.[0] || '/fallback.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const allCars = await getCars();
  const carro = allCars.find((c) => String(c.id) === params.id);

  if (!carro) return <div className="p-8">Vehículo no encontrado.</div>;

  return <ClientView carro={carro} />;
}
