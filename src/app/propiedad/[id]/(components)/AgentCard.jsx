"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { useAuth } from "../../../../context/AuthContext";

export default function AgentCard({ property }) {
  const router = useRouter();
  const { user, loading } = useAuth(); // 🔁 Incluimos 'loading'
  const [agente, setAgente] = useState(null);

  useEffect(() => {
    const fetchAgente = async () => {
      if (!property?.agente) return;

      const { data, error } = await supabase
        .from("agentes")
        .select("id, nombre, rol, email, telefono")
        .eq("id", property.agente)
        .single();

      if (error) {
        console.error("Error al obtener el agente:", error);
        return;
      }

      setAgente(data);
    };

    fetchAgente();
  }, [property?.agente]);

  const handleContact = async (method) => {
    if (loading) {
      console.log("⏳ Cargando sesión de usuario...");
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError || !userData) {
        console.error("Error al obtener datos del usuario:", userError);
        alert("No se pudo obtener la información del usuario.");
        return;
      }

      if (userData.rol === "usuario") {
        const { data: existingClient, error: clientError } = await supabase
          .from("clientes")
          .select("id")
          .eq("email", userData.email)
          .maybeSingle();

        if (clientError) {
          console.error("Error al buscar cliente existente:", clientError);
          alert("Error buscando cliente en base de datos.");
          return;
        }

        if (!existingClient) {
          const { error: insertError } = await supabase
            .from("clientes")
            .insert({
              agente: property.agente,
              nombre: userData.nombre || "",
              alias: userData.alias || "",
              telefono: userData.telefono || "",
              email: userData.email,
              ubicacion: userData.ubicacion || "",
              interes: property.title,
              presupuesto_min: property.price,
              presupuesto_max: property.price,
              estado: "Nuevo",
              derivado_fecha: new Date().toISOString().slice(0, 10),
            });

          if (insertError) {
            console.error("Error insertando cliente:", insertError);
            alert("No se pudo registrar el cliente.");
            return;
          }
        }
      }

      if (method === "whatsapp" && agente?.telefono) {
        let telefono = agente.telefono.replace(/[^0-9]/g, "");
        if (!telefono.startsWith("57")) telefono = "57" + telefono;
        window.open(`https://wa.me/${telefono}`, "_blank");
      } else if (method === "email" && agente?.email) {
        window.location.href = `mailto:${agente.email}`;
      } else {
        alert("Información de contacto no disponible");
      }
    } catch (error) {
      console.error("Error en handleContact:", error);
      alert("Ocurrió un error al procesar la solicitud.");
    }
  };

  const nombre = agente?.nombre || "Agente no disponible";
  const iniciales = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-[var(--background)] border border-[var(--gray-border)] rounded-lg p-4 flex flex-col items-center gap-4 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-[var(--blue-main)] text-white flex items-center justify-center font-bold text-lg">
        {iniciales}
      </div>
      <div className="text-center">
        <p className="font-semibold text-[var(--text-default)]">{nombre}</p>
        <p className="text-sm text-[var(--text-secondary)]">
          {agente?.rol === "agente"
            ? "Asesor Inmobiliario"
            : "Equipo de Ventas"}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => handleContact("whatsapp")}
          className={`${
            agente?.telefono
              ? "bg-[var(--btn-primary)] text-[var(--btn-secondary)] cursor-pointer btn-shine"
              : "opacity-50 cursor-not-allowed bg-[var(--btn-primary)] text-[var(--btn-secondary)]"
          } font-semibold px-4 py-2 rounded-md text-center relative overflow-hidden`}
          disabled={!agente?.telefono}
        >
          Contactar por WhatsApp
        </button>
        <button
          onClick={() => handleContact("email")}
          className={`${
            agente?.email
              ? "bg-transparent border border-[var(--gray-border)] text-[var(--text-default)] cursor-pointer hover:bg-[var(--gray-hover)]"
              : "opacity-50 cursor-not-allowed bg-transparent border border-[var(--gray-border)] text-[var(--text-default)]"
          } font-medium px-4 py-2 rounded-md text-center transition`}
          disabled={!agente?.email}
        >
          Enviar email
        </button>
      </div>
    </div>
  );
}
