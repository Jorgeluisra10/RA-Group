"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CarImageGallery from "../(components)/Imagenes";
import EvaluacionAuto from "../../../../../../components/ia";
import { supabase } from "../../../../../../lib/supabaseClient";

export default function EditarCarroPage() {
  const router = useRouter();
  const { id } = useParams();
  const [carro, setCarro] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [agentes, setAgentes] = useState([]);

  useEffect(() => {
    const fetchAgentes = async () => {
      const { data, error } = await supabase.from("agentes").select("id, nombre");
      if (!error) setAgentes(data);
    };

    const fetchData = async () => {
      try {
        const { data: car, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !car) throw new Error("Carro no encontrado");
        setCarro(car);
        setVideoPreview(car.youtube || "");

        const { data: imgs, error: imgErr } = await supabase
          .from("car_images")
          .select("id, url, order")
          .eq("car_id", id)
          .order("order", { ascending: true });

        if (imgErr) throw imgErr;
        setImagenes(imgs || []);
      } catch (err) {
        console.error(err);
        setMensaje("Error al cargar el carro");
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
    setCarro((prev) => ({ ...prev, [name]: value }));
    if (name === "youtube") {
      setVideoPreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carro) return;

    try {
      const { error } = await supabase
        .from("cars")
        .update({ ...carro })
        .eq("id", carro.id);

      if (error) throw error;

      await Promise.all(
        imagenes.map((img) =>
          supabase
            .from("car_images")
            .update({ order: img.order })
            .eq("id", img.id)
        )
      );

      showMensaje("Cambios guardados exitosamente");
      router.push("/admin/carros");
    } catch (err) {
      console.error("Error al guardar cambios:", err.message);
      showMensaje("Error al guardar cambios");
    }
  };

  const getYoutubeId = (url) => {
    const match = url?.match(/(?:v=|\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  };

  if (loading)
    return (
      <div className="p-8 text-white font-poppins bg-[#0a1128] min-h-screen">
        Cargando carro...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#0a1128] font-poppins px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-8 space-y-8">
        <h1 className="text-3xl font-semibold border-b border-[#FDC500] pb-2">
          Editar Información del Vehículo
        </h1>

        {mensaje && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-medium">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INFORMACIÓN BÁSICA */}
          <section>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
              Información Básica
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-1 block">Título</label>
                <input
                  type="text"
                  name="title"
                  value={carro.title || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Ej: Toyota Corolla 2022 - Excelente Estado"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={carro.price || 0}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm mb-1 block">Descripción</label>
              <textarea
                name="description"
                value={carro.description || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 h-28 resize-none"
                placeholder="Describa las características principales del vehículo..."
              />
            </div>
          </section>

          {/* INFORMACIÓN DETALLADA DEL VEHÍCULO */}
          <section>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
              Detalles Técnicos
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={carro.marca || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={carro.modelo || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Combustible</label>
                <select
                  name="combustible"
                  value={carro.combustible || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block">Transmisión</label>
                <input
                  type="text"
                  name="transmision"
                  value={carro.transmision || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Puertas</label>
                <input
                  type="number"
                  name="puertas"
                  value={carro.puertas || 0}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Capacidad del Tanque (L)</label>
                <input
                  type="number"
                  name="capacidad_tanque"
                  value={carro.capacidad_tanque || 0}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Consumo Carretera (km/L)</label>
                <input
                  type="number"
                  name="carretera_consumo"
                  value={carro.carretera_consumo || 0}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Consumo Ciudad (km/L)</label>
                <input
                  type="number"
                  name="ciudad_consumo"
                  value={carro.ciudad_consumo || 0}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </section>

          {/* INFORMACIÓN DE UBICACIÓN */}
          <section>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
              Ubicación
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={carro.ciudad || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Barrio</label>
                <input
                  type="text"
                  name="barrio"
                  value={carro.barrio || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">Código Postal</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={carro.codigoPostal || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm mb-1 block">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={carro.direccion || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </section>

          {/* AGENTE ENCARGADO */}
          <section>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
              Agente
            </h2>
            <label className="text-sm mb-1 block">Seleccione un agente</label>
            <select
              name="agente"
              value={carro.agente || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Seleccionar agente</option>
              {agentes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </section>

          {/* VIDEO */}
          <section>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
              Video
            </h2>
            <label className="text-sm mb-1 block">Enlace de YouTube</label>
            <input
              type="text"
              name="youtube"
              value={carro.youtube || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {videoPreview && (
              <div className="mt-4">
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${getYoutubeId(videoPreview)}`}
                  title="Video Preview"
                  allowFullScreen
                />
              </div>
            )}
          </section>

          {/* GALERÍA DE IMÁGENES */}
          <section>
            <CarImageGallery imagenes={imagenes} setImagenes={setImagenes} />
          </section>

          {/* IA */}
          <div className="flex items-center justify-between">
            <EvaluacionAuto evaluacion={carro} carroId={carro.id} />
          </div>

          {/* BOTÓN GUARDAR */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-[#FDC500] text-[#0a1128] font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-400 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
