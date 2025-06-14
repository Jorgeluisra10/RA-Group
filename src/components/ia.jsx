'use client';
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function EvaluacionAuto({ evaluacion, carroId }) {
  const [mostrar, setMostrar] = useState(true); // Mostrar por defecto si hay evaluación
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  // Estados para inputs editables
  const [seguridad, setSeguridad] = useState(evaluacion?.seguridad || "");
  const [eficiencia, setEficiencia] = useState(evaluacion?.eficiencia || "");
  const [valor, setValor] = useState(evaluacion?.valor || "");
  const [popularidad, setPopularidad] = useState(evaluacion?.popularidad || "");
  const [opinion, setOpinion] = useState(evaluacion?.opinion_ia || "");

  const handleGenerarEvaluacion = async () => {
    startTransition(async () => {
      try {
        await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carroId }),
        });

        router.refresh(); // Refresca para cargar evaluación
      } catch (err) {
        console.error("Error al generar evaluación:", err.message);
      }
    });
  };

  // Si aún no hay evaluación, mostrar botón
  if (!evaluacion || !evaluacion.seguridad) {
    return (
      <div className="my-4">
        <button
          onClick={handleGenerarEvaluacion}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? "Generando evaluación IA..." : "Generar evaluación IA"}
        </button>
      </div>
    );
  }

  // Si ya hay evaluación, mostrar campos editables
  return (
    <div className="my-4">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
      >
        {mostrar ? "Ocultar evaluación IA" : "Ver evaluación del vehículo"}
      </button>

      {mostrar && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50 space-y-4">
          <div>
            <label className="font-semibold block mb-1">🔐 Seguridad</label>
            <input
              type="number"
              value={seguridad}
              onChange={(e) => setSeguridad(e.target.value)}
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">⚡ Eficiencia</label>
            <input
              type="number"
              value={eficiencia}
              onChange={(e) => setEficiencia(e.target.value)}
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">💰 Valor por dinero</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">📈 Popularidad</label>
            <input
              type="number"
              value={popularidad}
              onChange={(e) => setPopularidad(e.target.value)}
              className="w-full border rounded px-3 py-1"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">🧠 Opinión del experto</label>
            <textarea
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              className="w-full border rounded px-3 py-2 h-24 resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
