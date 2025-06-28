'use client';
import { useState } from 'react';
import {
  Train,
  GraduationCap,
  TreeDeciduous,
  ShoppingBag,
  Stethoscope,
} from 'lucide-react';

const zonaTabs = [
  { id: 'transporte', icon: <Train className="w-4 h-4" />, label: 'Transporte' },
  { id: 'educacion', icon: <GraduationCap className="w-4 h-4" />, label: 'Educación' },
  { id: 'verdes', icon: <TreeDeciduous className="w-4 h-4" />, label: 'Áreas verdes' },
  { id: 'comercios', icon: <ShoppingBag className="w-4 h-4" />, label: 'Comercios' },
  { id: 'salud', icon: <Stethoscope className="w-4 h-4" />, label: 'Salud' },
];

export default function ZonaInfo() {
  const [selectedTab, setSelectedTab] = useState('transporte');

  return (
    <div className="space-y-2 mt-6">
      <h2 className="text-xl font-semibold text-[var(--text-default)]">
        Información de la zona
      </h2>
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
  );
}
