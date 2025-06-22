"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AgenteInmobiliarioForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    publicar: "",
    motivo: "",
    sobreTi: "",
  });
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = "Nombre requerido";
    if (!formData.correo.trim()) nuevosErrores.correo = "Correo requerido";
    if (!formData.telefono.trim())
      nuevosErrores.telefono = "Teléfono requerido";
    if (!formData.publicar) nuevosErrores.publicar = "Selecciona una opción";
    if (!formData.motivo.trim()) nuevosErrores.motivo = "Escribe un motivo";
    if (!formData.sobreTi.trim())
      nuevosErrores.sobreTi = "Este campo es obligatorio";
    if (!aceptaTerminos) nuevosErrores.terminos = "Debes aceptar los términos";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      alert("Formulario enviado correctamente ✅");
      // Aquí puedes hacer tu lógica con Supabase o backend
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 px-4 md:px-20 bg-white overflow-hidden relative font-sans">
      {/* Sección Izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            ¿Eres agente inmobiliario? <br />
            <span className="text-yellow-400">Únete</span> a nuestra red
          </h1>
          <p className="text-slate-600 mt-4 text-base md:text-lg">
            Publica propiedades o vehículos y conecta con nuevos clientes a
            través de nuestra plataforma. El proceso de integración es rápido y
            profesional, permitiéndote expandir tu negocio inmobiliario.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-2xl rounded-xl p-6 space-y-5"
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            ✏️ Completa tus datos para unirte
          </h3>

          {/* Nombre, Correo y Teléfono en una fila */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                className="input-styled"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errores.nombre && (
                <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
              )}
            </div>
            <div>
              <input
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                className="input-styled"
                value={formData.correo}
                onChange={handleChange}
              />
              {errores.correo && (
                <p className="text-red-500 text-sm mt-1">{errores.correo}</p>
              )}
            </div>
            <div>
              <input
                name="telefono"
                type="tel"
                placeholder="Número de teléfono"
                className="input-styled"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errores.telefono && (
                <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              ¿Tienes propiedades o vehículos que deseas publicar?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="publicar"
                  value="si"
                  className="accent-yellow-400"
                  checked={formData.publicar === "si"}
                  onChange={handleChange}
                />
                Sí
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="publicar"
                  value="no"
                  className="accent-yellow-400"
                  checked={formData.publicar === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
            {errores.publicar && (
              <p className="text-red-500 text-sm mt-1">{errores.publicar}</p>
            )}
          </div>

          <div className="col-span-full">
            <label className="text-sm font-medium block mb-2">
              ¿Por qué deseas unirte a nuestra red de agentes?
            </label>
            <textarea
              name="sobreTi"
              placeholder="Escribe brevemente por qué quieres unirte..."
              className="input-styled min-h-[120px] resize-none w-full md:w-[650px] max-w-full"
              value={formData.sobreTi}
              onChange={handleChange}
            />
            {errores.sobreTi && (
              <p className="text-red-500 text-sm mt-1">{errores.sobreTi}</p>
            )}
          </div>

          <div className="col-span-full">
            <label className="text-sm font-medium block mb-2">
              Cuéntanos más sobre ti
            </label>
            <textarea
              name="sobreTi"
              placeholder="Habla de tu experiencia, tu forma de trabajar o lo que te diferencia como agente..."
              className="input-styled min-h-[120px] resize-none w-full md:w-[650px] max-w-full"
              value={formData.sobreTi}
              onChange={handleChange}
            />
            {errores.sobreTi && (
              <p className="text-red-500 text-sm mt-1">{errores.sobreTi}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="accent-yellow-400 mt-1"
            />
            <label htmlFor="terms" className="text-sm text-slate-700">
              Acepto los{" "}
              <span className="underline cursor-pointer">
                términos y condiciones
              </span>{" "}
              y la{" "}
              <span className="underline cursor-pointer">
                política de privacidad
              </span>
            </label>
          </div>
          {errores.terminos && (
            <p className="text-red-500 text-sm -mt-2">{errores.terminos}</p>
          )}

          <motion.button
            whileHover={{ scale: aceptaTerminos ? 1.02 : 1 }}
            whileTap={{ scale: aceptaTerminos ? 0.98 : 1 }}
            type="submit"
            disabled={!aceptaTerminos}
            className={`w-full font-semibold py-2.5 px-6 rounded-md transition-all shadow-md ${
              aceptaTerminos
                ? "bg-slate-900 text-white hover:bg-slate-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Enviar solicitud →
          </motion.button>
        </form>
      </motion.div>

      {/* Sección Derecha (Imagen + Etiquetas) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex justify-center items-center"
      >
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <img
            src="images/gifs/agente.gif"
            alt="Ilustración agentes"
            className="w-full h-auto object-cover"
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute top-4 right-4 bg-white shadow-md rounded-lg px-4 py-2 border border-gray-200"
        >
          <p className="text-sm font-semibold">🔑 Comisiones justas</p>
          <p className="text-xs text-gray-500 -mt-1">Modelo transparente</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          className="absolute bottom-6 left-6 bg-white shadow-md rounded-lg px-4 py-2 border border-gray-200"
        >
          <p className="text-sm font-semibold">📂 Nuevos clientes</p>
          <p className="text-xs text-gray-500 -mt-1">Amplía tu red</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
