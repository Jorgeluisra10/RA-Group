"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

import ResultadoItem from "./(components)/Resultadoitem";

export default function BuscarPage() {
  const router = useRouter();

  const [resultados, setResultados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const isCar =
    textoBusqueda.toLowerCase().includes("carro") ||
    textoBusqueda.toLowerCase().includes("auto") ||
    textoBusqueda.toLowerCase().includes("vehículo");

  useEffect(() => {
    async function fetchResultados() {
      try {
        if (!textoBusqueda.trim()) {
          setResultados([]);
          return;
        }

        let query = isCar
          ? supabase.from("cars").select("*").limit(50)
          : supabase.from("properties").select("*").limit(50);

        const search = textoBusqueda.trim();

        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

        const { data, error } = await query;

        if (error) {
          console.error("Error cargando resultados:", error);
          setResultados([]);
        } else {
          setResultados(data || []);
        }
      } catch (error) {
        console.error("Error inesperado cargando resultados:", error);
        setResultados([]);
      }
    }

    fetchResultados();
  }, [textoBusqueda, isCar]);

  const handleBuscar = () => {
    if (textoBusqueda.trim()) {
      // La búsqueda se activa con el texto ya guardado en estado
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8"
      style={{ color: "var(--text-default)", fontFamily: "'Poppins', sans-serif" }}
    >
      <header className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-default)" }}
        >
          Buscar propiedades y vehículos
        </h1>
        <p
          className="mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Encuentra exactamente lo que buscas en nuestra amplia selección
        </p>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={() => router.push("/propiedades/page")}
            className="px-6 py-2 rounded-md shadow-sm flex items-center gap-2"
            style={{
              backgroundColor: "var(--input-bg-light)",
              border: "1px solid var(--gray-border)",
              color: "var(--text-default)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "var(--gray-hover)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "var(--input-bg-light)")
            }
          >
            <span>🏠</span> Ver todas las propiedades
          </button>
          <button
            onClick={() => router.push("/vehiculos/page")}
            className="px-6 py-2 rounded-md shadow-sm flex items-center gap-2"
            style={{
              backgroundColor: "var(--input-bg-light)",
              border: "1px solid var(--gray-border)",
              color: "var(--text-default)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "var(--gray-hover)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "var(--input-bg-light)")
            }
          >
            <span>🚗</span> Ver todos los vehículos
          </button>
        </div>

        <div className="flex justify-center gap-2 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Buscar propiedades o vehículos..."
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
            className="w-full px-4 py-2 rounded-md focus:outline-none"
            style={{
              border: "1px solid var(--gray-border)",
              backgroundColor: "var(--input-bg-light)",
              color: "var(--text-default)",
              boxShadow: "none",
            }}
          />
          <button
            onClick={handleBuscar}
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: "var(--btn-primary)",
              color: "var(--btn-secondary)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "var(--yellow-light)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "var(--btn-primary)")
            }
          >
            Buscar
          </button>
        </div>
      </header>

      <main>
        {resultados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultados.map((item) => (
              <ResultadoItem
                key={item.id}
                item={item}
                tipo={isCar ? "vehiculo" : "propiedad"}
              />
            ))}
          </div>
        ) : (
          textoBusqueda.trim() && (
            <p
              className="text-center mt-8"
              style={{ color: "var(--text-secondary)" }}
            >
              No se encontraron resultados.
            </p>
          )
        )}
      </main>
    </div>
  );
}
