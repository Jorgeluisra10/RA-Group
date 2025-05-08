"use client";

import { motion } from "framer-motion";

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

const Input = ({ label, placeholder, className = "" }) => (
  <div className={className}>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      className="w-full p-2 border rounded"
      placeholder={placeholder}
    />
  </div>
);

const Select = ({ label }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select className="w-full p-2 border rounded">
      <option>Seleccionar</option>
    </select>
  </div>
);

export default function AdminPage() {
  return (
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
          value="€1.2M"
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
      <form className="bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Título de la propiedad"
            placeholder="Ej: Villa Exclusiva en La Moraleja"
          />
          <Select label="Tipo de propiedad" />
          <Input label="Precio (€)" placeholder="Ej: 2850000" />
          <Select label="Estado" />
          <Select label="Agente asignado" />
          <Input label="Habitaciones" placeholder="Ej: 6" />
          <Input label="Baños" placeholder="Ej: 5" />
          <Input label="Área (m²)" placeholder="Ej: 650" />
          <Input label="Garaje (plazas)" placeholder="Ej: 4" />
          <Input
            label="Dirección"
            placeholder="Ej: Paseo de los Lagos 25"
            className="col-span-3"
          />
          <Input label="Ciudad" />
          <Input label="Provincia" />
          <Input label="Código Postal" />
        </div>

        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Describe la propiedad en detalle..."
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Certificación energética
          </label>
          <div className="flex gap-2">
            {["A", "B", "C", "D", "E", "F"].map((label) => (
              <button
                key={label}
                type="button"
                className="w-8 h-8 rounded-full bg-red-500 text-white text-sm flex items-center justify-center hover:scale-105 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Características y comodidades
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Aire acondicionado",
              "Calefacción",
              "Piscina",
              "Jardín",
              "Terraza",
              "+ Añadir",
              "WiFi",
              "Gimnasio",
              "Seguridad 24h",
              "Parking",
              "Amueblado",
              "Admite mascotas",
            ].map((item) => (
              <label key={item} className="flex items-center space-x-1">
                <input type="checkbox" className="accent-blue-600" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Imágenes de la propiedad
          </label>
          <div className="border-2 border-dashed rounded p-6 text-center text-sm text-gray-500 hover:bg-gray-50 transition">
            Arrastra y suelta imágenes aquí o haz clic para seleccionar
            <br />
            <span className="text-xs">.jpg, .png, .webp hasta 10MB</span>
          </div>
        </div>
      </form>
    </main>
  );
}
