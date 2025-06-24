"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px", // Altura aumentada
};

const MapView = ({ city }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [cityPosition, setCityPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.warn("Ubicación de usuario no permitida")
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !city) return;

    const geocodeCity = async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          setCityPosition({
            lat: loc.lat(),
            lng: loc.lng(),
          });
        } else {
          console.warn("Error al geocodificar la ciudad:", status);
        }
      });
    };

    geocodeCity();
  }, [isLoaded, city]);

  if (!isLoaded || !cityPosition) return <p>Cargando mapa...</p>;

  return (
    <div className="space-y-2">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={cityPosition}
        zoom={12}
      >
        <Marker position={cityPosition} />
        {userPosition && <Marker position={userPosition} />}
      </GoogleMap>
      <p className="text-sm text-gray-500 text-center">
        Este mapa muestra una ubicación aproximada en relación con tu posición actual.
      </p>
    </div>
  );
};

export default MapView;
