"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../lib/supabaseClient";
import Image from "next/image";

export default function EditarCarroPage() {
  const { id } = useParams();
  const [carro, setCarro] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: car, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !car) throw new Error("Carro no encontrado");
        setCarro(car);

        const { data: imgs, error: imgErr } = await supabase
          .from("car_images")
          .select("id, url")
          .eq("car_id", id)
          .order("created_at", { ascending: true });

        if (imgErr) throw imgErr;
        setImagenes(imgs || []);
      } catch (err) {
        console.error(err);
        setMensaje("Error al cargar el carro");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const showMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarro((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carro) return;

    try {
      const { error } = await supabase
        .from("cars")
        .update({
          title: carro.title,
          description: carro.description,
          price: carro.price,
          estado: carro.estado,
          agente: carro.agente,
          ciudad: carro.ciudad,
          barrio: carro.barrio,
          codigoPostal: carro.codigoPostal,
          direccion: carro.direccion,
          marca: carro.marca,
          modelo: carro.modelo,
          combustible: carro.combustible,
          transmision: carro.transmision,
          puertas: carro.puertas,
          capacidad_tanque: carro.capacidad_tanque,
          youtube: carro.youtube,
          carretera_consumo: carro.carretera_consumo,
          ciudad_consumo: carro.ciudad_consumo,
        })
        .eq("id", carro.id);

      if (error) throw error;
      showMensaje("Cambios guardados exitosamente");
    } catch (err) {
      console.error("Error al guardar cambios:", err.message);
      showMensaje("Error al guardar cambios");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-white font-poppins bg-[#0a1128] min-h-screen">
        Cargando carro...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#e0e1e6] text-white font-poppins flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 text-black space-y-8">
        <h1 className="text-3xl font-semibold text-[#0a1128] border-b border-[#FDC500] pb-2">
          Editar Carro
        </h1>

        {mensaje && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-medium">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            ["title", "Título", "text"],
            ["description", "Descripción", "textarea"],
            ["price", "Precio", "number"],
            ["estado", "Estado", "text"],
            ["agente", "Agente", "text"],
            ["ciudad", "Ciudad", "text"],
            ["barrio", "Barrio", "text"],
            ["codigoPostal", "Código Postal", "number"],
            ["direccion", "Dirección", "text"],
            ["marca", "Marca", "text"],
            ["modelo", "Modelo (año)", "number"],
            ["combustible", "Tipo de Combustible", "text"],
            ["transmision", "Transmisión", "text"],
            ["puertas", "Número de Puertas", "number"],
            ["capacidad_tanque", "Capacidad del Tanque (L)", "number"],
            ["carretera_consumo", "Consumo en Carretera (Km/L)", "number"],
            ["ciudad_consumo", "Consumo en Ciudad (Km/L)", "number"],
            ["youtube", "Link de Video YouTube", "text"],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block font-medium mb-1 text-[#0a1128]"
              >
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={carro[name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-[#FDC500] h-36 resize-none"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={carro[name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-[#FDC500]"
                />
              )}
            </div>
          ))}

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#FDC500] text-[#0a1128] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>

        {/* Imágenes solo visualización */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0a1128]">Imágenes</h2>

          <div className="flex gap-4 overflow-x-auto">
            {imagenes.length > 0 ? (
              imagenes.map((img) => (
                <div
                  key={img.id}
                  className="relative w-32 h-32 flex-shrink-0 border rounded-lg overflow-hidden shadow"
                >
                  <Image
                    src={img.url}
                    alt={`img-${img.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay imágenes cargadas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
