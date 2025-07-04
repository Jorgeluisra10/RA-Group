import { getProperties } from '../../../lib/api';

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
