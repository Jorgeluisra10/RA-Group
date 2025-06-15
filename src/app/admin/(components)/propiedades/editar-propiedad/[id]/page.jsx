"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProperties } from "../../../../../../lib/api";
import { supabase } from "../../../../../../lib/supabaseClient";
import PropertyImageGallery from "../(components)/Imagenes";

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
          .select("id, url, order")
          .eq("property_id", id)
          .order("order", { ascending: true });

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

      // Guardar orden imágenes

      await Promise.all(
        imagenes.map((img) =>
          supabase
            .from("property_images")
            .update({ order: img.order })
            .eq("id", img.id)
        )
      );

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
    <div className="min-h-screen bg-[#0a1128] text-white font-poppins flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 text-black space-y-8">
        <h1 className="text-3xl font-bold text-[#0a1128] border-b-4 border-[#FDC500] pb-3">
          Editar Propiedad
        </h1>

        {mensaje && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-medium">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block font-medium mb-1 text-[#0a1128]"
              >
                Precio
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={propiedad.price || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>
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
              className="w-full p-3 rounded-lg border border-gray-300 h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["tipo", "Tipo de propiedad"],
              ["estado", "Estado"],
              ["agente", "Agente"],
              ["ciudad", "Ciudad"],
              ["barrio", "Barrio"],
              ["codigoPostal", "Código Postal"],
              ["direccion", "Dirección"],
              ["habitaciones", "Habitaciones"],
              ["banos", "Baños"],
              ["area", "Área (m²)"],
              ["garaje", "Garaje"],
            ].map(([name, label]) => (
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
                  value={propiedad[name] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
              </div>
            ))}
          </div>
          <section className="space-y-4">
            <PropertyImageGallery imagenes={imagenes} setImagenes={setImagenes}/>
          </section>
          <div className="text-right">
            <button
              type="submit"
              className="bg-[#FDC500] text-[#0a1128] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
