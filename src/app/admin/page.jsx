"use client";

import { motion } from "framer-motion";
import NuevaPropiedadForm from "./(components)/nueva-propiedad/nueva-propiedad";
import PrivateRoute from "../../components/PrivateRoute";

const KPI = ({ title, value, percent, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`rounded-lg p-4 shadow-md text-white ${color} flex flex-col justify-between`}
  >
    <p className="text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="text-xs mt-1 opacity-90">{percent} vs mes anterior</p>
  </motion.div>
);

const TabButton = ({ children, active }) => (
  <button
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap
      ${active ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
  >
    {children}
  </button>
);

export default function AdminPage() {
  return (
    <PrivateRoute>
      <main className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPI
            title="Total Propiedades"
            value="124"
            percent="↑ 8.2%"
            color="bg-blue-600"
          />
          <KPI
            title="Ventas Mensuales"
            value="$1.2M COP"
            percent="↑ 12.5%"
            color="bg-yellow-400 text-black"
          />
          <KPI
            title="Clientes Nuevos"
            value="48"
            percent="↑ 5.3%"
            color="bg-indigo-600"
          />
          <KPI
            title="Visitas Programadas"
            value="32"
            percent="↑ 2.1%"
            color="bg-green-500"
          />
        </section>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex gap-2 min-w-max">
            <TabButton active>Nueva Propiedad</TabButton>
            <TabButton>Listado de Propiedades</TabButton>
            <TabButton>Estadísticas</TabButton>
            <TabButton>Configuración</TabButton>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <NuevaPropiedadForm />
        </div>
      </main>
    </PrivateRoute>
  );
}
