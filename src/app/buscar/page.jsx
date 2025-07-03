"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FiltrosVehiculos from "./(components)/FiltrosVehiculos";
import FiltrosPropiedades from "./(components)/FiltrosPropiedades";
import ResultadoItem from "./(components)/Resultadoitem";
import { supabase } from "../../lib/supabaseClient";

export default function BuscarPage() {
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get("tipo")?.toLowerCase();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const queryText = searchParams.get("query");
      const isCar = tipoParam === "carro";

      let query = isCar
        ? supabase.from("cars").select("*")
        : supabase.from("properties").select("*");

      // Búsqueda por texto (general)
      if (queryText) {
        const search = queryText.toLowerCase();
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Rango de precios
      const precioMin = searchParams.get("precioMin");
      const precioMax = searchParams.get("precioMax");
      if (precioMin) query = query.gte("precio", Number(precioMin));
      if (precioMax) query = query.lte("precio", Number(precioMax));

      // Filtros adicionales
      if (isCar) {
        const marca = searchParams.get("marca");
        if (marca) query = query.eq("marca", marca);
      } else {
        const ciudad = searchParams.get("ciudad");
        const tipo = searchParams.get("tipo");
        if (ciudad) query = query.ilike("ciudad", `%${ciudad}%`);
        if (tipo && tipo.toLowerCase() !== "carro") query = query.eq("tipo", tipo);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error en búsqueda:", error);
        setResultados([]);
        return;
      }

      setResultados(data || []);
    };

    fetchData();
  }, [searchParams.toString()]);

  const isCar = tipoParam === "carro";

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1">
        {isCar ? <FiltrosVehiculos /> : <FiltrosPropiedades />}
      </div>

      <div className="md:col-span-3 space-y-4">
        {resultados.length > 0 ? (
          resultados.map((item) => (
            <ResultadoItem key={item.id} item={item} tipo={isCar ? "vehiculo" : "propiedad"} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}