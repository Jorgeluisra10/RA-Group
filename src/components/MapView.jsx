"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -34.6037,
  lng: -58.3816,
};

export default function MapView({
  mode = "detalle",       // "detalle" o "busqueda"
  city = "",              // para modo "detalle"
  userMarker = true,      // mostrar ubicación del usuario
  data = [],              // para modo "busqueda"
  onMarkerClick = null,   // función al hacer click en un marker (opcional)
  centerOn = null,        // para centrar desde afuera (modo busqueda)
}) {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [cityPosition, setCityPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  // Obtener ubicación del usuario (solo si se permite)
  useEffect(() => {
    if (!navigator.geolocation || !userMarker) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const posObj = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserPosition(posObj);
        if (mode === "detalle") {
          setMapCenter(posObj);
        }
      },
      () => console.warn("Ubicación del usuario denegada")
    );
  }, [userMarker, mode]);

  // Geocodificar ciudad (modo detalle)
  useEffect(() => {
    if (mode !== "detalle" || !isLoaded || !city) return;

    const geocodeCity = async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          const pos = { lat: loc.lat(), lng: loc.lng() };
          setCityPosition(pos);
          setMapCenter(pos);
        }
      });
    };

    geocodeCity();
  }, [isLoaded, city, mode]);

  // Centrar en punto externo (modo búsqueda)
  useEffect(() => {
    if (mode === "busqueda" && centerOn) {
      setMapCenter(centerOn);
    }
  }, [centerOn, mode]);

  if (!isLoaded) return <div className="h-full flex justify-center items-center">Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
      {mode === "detalle" && cityPosition && <Marker position={cityPosition} />}
      {mode === "detalle" && userMarker && userPosition && <Marker position={userPosition} />}
      
      {mode === "busqueda" &&
        data.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            title={item.titulo}
            icon={{
              url:
                item.tipo === "propiedad"
                  ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  : "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            }}
            onClick={() => onMarkerClick?.(item)}
          />
        ))}
    </GoogleMap>
  );
}
