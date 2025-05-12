"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProperties } from "../../../../context/PropertyContext";
import toast from "react-hot-toast";

// Input reutilizable
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

// Select reutilizable
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
  const { agregarPropiedad } = useProperties();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [agente, setAgente] = useState("");

  // Nuevos estados
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [area, setArea] = useState("");
  const [garaje, setGaraje] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [barrio, setBarrio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const [errors, setErrors] = useState({});

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const requiereDatosAdicionales = tipo === "Casa" || tipo === "Apartamento";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "El título es obligatorio.";
    if (!description.trim())
      newErrors.description = "La descripción es obligatoria.";
    if (!price || isNaN(price) || Number(price) <= 0)
      newErrors.price = "El precio debe ser un número mayor a 0.";
    if (!image || !isValidUrl(image))
      newErrors.image = "La URL de la imagen no es válida.";
    if (!direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";
    if (!tipo) newErrors.tipo = "El tipo es obligatorio.";
    if (!estado) newErrors.estado = "El estado es obligatorio.";
    if (!agente) newErrors.agente = "Debes asignar un agente.";
    if (!ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria.";

    if (requiereDatosAdicionales) {
      if (!habitaciones || isNaN(habitaciones) || Number(habitaciones) < 0)
        newErrors.habitaciones = "Número inválido.";
      if (!banos || isNaN(banos) || Number(banos) < 0)
        newErrors.banos = "Número inválido.";
      if (!area || isNaN(area) || Number(area) <= 0)
        newErrors.area = "Área inválida.";
      if (!garaje || isNaN(garaje) || Number(garaje) < 0)
        newErrors.garaje = "Número inválido.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor completa los campos obligatorios.");
      return;
    }

    agregarPropiedad({
      id: Date.now(),
      title,
      description,
      price: Number(price),
      image,
      direccion,
      tipo,
      estado,
      agente,
      habitaciones: Number(habitaciones),
      banos: Number(banos),
      area: Number(area),
      garaje: Number(garaje),
      ciudad,
      barrio,
      codigoPostal,
    });

    toast.success("Propiedad agregada con éxito");
    router.push("/admin/propiedades");
  };

  return (
    <form
      className="bg-white p-6 rounded shadow space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Título de la propiedad"
          placeholder="Ej: Villa Exclusiva en La Moraleja"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <Select
          label="Tipo de propiedad"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          options={["Casa", "Apartamento", "Carro", "Terreno"]}
          error={errors.tipo}
        />

        <Input
          label="Precio (€)"
          placeholder="Ej: 2850000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={errors.price}
        />

        <Select
          label="Departamento"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          options={["Nuevo", "Usado", "En construcción"]}
          error={errors.estado}
        />

        <Select
          label="Agente asignado"
          value={agente}
          onChange={(e) => setAgente(e.target.value)}
          options={["Carlos García", "Ana Ruiz", "Laura López"]}
          error={errors.agente}
        />

        {requiereDatosAdicionales && (
          <>
            <Input
              label="Habitaciones"
              placeholder="Ej: 6"
              value={habitaciones}
              onChange={(e) => setHabitaciones(e.target.value)}
              error={errors.habitaciones}
            />
            <Input
              label="Baños"
              placeholder="Ej: 5"
              value={banos}
              onChange={(e) => setBanos(e.target.value)}
              error={errors.banos}
            />
            <Input
              label="Área (m²)"
              placeholder="Ej: 650"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              error={errors.area}
            />
            <Input
              label="Garaje (plazas)"
              placeholder="Ej: 4"
              value={garaje}
              onChange={(e) => setGaraje(e.target.value)}
              error={errors.garaje}
            />
          </>
        )}

        <Input
          label="Dirección"
          className="col-span-3"
          placeholder="Ej: Paseo de los Lagos 25, La Moraleja"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          error={errors.direccion}
        />

        <Input
          label="Ciudad"
          placeholder="Ej: Bogotá"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          error={errors.ciudad}
        />
        <Input
          label="Barrio (opcional)"
          placeholder="Ej: Chapinero"
          value={barrio}
          onChange={(e) => setBarrio(e.target.value)}
        />
        <Input
          label="Código Postal"
          placeholder="Ej: 110111"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
        />
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
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      <Input
        label="URL de imagen principal"
        placeholder="Ej: https://miweb.com/imagen.jpg"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        error={errors.image}
      />

      <div className="pt-6 flex justify-center">
        <button
          type="submit"
          className="bg-[#0B1D3B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#10294f] transition duration-200"
        >
          Publicar propiedad
        </button>
      </div>
    </form>
  );
}
