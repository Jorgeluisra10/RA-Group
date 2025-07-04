"use client";

import { useRouter } from "next/navigation";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNuevaPropiedadForm } from "./useNuevaPropiedadForm";

const Input = ({ label, placeholder, value, onChange, error = "", className = "" }) => (
  <div className={className}>
    <label className="block font-medium text-[var(--text-default)] mb-1">{label}</label>
    <input
      type="text"
      className={`w-full p-2 rounded bg-[var(--input-bg-light)] text-[var(--text-default)] border transition-all duration-300 focus:outline-none ${
        error ? "border-red-500" : "border-[var(--input-border)]"
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
    <label className="block font-medium text-[var(--text-default)] mb-1">{label}</label>
    <select
      className={`w-full p-2 rounded bg-[var(--input-bg-light)] text-[var(--text-default)] border transition-all duration-300 focus:outline-none ${
        error ? "border-red-500" : "border-[var(--input-border)]"
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
  const {
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
  } = useNuevaPropiedadForm(router);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  return (
    <form className="bg-[var(--white)] p-6 rounded shadow space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Título de la propiedad" placeholder="Ej: Villa Exclusiva" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
        <Select label="Tipo de propiedad" value={tipo} onChange={(e) => setTipo(e.target.value)} options={["Casa", "Apartamento", "Carro", "Terreno", "Oficina", "Local", "Finca", "Lote"]} error={errors.tipo} />
        <Input label="Precio ($)" placeholder="Ej: 2850000" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
        <Select label="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} options={["Nuevo", "Usado", "En construcción"]} error={errors.estado} />
        <div>
          <label className="block font-medium text-[var(--text-default)] mb-1">Agente asignado</label>
          <select className={`w-full p-2 rounded bg-[var(--input-bg-light)] text-[var(--text-default)] border transition-all duration-300 focus:outline-none ${
            errors.agente ? "border-red-500" : "border-[var(--input-border)]"
          }`} value={agente} onChange={(e) => setAgente(e.target.value)}>
            <option value="">Seleccionar</option>
            {agentesDisponibles.map((ag) => (
              <option key={ag.id} value={ag.id}>{ag.nombre}</option>
            ))}
          </select>
          {errors.agente && <p className="text-sm text-red-600 mt-1">{errors.agente}</p>}
        </div>

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
            <Input label="K/L Ciudad" placeholder="Ej: 10.5" value={ciudadConsumo} onChange={(e) => setCiudadConsumo(e.target.value)} error={errors.ciudadConsumo} />
            <Input label="K/L Carretera" placeholder="Ej: 15.2" value={carreteraConsumo} onChange={(e) => setCarreteraConsumo(e.target.value)} error={errors.carreteraConsumo} />
            <Input label="Tamaño de Tanque (Litros)" placeholder="Ej: 55" value={capacidadTanque} onChange={(e) => setCapacidadTanque(e.target.value)} error={errors.capacidadTanque} />
            <Input label="Link vídeo YouTube (opcional)" placeholder="https://youtube.com/..." value={youtube} onChange={(e) => setYoutube(e.target.value)} />
          </>
        )}

        <Input label="Ciudad" placeholder="Ej: Bogotá" value={ciudad} onChange={(e) => setCiudad(e.target.value)} error={errors.ciudad} />
        <Input label="Barrio (opcional)" placeholder="Ej: Chapinero" value={barrio} onChange={(e) => setBarrio(e.target.value)} />
        <Input label="Código Postal" placeholder="Ej: 110111" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block font-medium text-[var(--text-default)] mb-1">Dirección</label>
          <input
            type="text"
            ref={autocompleteRef}
            className={`w-full p-2 rounded bg-[var(--input-bg-light)] text-[var(--text-default)] border transition-all duration-300 focus:outline-none ${
              errors.direccion ? "border-red-500" : "border-[var(--input-border)]"
            }`}
            placeholder="Ej: Carrera x #xx-xx"
            defaultValue={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          {errors.direccion && <p className="text-sm text-red-600 mt-1">{errors.direccion}</p>}
        </div>

        {["Casa", "Apartamento", "Oficina", "Local"].includes(tipo) && isLoaded && latLng.lat && latLng.lng && (
          <div className="col-span-full mt-4">
            <label className="block font-medium text-[var(--text-default)] mb-2">Ubicación en el mapa</label>
            <div className="h-64 w-full rounded border border-[var(--input-border)]">
              <GoogleMap center={latLng} zoom={16} mapContainerStyle={{ height: "100%", width: "100%" }}>
                <Marker
                  position={latLng}
                  draggable
                  onDragEnd={(e) => {
                    const newLat = e.latLng.lat();
                    const newLng = e.latLng.lng();
                    setLatLng({ lat: newLat, lng: newLng });
                    setMapCenter({ lat: newLat, lng: newLng });

                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                      if (status === "OK" && results[0]) {
                        setDireccionExacta(results[0].formatted_address);
                      } else {
                        setDireccionExacta("Ubicación manual sin dirección exacta");
                      }
                    });
                  }}
                />
              </GoogleMap>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Dirección exacta detectada: <strong>{direccionExacta}</strong>
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium text-[var(--text-default)] mb-1">Descripción</label>
        <textarea
          className={`w-full p-2 rounded bg-[var(--input-bg-light)] text-[var(--text-default)] border focus:outline-none ${
            errors.description ? "border-red-500" : "border-[var(--input-border)]"
          }`}
          rows={4}
          placeholder="Describe la propiedad en detalle..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-medium text-[var(--text-default)] mb-1">Imágenes (máximo 10)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-[var(--white)] hover:file:bg-[var(--gray-hover)]"
        />
        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
        {imagePreviews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt={`Previsualización ${i + 1}`} className="max-h-32 rounded shadow" />
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 flex justify-center">
        <button
          type="submit"
          className="bg-[var(--btn-primary)] text-[var(--btn-secondary)] px-6 py-3 rounded-md font-semibold hover:bg-[var(--blue-hover)] transition duration-200"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
