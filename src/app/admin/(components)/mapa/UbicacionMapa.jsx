// components/UbicacionMapa.jsx
"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

export default function UbicacionMapa({
  tipo,
  latLng,
  setLatLng,
  mapCenter,
  setMapCenter,
  direccion,
  ciudad,
  setDireccion,
  direccionExacta,
  setDireccionExacta,
}) {
  const autocompleteRef = useRef(null);
  const debounceRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  // Configurar Autocomplete solo una vez
  useEffect(() => {
    if (
      isLoaded &&
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

        setDireccion(autocompleteRef.current.value);
        setDireccionExacta(formatted);
        const coords = { lat: location.lat(), lng: location.lng() };
        setLatLng(coords);
        setMapCenter(coords);
      });
    }
  }, [isLoaded, tipo]);

  // Geocodificar dirección manual cada vez que cambia (con debounce)
  useEffect(() => {
    if (!direccion || !ciudad) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const fullAddress = `${direccion}, ${ciudad}`;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const coords = { lat: location.lat(), lng: location.lng() };

          setLatLng(coords);
          setMapCenter(coords);
          setDireccionExacta(results[0].formatted_address);
        }
      });
    }, 800); // debounce
  }, [direccion, ciudad]);

  if (!["Casa", "Apartamento", "Oficina", "Local"].includes(tipo)) return null;
  if (!isLoaded || !latLng.lat || !latLng.lng) return null;

  return (
    <div className="col-span-full mt-4">
      <label className="block font-medium mb-2">Ubicación en el mapa</label>

      <div className="h-64 w-full rounded border">
        <GoogleMap
          center={mapCenter}
          zoom={16}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          <Marker
            position={latLng}
            draggable
            onDragEnd={(e) => {
              const newLat = e.latLng.lat();
              const newLng = e.latLng.lng();
              const newCoords = { lat: newLat, lng: newLng };
              setLatLng(newCoords);
              setMapCenter(newCoords);

              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: newCoords }, (results, status) => {
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

      <p className="text-sm text-gray-600 mt-2">
        Dirección exacta detectada: <strong>{direccionExacta}</strong>
      </p>

      <input
        type="text"
        ref={autocompleteRef}
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Buscar dirección..."
        className="mt-3 w-full p-2 border rounded"
      />
    </div>
  );
}
