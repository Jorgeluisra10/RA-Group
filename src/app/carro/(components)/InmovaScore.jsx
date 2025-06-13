"use client";

import { useEffect, useState } from "react";

export default function InmovaScore({ data }) {
  const [scores, setScores] = useState({
    seguridad: 0,
    valor: 0,
    popularidad: 0,
    eficiencia: 0,
    promedio: 0,
  });

  useEffect(() => {
    // Simulación de IA: cálculo automático de promedio
    if (data) {
      const { seguridad, valor, popularidad, eficiencia } = data;
      const promedio = Math.round((seguridad + valor + popularidad + eficiencia) / 4);
      setScores({ seguridad, valor, popularidad, eficiencia, promedio });
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
        <span className="inline-block w-5 h-5 bg-[#0f1c46] rounded-sm"></span> Inmova Score
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Puntaje general circular */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="#fdc700"
                strokeWidth="8"
                fill="none"
                strokeDasharray="239"
                strokeDashoffset={239 - (scores.promedio / 100) * 239}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#0f1c46]">{scores.promedio}</span>
              <span className="text-sm text-gray-500">Puntaje general</span>
            </div>
          </div>
        </div>

        {/* Puntajes individuales */}
        <div className="flex-1 space-y-4">
          {[
            { label: "Eficiencia energética", value: scores.eficiencia },
            { label: "Seguridad", value: scores.seguridad },
            { label: "Valor por dinero", value: scores.valor },
            { label: "Popularidad en Colombia", value: scores.popularidad },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{item.label}</span>
                <span>{item.value}/100</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="h-full bg-[#0f1c46] rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opinión de expertos */}
      <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
        <strong className="block mb-1 text-gray-800">Opinión de expertos</strong>
        {/* <p>{data.descripcion}</p> */}
      </div>
    </div>
  );
}
