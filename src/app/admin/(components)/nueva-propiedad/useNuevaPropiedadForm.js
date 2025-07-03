"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../../lib/supabaseClient";
import debounce from "lodash.debounce";

export function useNuevaPropiedadForm(router) {
  const autocompleteRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [agente, setAgente] = useState("");

  const [agentesDisponibles, setAgentesDisponibles] = useState([]);

  useEffect(() => {
    const fetchAgentes = async () => {
      const { data, error } = await supabase.from("agentes").select("id, nombre");
      if (error) {
        console.error("Error cargando agentes:", error);
      } else {
        setAgentesDisponibles(data);
      }
    };
    fetchAgentes();
  }, []);

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

  const [ciudadConsumo, setCiudadConsumo] = useState("");
  const [carreteraConsumo, setCarreteraConsumo] = useState("");
  const [capacidadTanque, setCapacidadTanque] = useState("");
  const [youtube, setYoutube] = useState("");

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const [mapCenter, setMapCenter] = useState({ lat: 4.710989, lng: -74.072092 }); // Bogotá por defecto
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [direccionExacta, setDireccionExacta] = useState("");

  const requiereDatosAdicionales = [
    "Casa",
    "Apartamento",
    "Finca",
    "Terreno",
    "Lote",
    "Local",
    "Oficina",
  ].includes(tipo);
  const esCarro = tipo === "Carro";

  // Debounce para geocodificar dirección
  const geocodeAddress = debounce(async (address) => {
    if (!window.google || !address) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { location } = results[0].geometry;
        const formattedAddress = results[0].formatted_address;
        setLatLng({ lat: location.lat(), lng: location.lng() });
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        setDireccionExacta(formattedAddress);
      }
    });
  }, 1000);

  useEffect(() => {
    if (
      ["Casa", "Apartamento", "Oficina", "Local"].includes(tipo) &&
      direccion
    ) {
      geocodeAddress(`${direccion}, ${ciudad}`);
    }
  }, [direccion, tipo]);

  // Inicializar Autocomplete Google Places
  useEffect(() => {
    if (
      window.google &&
      autocompleteRef.current &&
      ["Casa", "Apartamento", "Oficina", "Local"].includes(tipo)
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "co" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const location = place.geometry.location;
        const formatted = place.formatted_address;

        setDireccion(autocompleteRef.current.value); // Mantener texto
        setDireccionExacta(formatted);
        setLatLng({ lat: location.lat(), lng: location.lng() });
        setMapCenter({ lat: location.lat(), lng: location.lng() });
      });
    }
  }, [tipo]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "El título es obligatorio.";
    if (!description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!price || isNaN(price) || Number(price) <= 0)
      newErrors.price = "El precio debe ser un número mayor a 0.";
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

    if (esCarro) {
      if (!marca.trim()) newErrors.marca = "La marca es obligatoria.";
      if (!modelo || isNaN(modelo) || Number(modelo) < 1900)
        newErrors.modelo = "Modelo inválido.";
      if (!combustible) newErrors.combustible = "El combustible es obligatorio.";
      if (!transmision) newErrors.transmision = "La transmisión es obligatoria.";
      if (!puertas || isNaN(puertas) || Number(puertas) <= 0)
        newErrors.puertas = "Número de puertas inválido.";

      if (!carreteraConsumo || isNaN(carreteraConsumo) || Number(carreteraConsumo) <= 0)
        newErrors.carreteraConsumo = "K/L Carretera inválido.";
      if (!ciudadConsumo || isNaN(ciudadConsumo) || Number(ciudadConsumo) <= 0)
        newErrors.ciudadConsumo = "K/L Ciudad inválido.";
      if (!capacidadTanque || isNaN(capacidadTanque) || Number(capacidadTanque) <= 0)
        newErrors.capacidadTanque = "Capacidad del tanque inválida.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor completa los campos obligatorios.");
      return;
    }

    try {
      const bucket = esCarro ? "cars" : "properties";
      const uploadedImageUrls = [];

      for (const file of imageFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl)
          throw new Error("No se pudo obtener la URL de la imagen");

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const commonData = {
        title,
        description,
        price: Number(price),
        estado,
        agente,
        ciudad,
        barrio,
        codigoPostal,
        direccion,
        direccion_exacta: direccionExacta,
        lat: latLng.lat,
        lng: latLng.lng,
      };

      let insertedId = null;

      if (esCarro) {
        const { data, error } = await supabase
          .from("cars")
          .insert([
            {
              ...commonData,
              marca,
              modelo: Number(modelo),
              combustible,
              transmision,
              puertas: Number(puertas),
              carretera_consumo: Number(carreteraConsumo),
              ciudad_consumo: Number(ciudadConsumo),
              capacidad_tanque: Number(capacidadTanque),
              youtube: youtube.trim() || null,
            },
          ])
          .select("id")
          .single();

        if (error) throw error;
        insertedId = data.id;

        const imageInserts = uploadedImageUrls.map((url) => ({
          car_id: insertedId,
          url,
        }));

        const { error: imgError } = await supabase.from("car_images").insert(imageInserts);
        if (imgError) throw imgError;
      } else {
        const { data, error } = await supabase
          .from("properties")
          .insert([
            {
              ...commonData,
              tipo,
              habitaciones: Number(habitaciones) || null,
              banos: Number(banos) || null,
              area: Number(area) || null,
              garaje: Number(garaje) || null,
            },
          ])
          .select("id")
          .single();

        if (error) throw error;
        insertedId = data.id;

        const imageInserts = uploadedImageUrls.map((url) => ({
          property_id: insertedId,
          url,
        }));

        const { error: imgError } = await supabase.from("property_images").insert(imageInserts);
        if (imgError) throw imgError;
      }

      toast.success("Propiedad agregada con éxito");
      router.push(esCarro ? "/admin/carros" : "/admin/propiedades");
    } catch (error) {
      toast.error(`Error al agregar la propiedad: ${error.message}`);
      console.error(error);
    }
  };

  return {
    autocompleteRef,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    direccion,
    setDireccion,
    tipo,
    setTipo,
    estado,
    setEstado,
    agente,
    setAgente,
    agentesDisponibles,
    habitaciones,
    setHabitaciones,
    banos,
    setBanos,
    area,
    setArea,
    garaje,
    setGaraje,
    ciudad,
    setCiudad,
    barrio,
    setBarrio,
    codigoPostal,
    setCodigoPostal,
    marca,
    setMarca,
    modelo,
    setModelo,
    combustible,
    setCombustible,
    transmision,
    setTransmision,
    puertas,
    setPuertas,
    ciudadConsumo,
    setCiudadConsumo,
    carreteraConsumo,
    setCarreteraConsumo,
    capacidadTanque,
    setCapacidadTanque,
    youtube,
    setYoutube,
    imageFiles,
    imagePreviews,
    errors,
    mapCenter,
    setMapCenter,
    latLng,
    setLatLng,
    direccionExacta,
    requiereDatosAdicionales,
    esCarro,
    handleImageChange,
    handleSubmit,
  };
}
