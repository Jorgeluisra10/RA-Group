'use client'

import { useState } from 'react'
import { ShieldCheck, User, Database, Lock, Clock } from 'lucide-react'

export default function PrivacyPolicy() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })

  const sections = [
    {
      id: 1,
      title: 'Responsable del Tratamiento de Datos',
      icon: <User className="text-[#fdc700]" size={28} />,
      content:
        'El responsable del tratamiento de datos personales es Inmova S.A.S., identificada con NIT [Número], domiciliada en [Ciudad], Colombia.\n\nPara consultas relacionadas con la protección de datos, puede contactarnos en: [correo electrónico] o [teléfono].',
    },
    {
      id: 2,
      title: 'Datos que Recopilamos',
      icon: <Database className="text-[#fdc700]" size={28} />,
      content:
        'Podemos recopilar y tratar los siguientes datos personales de los usuarios:\n\n- Información de identificación: nombre completo, número de identificación, fecha de nacimiento.\n- Datos de contacto: correo electrónico, número telefónico, dirección.\n- Información relacionada con la búsqueda y oferta de propiedades o vehículos.\n- Datos técnicos: dirección IP, tipo de dispositivo, navegador y cookies.',
    },
    {
      id: 3,
      title: 'Finalidad del Tratamiento',
      icon: <ShieldCheck className="text-[#fdc700]" size={28} />,
      content:
        'Los datos personales se recolectan para los siguientes fines:\n\n- Facilitar la conexión entre usuarios y agentes inmobiliarios.\n- Gestionar el registro, autenticación y acceso a la plataforma.\n- Enviar notificaciones y comunicaciones relacionadas con el servicio.\n- Mejorar la experiencia de usuario y optimizar el funcionamiento de la plataforma.\n- Cumplir con obligaciones legales y regulatorias.',
    },
    {
      id: 4,
      title: 'Legitimación para el Tratamiento',
      icon: <Lock className="text-[#fdc700]" size={28} />,
      content:
        'El tratamiento de datos se realiza con base en:\n\n- El consentimiento explícito del usuario.\n- La ejecución de un contrato o prestación de un servicio solicitado por el titular.\n- El cumplimiento de obligaciones legales.',
    },
    {
      id: 5,
      title: 'Compartición de Datos',
      icon: <User className="text-[#fdc700]" size={28} />,
      content:
        'Los datos personales no serán compartidos con terceros ajenos a Inmova sin autorización previa, salvo requerimiento legal o judicial.\n\nLos agentes inmobiliarios registrados en la plataforma tendrán acceso limitado a la información necesaria para gestionar la conexión con el usuario.',
    },
    {
      id: 6,
      title: 'Derechos de los Titulares',
      icon: <ShieldCheck className="text-[#fdc700]" size={28} />,
      content:
        'Los usuarios tienen derecho a:\n\n- Conocer, actualizar, rectificar y solicitar la supresión de sus datos personales.\n- Revocar el consentimiento otorgado para el tratamiento de datos.\n- Presentar consultas o reclamos ante Inmova o ante la Superintendencia de Industria y Comercio (SIC).\n\nPara ejercer estos derechos, el usuario podrá contactarnos a través de [correo electrónico] o [teléfono].',
    },
    {
      id: 7,
      title: 'Medidas de Seguridad',
      icon: <Lock className="text-[#fdc700]" size={28} />,
      content:
        'Inmova implementa medidas técnicas, administrativas y organizativas para proteger los datos personales contra acceso no autorizado, pérdida, alteración o divulgación indebida, conforme a la normativa vigente.',
    },
    {
      id: 8,
      title: 'Conservación de Datos',
      icon: <Clock className="text-[#fdc700]" size={28} />,
      content:
        'Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades descritas y para cumplir con las obligaciones legales aplicables.',
    },
    {
      id: 9,
      title: 'Cambios en la Política de Privacidad',
      icon: <Clock className="text-[#fdc700]" size={28} />,
      content:
        'Inmova podrá actualizar esta política para adaptarla a cambios legales o mejoras en el servicio. Las modificaciones serán informadas oportunamente a los usuarios.',
    },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    alert('Gracias por contactarnos. Te responderemos pronto.')
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    })
  }

  return (
    <section className="mt-15 max-w-5xl mx-auto p-6 md:p-10 font-poppins text-gray-900">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#fdc700]">Política de Privacidad – Inmova</h1>
      <p className="text-center text-gray-600 mb-15">Fecha de última actualización: 10/06/2025</p>

      <div className="space-y-8">
        {sections.map(({ id, title, icon, content }) => (
          <article key={id} className="flex gap-4 md:gap-6 items-start">
            <div className="mt-1">{icon}</div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-12 max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#fdc700]">Contáctanos</h2>
        <div>
          <label htmlFor="nombre" className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
          />
        </div>
        <div>
          <label htmlFor="asunto" className="block mb-1 font-medium">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
          />
        </div>
        <div>
          <label htmlFor="mensaje" className="block mb-1 font-medium">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#fdc700] text-white font-semibold py-3 rounded hover:bg-yellow-500 transition"
        >
          Enviar
        </button>
      </form>
    </section>
  )
}
