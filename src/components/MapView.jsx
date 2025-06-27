"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 4.570868, // Centro de Colombia
  lng: -74.297333,
};

const defaultZoom = 6; // Zoom para ver toda Colombia

export default function MapView({
  mode = "detalle",
  city = "",
  userMarker = true,
  data = [],
  onMarkerClick = null,
  centerOn = null,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoomLevel, setZoomLevel] = useState(mode === "busqueda" ? defaultZoom : 13);
  const [cityPosition, setCityPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  // Obtener ubicación del usuario (modo detalle)
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
          setZoomLevel(13);
        }
      },
      () => console.warn("Ubicación del usuario denegada")
    );
  }, [userMarker, mode]);

  // Geocodificar ciudad (modo detalle)
  useEffect(() => {
    if (mode !== "detalle" || !isLoaded || !city) return;

    const geocodeCity = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          const pos = { lat: loc.lat(), lng: loc.lng() };
          setCityPosition(pos);
          setMapCenter(pos);
          setZoomLevel(13);
        }
      });
    };

    geocodeCity();
  }, [isLoaded, city, mode]);

  // Centrar en punto externo (modo búsqueda)
  useEffect(() => {
    if (mode === "busqueda" && centerOn) {
      setMapCenter(centerOn);
      setZoomLevel(13); // acercar cuando hay resultado
    }
  }, [centerOn, mode]);

  if (!isLoaded)
    return (
      <div className="h-full flex justify-center items-center">
        Cargando mapa...
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={zoomLevel}
    >
      {/* Marker modo detalle */}
      {mode === "detalle" && cityPosition && <Marker position={cityPosition} />}
      {mode === "detalle" && userMarker && userPosition && (
        <Marker position={userPosition} />
      )}

      {/* Marcadores modo búsqueda */}
      {mode === "busqueda" &&
        data
          .filter((item) => item.lat && item.lng)
          .map((item) => (
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
