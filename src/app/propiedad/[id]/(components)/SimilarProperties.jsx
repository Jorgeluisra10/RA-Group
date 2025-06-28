'use client';
import Image from 'next/image';

export default function SimilarProperties({ property }) {
  return (
    <div className="bg-[var(--background)] border border-[var(--gray-border)] rounded-lg p-4 shadow-sm">
      <h3 className="text-md font-semibold text-[var(--text-default)] mb-2">
        Propiedades similares
      </h3>
      {[1, 2, 3].map((p, i) => (
        <div key={i} className="flex items-start gap-3 mb-3">
          <div className="relative w-16 h-16 rounded overflow-hidden">
            <Image
              src={property.images[i]}
              alt={`similar-${i}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="text-[var(--text-default)] font-medium">
              {property.title}
            </p>
            <p className="text-[var(--text-secondary)]">
              {property.habitaciones} dorm. | {property.banos} baños | {property.area} m²
            </p>
            <p className="text-[var(--text-active)] font-semibold text-sm mt-1">
              ${property.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
