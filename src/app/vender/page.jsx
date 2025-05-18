"use client";

import { Home, Zap, Shield, Upload } from "lucide-react";
import { useState } from "react";

export default function Vender() {
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const pasos = [
    {
      titulo: "Envío de Información",
      emoji: "✍️",
      descripcion:
        "Completa el formulario con los datos de tu propiedad o vehículo en venta. Este es el primer paso para iniciar el proceso de venta.",
    },
    {
      titulo: "Contacto con Asesor",
      emoji: "📞",
      descripcion:
        "Un asesor especializado se pondrá en contacto contigo en las próximas 24 horas para validar la información y explicarte detalladamente el proceso y condiciones de venta.",
    },
    {
      titulo: "Publicación del Anuncio",
      emoji: "📢",
      descripcion:
        "Una vez verificada la información, tu propiedad o vehículo será publicado en nuestra plataforma con fotografías profesionales y descripción detallada para atraer a potenciales compradores.",
    },
    {
      titulo: "Notificación de Interesados",
      emoji: "🔔",
      descripcion:
        "Cuando un posible comprador muestre interés en tu propiedad o vehículo, serás notificado inmediatamente. Nuestro asesor coordinará las visitas o encuentros según corresponda.",
    },
    {
      titulo: "Cierre de Venta",
      emoji: "🤝",
      descripcion:
        "Una vez concretada la venta, Inmova facilitará todo el proceso de documentación y trámites necesarios. Solo en este momento se aplicará la comisión del 3% sobre el valor final de la venta.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#1A295C]/10 via-white to-[#1A295C]/10 py-8 mt-15 px-4 md:px-8"
    >
      <section className="text-center py-5 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          ¿Quieres publicar tu propiedad o vehículo con nosotros?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Agrega tu inmueble o auto para la venta con total confianza y seguridad.
        </p>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="flex flex-col items-center group">
            <Home className="w-10 h-10 text-[#1A295C] group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
            <span className="mt-3 text-base font-medium text-gray-800">
              Propiedades
            </span>
          </div>
          <div className="flex flex-col items-center group">
            <Zap className="w-10 h-10 text-[#1A295C] group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300" />
            <span className="mt-3 text-base font-medium text-gray-800">
              Proceso Rápido
            </span>
          </div>
          <div className="flex flex-col items-center group">
            <Shield className="w-10 h-10 text-[#1A295C] group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
            <span className="mt-3 text-base font-medium text-gray-800">
              Seguridad
            </span>
          </div>
        </div>

        <p className="mt-10 text-base text-gray-700 max-w-2xl mx-auto">
          En <span className="font-semibold text-gray-800">Inmova</span>, te ofrecemos una plataforma segura y profesional para vender tu propiedad o vehículo. El costo por publicar tu anuncio será el <span className="font-semibold">3% del valor total de la venta</span>, el cual se cobrará una vez que la transacción se haya concretado exitosamente.
        </p>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto mt-12">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-[#1A295C]">≫</span>
          Proceso de Publicación y Venta
        </h3>

        <ol className="space-y-10 relative">
          {pasos.map((paso, index) => (
            <li key={index} className="relative pl-12">
              {index !== pasos.length - 1 && (
                <span className="absolute left-4 top-8 h-full w-0.5 bg-[#1A295C] z-0" />
              )}
              <div className="absolute left-0 top-0 w-8 h-8 bg-[#1A295C] text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h4 className="text-base font-semibold text-gray-800">
                  {paso.titulo}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="mr-2">{paso.emoji}</span>
                  {paso.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-8 mt-12">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg md:text-xl">
            Instrucciones:
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Por favor, completa el siguiente formulario con tus datos personales y la información de la propiedad o vehículo que deseas publicar.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-[#1A295C] flex items-center gap-2 text-base">
            <span>👤</span> Información Personal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre completo" className="input-field rounded-lg" />
            <input type="text" placeholder="Documento de identidad (cédula)" className="input-field rounded-lg" />
            <input type="text" placeholder="Teléfono de contacto" className="input-field rounded-lg" />
            <input type="email" placeholder="Correo electrónico" className="input-field rounded-lg" />
            <input type="text" placeholder="Dirección de la propiedad o lugar de contacto" className="input-field md:col-span-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-[#1A295C] flex items-center gap-2 text-base">
            <span>🏡</span> Información del Bien
          </h3>

          <div className="space-y-4">
            <select className="input-field w-full rounded-lg">
              <option>Selecciona una opción</option>
              <option>Propiedad</option>
              <option>Vehículo</option>
            </select>

            <div>
              <textarea placeholder="Descripción detallada del bien" rows={4} className="input-field w-full rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">
                Incluye características importantes como tamaño, ubicación, antigüedad, estado, etc.
              </p>
            </div>

            <div>
              <input type="number" placeholder="Valor de venta estimado (COP)" className="input-field w-full rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">
                Comisión: 3% del valor total (solo se cobra al concretar la venta)
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition">
              <Upload className="mx-auto text-[#1A295C] mb-2" />
              <p className="text-sm text-gray-600">Sube archivos o arrastra y suelta</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF - hasta 40MB</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-2">
          <h3 className="font-semibold text-[#1A295C] flex items-center gap-2 text-base">
            <span>🛡️</span> Aviso Legal
          </h3>
          <p className="text-sm text-gray-700">
            Al enviar esta información, aceptas los términos y condiciones de publicación de <strong>Inmova</strong>. Nos comprometemos a proteger tus datos personales conforme a la Ley 1581 de 2012 de Protección de Datos Personales en Colombia. La responsabilidad de veracidad de la información publicada recae en los anunciantes. Nuestro equipo revisará y validará los datos para garantizar la seguridad y legalidad de las operaciones.
          </p>
          <label className="flex items-center gap-2 mt-2 text-sm">
            <input type="checkbox" checked={aceptaTerminos} onChange={() => setAceptaTerminos(!aceptaTerminos)} className="accent-[#1A295C]" />
            Acepto los términos y condiciones
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6">
          <button className="bg-[#1A295C] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#0f1b3f] transition">
            ✔️ Enviar datos
          </button>
          <button className="border-2 border-[#1A295C] text-[#1A295C] px-6 py-3 rounded-lg font-semibold hover:bg-[#1A295C]/10 transition">
            💬 Hablar con un asesor
          </button>
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
