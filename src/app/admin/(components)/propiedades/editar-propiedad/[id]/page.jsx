"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProperties } from "../../../../../../lib/api";
import { supabase } from "../../../../../../lib/supabaseClient";
import Image from "next/image";

export default function EditarPropiedadPage() {
  const router = useRouter();
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        const prop = data.find((item) => String(item.id) === id);
        if (!prop || prop.tipo === "carro")
          return setMensaje("Propiedad no encontrada");
        setPropiedad(prop);

        const { data: imgs, error: imgErr } = await supabase
          .from("property_images")
          .select("id, url")
          .eq("property_id", id)
          .order("created_at", { ascending: true });

        if (imgErr) throw imgErr;
        setImagenes(imgs || []);
      } catch (err) {
        console.error(err);
        setMensaje("Error al cargar la propiedad");
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
    setPropiedad((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!propiedad) return;

    try {
      const { error } = await supabase
        .from("properties")
        .update({
          title: propiedad.title,
          description: propiedad.description,
          price: propiedad.price,
          tipo: propiedad.tipo,
          estado: propiedad.estado,
          agente: propiedad.agente,
          ciudad: propiedad.ciudad,
          barrio: propiedad.barrio,
          codigoPostal: propiedad.codigoPostal,
          direccion: propiedad.direccion,
          habitaciones: propiedad.habitaciones,
          banos: propiedad.banos,
          area: propiedad.area,
          garaje: propiedad.garaje,
        })
        .eq("id", propiedad.id);

      if (error) throw error;

      showMensaje("Cambios guardados exitosamente");
      router.push("/admin/propiedades");
    } catch (err) {
      console.error("Error al guardar cambios:", err.message);
      showMensaje("Error al guardar cambios");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-white font-poppins bg-[#0a1128] min-h-screen">
        Cargando propiedad...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#e0e1e6] text-white font-poppins flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 text-black space-y-8">
        <h1 className="text-3xl font-semibold text-[#0a1128] border-b border-[#FDC500] pb-2">
          Editar Propiedad
        </h1>

        {mensaje && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-medium">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block font-medium mb-1 text-[#0a1128]"
            >
              Título
            </label>
            <input
              id="title"
              name="title"
              value={propiedad.title || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-[#FDC500]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium mb-1 text-[#0a1128]"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={propiedad.description || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-[#FDC500] h-36 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="tipo"
              className="block font-medium mb-1 text-[#0a1128]"
            >
              Tipo de propiedad
            </label>
            <select
              id="tipo"
              name="tipo"
              value={propiedad.tipo || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-[#FDC500] bg-white text-black"
            >
              <option value="">Seleccione una opción</option>
              <option value="Lote">Lote</option>
              <option value="Finca">Finca</option>
              <option value="Oficina">Oficina</option>
              <option value="Local">Local</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Terreno">Terreno</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["price", "Precio", "number"],
              ["area", "Área (m²)", "number"],
              ["habitaciones", "Habitaciones", "number"],
              ["banos", "Baños", "number"],
              ["garaje", "Garaje", "number"],
              ["ciudad", "Ciudad", "text"],
              ["barrio", "Barrio", "text"],
              ["codigoPostal", "Código Postal", "number"],
              ["direccion", "Dirección", "text"],
              ["tipo", "Tipo de propiedad", "text"],
              ["estado", "Estado", "text"],
              ["agente", "Agente", "text"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block font-medium mb-1 text-[#0a1128]"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={propiedad[name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border-2 border-[#FDC500]"
                />
              </div>
            ))}
          </div>

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
