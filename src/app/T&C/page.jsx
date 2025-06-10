"use client";

import { useState } from "react";

const sections = [
  {
    id: 1,
    title: "1. Objeto",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v2m0 16v2m8-10h2M2 12H0m16.243 6.243l1.414 1.414M4.343 4.343l1.414 1.414M16.243 5.757l1.414-1.414M4.343 19.657l1.414-1.414"
        />
      </svg>
    ),
    content: (
      <>
        Inmova es una plataforma digital que facilita la conexión entre personas
        interesadas en comprar o vender propiedades o vehículos y agentes
        inmobiliarios registrados y confiables.
      </>
    ),
  },
  {
    id: 2,
    title: "2. Rol de Inmova",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m4 4v-1a3 3 0 00-3-3H9m-2 0a7 7 0 1114 0v2a2 2 0 01-2 2h-5z"
        />
      </svg>
    ),
    content: (
      <>
        Inmova actúa únicamente como un intermediario tecnológico que pone en
        contacto a los usuarios con agentes inmobiliarios.
        <br />
        <br />
        Inmova no es una inmobiliaria, no participa en las negociaciones,
        contratos ni transacciones entre compradores, vendedores y agentes.
        <br />
        <br />
        Cualquier acuerdo, negociación o cierre de operación se realiza
        directamente entre el usuario y el agente inmobiliario asignado.
        <br />
        <br />
        Inmova no tiene responsabilidad alguna sobre los términos, condiciones o
        resultados de las operaciones comerciales o financieras realizadas entre
        las partes.
      </>
    ),
  },
  {
    id: 3,
    title: "3. Usuarios",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    content: (
      <>
        El acceso y uso de la plataforma está permitido a personas naturales o
        jurídicas mayores de edad que deseen comprar o vender propiedades o
        vehículos.
        <br />
        <br />
        Los usuarios garantizan que la información suministrada es veraz y
        actualizada.
      </>
    ),
  },
  {
    id: 4,
    title: "4. Limitación de responsabilidad",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M5.64 18.36l-.707-.707M18.36 5.64l-.707-.707M12 4v.01M4 12h.01M20 12h.01M5.64 5.64l-.707.707M18.36 18.36l-.707.707"
        />
      </svg>
    ),
    content: (
      <>
        Inmova no se hace responsable por la veracidad, exactitud o legalidad de
        la información publicada por los agentes inmobiliarios.
        <br />
        <br />
        Inmova no garantiza la efectividad, validez o éxito de ninguna
        negociación o transacción entre las partes.
        <br />
        <br />
        Inmova no es responsable de ningún pago, comisión o cargo económico que
        pueda surgir entre comprador, vendedor o agente inmobiliario.
      </>
    ),
  },
  {
    id: 5,
    title: "5. Protección de datos personales",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c.172 0 .343.015.51.044a3 3 0 10-3.09 0A4.016 4.016 0 0112 11z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 18h16M6 6v12M18 6v12"
        />
      </svg>
    ),
    content: (
      <>
        En cumplimiento de la Ley 1581 de 2012 y demás normas aplicables, Inmova
        recolecta y trata los datos personales de los usuarios para facilitar la
        conexión con agentes inmobiliarios.
        <br />
        <br />
        Los datos serán usados exclusivamente para los fines propios del
        servicio y no serán compartidos con terceros sin autorización, salvo
        requerimiento legal.
        <br />
        <br />
        Los usuarios pueden ejercer sus derechos sobre sus datos conforme a
        nuestra política de privacidad.
      </>
    ),
  },
  {
    id: 6,
    title: "6. Propiedad intelectual",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    content: (
      <>
        Los contenidos, marcas y software de la plataforma son propiedad
        exclusiva de Inmova y están protegidos por la legislación vigente.
        <br />
        <br />
        Queda prohibida su reproducción o uso no autorizado.
      </>
    ),
  },
  {
    id: 7,
    title: "7. Modificaciones",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    content: (
      <>
        Inmova podrá modificar estos términos y condiciones en cualquier
        momento, informando oportunamente a los usuarios.
      </>
    ),
  },
  {
    id: 8,
    title: "8. Ley aplicable y jurisdicción",
    icon: (
      <svg
        className="w-6 h-6 text-[#fdc700]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12v.01M12 6v.01M12 18v.01M4.5 9l1.06-1.06M19.5 9l-1.06-1.06M4.5 15l1.06 1.06M19.5 15l-1.06 1.06"
        />
      </svg>
    ),
    content: (
      <>
        Estos términos se rigen por la legislación colombiana vigente.
        <br />
        <br />
        Para cualquier disputa, las partes se someten a la jurisdicción de los
        tribunales competentes en Bogotá D.C, Colombia.
      </>
    ),
  },
];

export default function TermsAndConditions() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Gracias por contactarnos. Te responderemos pronto.");
    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <section className="mt-15 max-w-5xl mx-auto p-6 md:p-10 font-poppins text-gray-900">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#fdc700]">
        Términos y Condiciones - Inmova
      </h1>
      <p className="text-center text-gray-600 mb-15">
        Fecha de última actualización: 10/06/2025
      </p>

      <div className="space-y-8">
        {sections.map(({ id, title, icon, content }) => (
          <article key={id} className="flex gap-4 md:gap-6 items-start">
            <div className="mt-1">{icon}</div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                {title}
              </h2>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </article>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#fdc700]">
          Contáctanos
        </h2>
        <div>
          <label htmlFor="nombre" className="block mb-1 font-medium">
            Nombre
          </label>
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
          <label htmlFor="email" className="block mb-1 font-medium">
            Correo electrónico
          </label>
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
          <label htmlFor="asunto" className="block mb-1 font-medium">
            Asunto
          </label>
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
          <label htmlFor="mensaje" className="block mb-1 font-medium">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
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
  );
}
