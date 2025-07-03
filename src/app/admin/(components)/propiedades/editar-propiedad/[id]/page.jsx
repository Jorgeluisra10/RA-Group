"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProperties } from "../../../../../../lib/api";
import { supabase } from "../../../../../../lib/supabaseClient";
import PropertyImageGallery from "../(components)/Imagenes";
import UbicacionMapa from "../../../mapa/UbicacionMapa";

export default function EditarPropiedadPage() {
  const router = useRouter();
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [agentes, setAgentes] = useState([]);

  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [mapCenter, setMapCenter] = useState({ lat: 4.710989, lng: -74.072092 });
  const [direccionExacta, setDireccionExacta] = useState("");

  const tipos = ["Casa", "Apartamento", "Terreno", "Oficina", "Local", "Finca", "Lote"];
  const estados = ["Nuevo", "Usado", "En construcción"];

  useEffect(() => {
    const fetchAgentes = async () => {
      const { data, error } = await supabase.from("agentes").select("id, nombre");
      if (!error) setAgentes(data);
    };

    const fetchData = async () => {
      try {
        const data = await getProperties();
        const prop = data.find((item) => String(item.id) === id);
        if (!prop || prop.tipo === "carro") return setMensaje("Propiedad no encontrada");

        setPropiedad(prop);
        setLatLng({ lat: prop.lat || 4.710989, lng: prop.lng || -74.072092 });
        setMapCenter({ lat: prop.lat || 4.710989, lng: prop.lng || -74.072092 });
        setDireccionExacta(prop.direccion_exacta || "");

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

    fetchAgentes();
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
          direccion_exacta: direccionExacta,
          lat: latLng.lat,
          lng: latLng.lng,
          habitaciones: propiedad.habitaciones,
          banos: propiedad.banos,
          area: propiedad.area,
          garaje: propiedad.garaje,
        })
        .eq("id", propiedad.id);

      if (error) throw error;

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
              <label className="block font-medium mb-1 text-[#0a1128]">Título</label>
              <input
                name="title"
                value={propiedad.title || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#0a1128]">Precio</label>
              <input
                name="price"
                type="number"
                value={propiedad.price || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#0a1128]">Descripción</label>
            <textarea
              name="description"
              value={propiedad.description || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium mb-1 text-[#0a1128]">Tipo de propiedad</label>
              <select
                name="tipo"
                value={propiedad.tipo || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Seleccionar</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#0a1128]">Estado</label>
              <select
                name="estado"
                value={propiedad.estado || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Seleccionar</option>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#0a1128]">Agente asignado</label>
              <select
                name="agente"
                value={propiedad.agente || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Seleccionar agente</option>
                {agentes.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            {["ciudad", "barrio", "codigoPostal", "direccion", "habitaciones", "banos", "area", "garaje"].map(
              (campo) => (
                <div key={campo}>
                  <label className="block font-medium mb-1 text-[#0a1128]">
                    {campo.charAt(0).toUpperCase() + campo.slice(1)}
                  </label>
                  <input
                    name={campo}
                    value={propiedad[campo] || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300"
                  />
                </div>
              )
            )}
          </div>

          {/* Mapa de ubicación */}
          <UbicacionMapa
            tipo={propiedad.tipo}
            latLng={latLng}
            setLatLng={setLatLng}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            direccion={propiedad.direccion}
            ciudad={propiedad.ciudad}
            setDireccion={(val) =>
              setPropiedad((prev) => ({ ...prev, direccion: val }))
            }
            direccionExacta={direccionExacta}
            setDireccionExacta={setDireccionExacta}
          />

          <section className="space-y-4">
            <PropertyImageGallery imagenes={imagenes} setImagenes={setImagenes} />
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
