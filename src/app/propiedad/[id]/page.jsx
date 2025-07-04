import { getProperties } from '../../../lib/api';
import ClientView from './ClientView';

export const dynamic = 'force-dynamic'; // Asegura SSR para cada ID

// ✅ Importar metadata del mismo archivo
export async function generateMetadata({ params }) {
  const allProperties = await getProperties();
  const property = allProperties.find((p) => String(p.id) === params.id);

  if (!property) {
    return {
      title: 'Propiedad no encontrada - Imnoba',
      description: 'No se encontró la propiedad solicitada',
    };
  }

  return {
    title: `${property.title} - Imnoba`,
    description: property.description?.slice(0, 160) || 'Propiedad en venta en Imnoba',
    openGraph: {
      title: `${property.title} - Imnoba`,
      description: property.description?.slice(0, 160),
      url: `https://imnoba.com/propiedad/${property.id}`,
      images: [
        {
          url: property.images?.[0] || '/fallback.jpg',
          width: 800,
          height: 600,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} - Imnoba`,
      description: property.description?.slice(0, 160),
      images: [property.images?.[0] || '/fallback.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const allProperties = await getProperties();
  const property = allProperties.find((p) => String(p.id) === params.id);

  if (!property) return <div className="p-8">Propiedad no encontrada.</div>;

  return <ClientView property={property} />;
}
