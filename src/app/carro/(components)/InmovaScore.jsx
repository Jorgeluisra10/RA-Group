"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function InmovaScore({ carroId }) {
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);

  const limpiarOpinionIA = (texto, { seguridad, eficiencia, valor }) => {
    if (!texto) return "";
    const patrones = [
      `seguridad: ${seguridad}`,
      `desempeño: ${eficiencia}`,
      `eficiencia: ${eficiencia}`,
      `valor: ${valor}`,
      `calidad - precio: ${valor}`,
      `calidad-precio: ${valor}`,
      `relación calidad precio: ${valor}`,
    ];
    const frasesQueHablanDeFuentes = [
      "fuente",
      "fuentes",
      "fuente principal",
      "fuente secundaria",
      "según",
      "de acuerdo con",
      "basado en",
      "información provista por",
      "datos obtenidos de",
    ];
    return texto
      .split(/(?<=[.?!])\s+/)
      .filter((f) => {
        const low = f.toLowerCase();
        return (
          !patrones.some((p) => low.includes(p)) &&
          !frasesQueHablanDeFuentes.some((p) => low.includes(p))
        );
      })
      .join(" ");
  };

  useEffect(() => {
    const fetchCarData = async () => {
      if (!carroId) return;
      const { data, error } = await supabase
        .from("cars")
        .select(
          "seguridad, eficiencia, valor, opinion_ia, fuente_principal, fuente_secundaria"
        )
        .eq("id", carroId)
        .single();

      if (error) {
        console.error("Error:", error);
        setLoading(false);
        return;
      }

      const {
        seguridad = 0,
        eficiencia = 0,
        valor = 0,
        opinion_ia = "",
        fuente_principal = "",
        fuente_secundaria = "",
      } = data;
      const promedio = Math.round((seguridad + eficiencia + valor) / 3);

      setScores({
        seguridad,
        eficiencia,
        valor,
        promedio,
        descripcion: limpiarOpinionIA(opinion_ia, {
          seguridad,
          eficiencia,
          valor,
        }),
        fuente_principal,
        fuente_secundaria,
      });
      setLoading(false);
    };

    fetchCarData();
  }, [carroId]);

  const getLabel = (score) => {
    if (score >= 85) return "Excelente";
    if (score >= 70) return "Muy bueno";
    if (score >= 55) return "Bueno";
    return "Regular";
  };

  const barColors = {
    Seguridad: "#0f1c46",
    Desempeño: "#4a60d1",
    "Calidad - Precio": "#fdc700",
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        Cargando evaluación IA...
      </div>
    );
  if (!scores)
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No hay evaluación generada.
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 max-w-6xl w-full mx-auto space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#0f1c46] rounded-sm" />
          Inmova Score
        </h2>
        <span className="bg-[#fdc700] text-[#0f1c46] px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide">
          Generado por Inmova AI
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Indicador Circular */}
        <div className="relative w-40 h-40">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10b981"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - scores.promedio / 100)}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#0f1c46]">
              {scores.promedio}
            </span>
            <span className="text-base text-gray-600">
              {getLabel(scores.promedio)}
            </span>
          </div>
        </div>

        {/* Barras de score */}
        <div className="flex-1 w-full space-y-5">
          {[
            { label: "Seguridad", value: scores.seguridad },
            { label: "Desempeño", value: scores.eficiencia },
            { label: "Calidad - Precio", value: scores.valor },
          ].map(({ label, value }, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{label}</span>
                <span>{value}/100</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${value}%`,
                    backgroundColor: barColors[label],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opinión IA */}
      {scores.descripcion && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-3">
          <div>
            <strong className="block mb-1 text-gray-800">
              Opinión de Expertos
            </strong>
            <p className="leading-relaxed">{scores.descripcion}</p>
          </div>
          {(scores.fuente_principal || scores.fuente_secundaria) && (
            <div className="text-xs text-gray-500 border-t pt-3 flex flex-col sm:flex-row sm:justify-between gap-2">
              <div>
                <strong>Fuente principal:</strong>{" "}
                {scores.fuente_principal || "No especificada"}
              </div>
              <div>
                <strong>Fuente secundaria:</strong>{" "}
                {scores.fuente_secundaria || "No especificada"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
