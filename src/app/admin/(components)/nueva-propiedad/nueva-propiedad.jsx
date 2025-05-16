"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../../lib/supabaseClient";

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  error = "",
  className = "",
}) => (
  <div className={`${className}`}>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options, error = "" }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select
      className={`w-full p-2 border rounded transition-all duration-300 focus:outline-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      value={value}
      onChange={onChange}
    >
      <option value="">Seleccionar</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default function NuevaPropiedadForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [agente, setAgente] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [area, setArea] = useState("");
  const [garaje, setGaraje] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [barrio, setBarrio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [combustible, setCombustible] = useState("");
  const [transmision, setTransmision] = useState("");
  const [puertas, setPuertas] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const requiereDatosAdicionales = tipo === "Casa" || tipo === "Apartamento";
  const esCarro = tipo === "Carro";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10); // máximo 10 archivos
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "El título es obligatorio.";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "El precio debe ser un número mayor a 0.";
    // if (imageFiles.length === 0) newErrors.image = "Debes seleccionar al menos una imagen.";
    if (!direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";
    if (!tipo) newErrors.tipo = "El tipo es obligatorio.";
    if (!estado) newErrors.estado = "El estado es obligatorio.";
    if (!agente) newErrors.agente = "Debes asignar un agente.";
    if (!ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria.";

    if (requiereDatosAdicionales) {
      if (!habitaciones || isNaN(habitaciones) || Number(habitaciones) < 0) newErrors.habitaciones = "Número inválido.";
      if (!banos || isNaN(banos) || Number(banos) < 0) newErrors.banos = "Número inválido.";
      if (!area || isNaN(area) || Number(area) <= 0) newErrors.area = "Área inválida.";
      if (!garaje || isNaN(garaje) || Number(garaje) < 0) newErrors.garaje = "Número inválido.";
    }

    if (esCarro) {
      if (!marca.trim()) newErrors.marca = "La marca es obligatoria.";
      if (!modelo || isNaN(modelo) || Number(modelo) < 1900) newErrors.modelo = "Modelo inválido.";
      if (!combustible) newErrors.combustible = "El combustible es obligatorio.";
      if (!transmision) newErrors.transmision = "La transmisión es obligatoria.";
      if (!puertas || isNaN(puertas) || Number(puertas) <= 0) newErrors.puertas = "Número de puertas inválido.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor completa los campos obligatorios.");
      return;
    }

    try {
      // Definir bucket según tipo
      const bucket = esCarro ? "cars" : "properties";

      // Subir cada imagen a Supabase Storage y obtener URLs públicas
      const uploadedImageUrls = [];

      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) throw new Error("No se pudo obtener la URL de la imagen");

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      // Insertar en tabla correspondiente
      const commonData = {
        title,
        description,
        price: Number(price),
        images: uploadedImageUrls, // guardamos array de URLs
        estado,
        agente,
        ciudad,
        barrio,
        codigoPostal,
        direccion,
      };

      if (esCarro) {
        const { error } = await supabase.from("cars").insert([
          {
            ...commonData,
            marca,
            modelo: Number(modelo),
            combustible,
            transmision,
            puertas: Number(puertas),
          },
        ]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("properties").insert([
          {
            ...commonData,
            tipo,
            habitaciones: Number(habitaciones) || null,
            banos: Number(banos) || null,
            area: Number(area) || null,
            garaje: Number(garaje) || null,
          },
        ]);
        if (error) throw error;
      }

      toast.success("Propiedad agregada con éxito");
      router.push("/admin/propiedades");
    } catch (error) {
      toast.error(`Error al agregar la propiedad: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <form className="bg-white p-6 rounded shadow space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Título de la propiedad" placeholder="Ej: Villa Exclusiva" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
        <Select label="Tipo de propiedad" value={tipo} onChange={(e) => setTipo(e.target.value)} options={["Casa", "Apartamento", "Carro", "Terreno"]} error={errors.tipo} />
        <Input label="Precio (€)" placeholder="Ej: 2850000" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
        <Select label="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} options={["Nuevo", "Usado", "En construcción"]} error={errors.estado} />
        <Select label="Agente asignado" value={agente} onChange={(e) => setAgente(e.target.value)} options={["Carlos García", "Ana Ruiz", "Laura López"]} error={errors.agente} />

        {requiereDatosAdicionales && (
          <>
            <Input label="Habitaciones" placeholder="Ej: 6" value={habitaciones} onChange={(e) => setHabitaciones(e.target.value)} error={errors.habitaciones} />
            <Input label="Baños" placeholder="Ej: 5" value={banos} onChange={(e) => setBanos(e.target.value)} error={errors.banos} />
            <Input label="Área (m²)" placeholder="Ej: 650" value={area} onChange={(e) => setArea(e.target.value)} error={errors.area} />
            <Input label="Garaje (plazas)" placeholder="Ej: 4" value={garaje} onChange={(e) => setGaraje(e.target.value)} error={errors.garaje} />
          </>
        )}

        {esCarro && (
          <>
            <Input label="Marca" placeholder="Ej: Ford" value={marca} onChange={(e) => setMarca(e.target.value)} error={errors.marca} />
            <Input label="Modelo" placeholder="Ej: 2016" value={modelo} onChange={(e) => setModelo(e.target.value)} error={errors.modelo} />
            <Select label="Combustible" value={combustible} onChange={(e) => setCombustible(e.target.value)} options={["gasolina", "eléctrico", "híbrido"]} error={errors.combustible} />
            <Select label="Transmisión" value={transmision} onChange={(e) => setTransmision(e.target.value)} options={["automática", "manual"]} error={errors.transmision} />
            <Input label="Número de puertas" placeholder="Ej: 4" value={puertas} onChange={(e) => setPuertas(e.target.value)} error={errors.puertas} />
          </>
        )}

        <Input label="Dirección" className="sm:col-span-2 lg:col-span-3" placeholder="Ej: Paseo de los Lagos 25" value={direccion} onChange={(e) => setDireccion(e.target.value)} error={errors.direccion} />
        <Input label="Ciudad" placeholder="Ej: Bogotá" value={ciudad} onChange={(e) => setCiudad(e.target.value)} error={errors.ciudad} />
        <Input label="Barrio (opcional)" placeholder="Ej: Chapinero" value={barrio} onChange={(e) => setBarrio(e.target.value)} />
        <Input label="Código Postal" placeholder="Ej: 110111" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          className={`w-full p-2 border rounded focus:outline-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          rows={4}
          placeholder="Describe la propiedad en detalle..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Imágenes (máximo 10)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
        />
        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
        {imagePreviews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {imagePreviews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Previsualización ${i + 1}`}
                className="max-h-32 rounded shadow"
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 flex justify-center">
        <button
          type="submit"
          className="bg-[#0B1D3B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#10294f] transition duration-200"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
