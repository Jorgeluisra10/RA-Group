// src/app/admin/page.jsx o pages/admin.jsx
"use client";

import { motion } from "framer-motion";
import NuevaPropiedadForm from "./(components)/nueva-propiedad/nueva-propiedad";
import PrivateRoute from "../../components/PrivateRoute"; // Asegúrate de importar PrivateRoute

const KPI = ({ title, value, percent, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`rounded p-4 shadow text-white ${color}`}
  >
    <p className="text-sm">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="text-xs mt-1">{percent} vs mes anterior</p>
  </motion.div>
);

const TabButton = ({ children, active }) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-all ${
      active ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

export default function AdminPage() {
  return (
    <PrivateRoute> {/* Envolvemos el contenido de la página en PrivateRoute */}
      <main className="bg-gray-100 min-h-screen p-6 font-sans">
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
            color="bg-yellow-400"
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
        <div className="mb-4 flex gap-2">
          <TabButton active>Nueva Propiedad</TabButton>
          <TabButton>Listado de Propiedades</TabButton>
          <TabButton>Estadísticas</TabButton>
          <TabButton>Configuración</TabButton>
        </div>

        {/* Formulario */}
        <NuevaPropiedadForm />
      </main>
    </PrivateRoute>
  );
}
