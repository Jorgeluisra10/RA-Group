"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Users, Home, Car, CheckCircle, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ✅ Necesario
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function AdminPage() {
  const { user, loading } = useAuth(); // ✅ Estaba faltando esta línea
  const [kpi, setKpi] = useState({
    clientes: 0,
    propiedades: 0,
    vehiculos: 0,
    ventas: 0,
  });
  const [clientes, setClientes] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (loading || !user) return;

    const fetchKPIs = async () => {
      try {
        const { data: props, error: errorProps } = await supabase
          .from("properties")
          .select("id, created_at")
          .eq("agente", user.id);

        const { data: cars, error: errorCars } = await supabase
          .from("cars")
          .select("id, created_at")
          .eq("agente", user.id);

        const { data: clients, error: errorClientes } = await supabase
          .from("clientes")
          .select("*")
          .eq("agente", user.id);

        const { data: agenteData, error: errorAgente } = await supabase
          .from("agentes")
          .select("ventas")
          .eq("id", user.id)
          .single();

        if (errorProps || errorCars || errorClientes || errorAgente) {
          console.error(
            "Error al cargar KPIs:",
            errorClientes,
            errorProps,
            errorCars,
            errorAgente
          );
          return;
        }

        setKpi({
          clientes: clients.length,
          propiedades: props.length,
          vehiculos: cars.length,
          ventas: agenteData?.ventas || 0,
        });

        const months = Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (5 - i));
          return {
            mes: format(date, "MMM", { locale: es }),
            mesNum: format(date, "MM"),
            anio: format(date, "yyyy"),
            propiedades: 0,
            vehiculos: 0,
          };
        });

        props.forEach((prop) => {
          const d = new Date(prop.created_at);
          const mes = format(d, "MM");
          const anio = format(d, "yyyy");
          const index = months.findIndex(
            (m) => m.mesNum === mes && m.anio === anio
          );
          if (index !== -1) months[index].propiedades++;
        });

        cars.forEach((car) => {
          const d = new Date(car.created_at);
          const mes = format(d, "MM");
          const anio = format(d, "yyyy");
          const index = months.findIndex(
            (m) => m.mesNum === mes && m.anio === anio
          );
          if (index !== -1) months[index].vehiculos++;
        });

        setChartData(months);
        setClientes(clients.slice(0, 4));
      } catch (err) {
        console.error("Error general:", err);
      }
    };

    fetchKPIs();
  }, [user, loading]);

  const kpiData = [
    {
      icon: Users,
      title: "Total de clientes",
      value: kpi.clientes,
      color: "text-[var(--blue-main)]",
      bg: "border-[var(--btn-primary)]",
    },
    {
      icon: Home,
      title: "Propiedades activas",
      value: kpi.propiedades,
      color: "text-[var(--blue-main)]",
      bg: "border-[var(--blue-main)]",
    },
    {
      icon: Car,
      title: "Vehículos registrados",
      value: kpi.vehiculos,
      color: "text-[var(--blue-main)]",
      bg: "border-[var(--btn-primary)]",
    },
    {
      icon: CheckCircle,
      title: "Ventas completadas",
      value: kpi.ventas,
      color: "text-[var(--blue-main)]",
      bg: "border-[var(--blue-main)]",
    },
  ];

  return (
    <main className="bg-[var(--background)] min-h-screen p-6 lg:p-10 font-sans transition-colors duration-300">
      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map(({ icon: Icon, title, value, color, bg }, i) => (
          <div
            key={i}
            className={`border-t-4 ${bg} rounded-lg shadow p-5 bg-[var(--white)] transition-colors duration-300`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-[var(--text-default)]">
                {value}
              </div>
              <Icon className="w-6 h-6 text-[var(--btn-primary)]" />
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {title}
            </p>
          </div>
        ))}
      </section>

      {/* Rendimiento y clientes */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Gráfico */}
        <div className="bg-[var(--white)] p-6 rounded-lg shadow col-span-2 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[var(--text-default)]">
              Rendimiento mensual
            </h2>
            <div className="flex gap-2 text-sm">
              <span className="bg-[var(--blue-main)] text-white px-2 py-1 rounded-full">
                Propiedades
              </span>
              <span className="bg-[var(--btn-primary)] text-black px-2 py-1 rounded-full">
                Vehículos
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="propiedades"
                stroke="var(--blue-main)"
                strokeWidth={2}
                fillOpacity={0.1}
                fill="#E0E7FF"
              />
              <Line
                type="monotone"
                dataKey="vehiculos"
                stroke="var(--btn-primary)"
                strokeWidth={2}
                fillOpacity={0.1}
                fill="#FEF3C7"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Clientes */}
        <div className="bg-[var(--white)] p-6 rounded-lg shadow transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[var(--text-default)]">
              Clientes recientes
            </h2>
          </div>
          <ul className="space-y-4">
            {clientes.map((c, i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#E0F2FE] text-[var(--blue-main)]">
                    {c.nombre?.[0] || "C"}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-default)]">
                      {c.nombre}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Interesado en {c.interes}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E0F2FE] text-[var(--blue-main)]">
                  {c.estado || "Nuevo"}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-[var(--blue-main)] text-white font-semibold py-2 rounded shadow flex items-center justify-center gap-2 hover:bg-[var(--blue-hover)] transition-colors duration-300">
            <Plus className="w-4 h-4" /> Agregar nuevo cliente
          </button>
        </div>
      </section>
    </main>
  );
}
