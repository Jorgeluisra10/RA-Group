"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProperties } from "../../../../../../context/PropertyContext";
import toast from "react-hot-toast";

const Input = ({ label, placeholder, className = "", value, onChange }) => (
  <div className={className}>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      className="w-full p-2 border rounded"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const EditarPropiedadPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  const { properties, editarPropiedad } = useProperties();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    const propiedad = properties.find((prop) => prop.id === id);
    if (propiedad) {
      setTitle(propiedad.title || "");
      setDescription(propiedad.description || "");
      setPrice(propiedad.price || "");
      setDireccion(propiedad.direccion || "");
    }
  }, [id, properties]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!title.trim()) {
      toast.error("El título no puede estar vacío.");
      return;
    }

    if (!description.trim()) {
      toast.error("La descripción no puede estar vacía.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error("El precio debe ser un número mayor a 0.");
      return;
    }

    if (!direccion.trim()) {
      toast.error("La dirección no puede estar vacía.");
      return;
    }

    const propiedad = properties.find((prop) => prop.id === id);
    if (!propiedad) {
      toast.error("Propiedad no encontrada.");
      return;
    }

    editarPropiedad(id, {
      ...propiedad,
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      direccion: direccion.trim(),
    });

    toast.success("Propiedad actualizada con éxito");
    router.push("/admin/propiedades");
  };

  const propiedad = properties.find((prop) => prop.id === id);
  if (!Array.isArray(properties) || !propiedad) {
    return <p className="p-6">Cargando propiedad...</p>;
  }

  return (
    <form
      className="bg-white p-6 rounded shadow space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Editar propiedad</h2>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Título de la propiedad"
          placeholder="Ej: Villa Exclusiva"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Precio (€)"
          placeholder="Ej: 2850000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Dirección"
          placeholder="Ej: Calle Falsa 123"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="col-span-3"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Describe la propiedad en detalle..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="pt-6 flex justify-center">
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition duration-200"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

export default EditarPropiedadPage;
