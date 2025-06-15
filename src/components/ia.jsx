'use client';
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function EvaluacionAuto({ evaluacion, carroId }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const yaEvaluado = Boolean(evaluacion?.seguridad);
  const generadoIA = false;

  const handleGenerarIA = async () => {
    startTransition(async () => {
      try {
        await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carroId }),
        });

        router.refresh();
      } catch (err) {
        console.error("Error al generar evaluación IA:", err.message);
      }
    });
  };

  return (
    <>
      {!yaEvaluado && !generadoIA && (
        <button
          onClick={handleGenerarIA}
          type="button"
          className="bg-[#FDC500] hover:bg-yellow-400 text-[#0a1128] font-bold py-2 px-4 rounded"
        >
          Generar Evaluación IA
        </button>
      )}

      {(yaEvaluado || generadoIA) && (
        <section className="bg-[#eef4ff] p-6 rounded-xl mt-4 max-w-4xl mx-auto w-full shadow-sm relative">
          {/* Línea superior decorativa */}
          <div className="absolute top-0 left-0 h-[3px] w-full bg-yellow-400 rounded-t-xl" />

          <h2 className="text-lg font-semibold text-[#0a1128] mb-4 flex items-center gap-2">
            <span>💡</span> <span>Análisis de Mercado</span>
          </h2>

          <div className="space-y-5 text-sm">
            {/* Precio competitivo */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700">Precio Competitivo</span>
                <span className="font-semibold text-gray-900">
                  {evaluacion.seguridad || 0} %
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${evaluacion.seguridad || 0}%` }}
                />
              </div>
            </div>

            {/* Demanda estimada */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700">Demanda Estimada</span>
                <span className="font-semibold text-gray-900">
                  {evaluacion.eficiencia || 0} %
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${evaluacion.eficiencia || 0}%` }}
                />
              </div>
            </div>

            {/* Calidad descripción */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700">Calidad de Descripción</span>
                <span className="font-semibold text-gray-900">
                  {evaluacion.valor || 0} %
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${evaluacion.valor || 0}%` }}
                />
              </div>
            </div>

            {/* Recomendaciones IA */}
            <div className="mt-4 bg-white border border-gray-200 rounded-md p-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Recomendaciones:
              </label>
              <textarea
                className="w-full p-3 rounded-md border border-gray-300 bg-white text-sm resize-none"
                rows={4}
                value={evaluacion.opinion_ia || ""}
                readOnly
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
