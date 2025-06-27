"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "next-themes";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 4.570868, // Centro de Colombia
  lng: -74.297333,
};

const defaultZoom = 6;

// Estilo "night mode" de Google Maps
const googleNightStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function MapView({
  mode = "detalle",
  city = "",
  userMarker = true,
  data = [],
  onMarkerClick = null,
  centerOn = null,
}) {
  const { resolvedTheme } = useTheme();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoomLevel, setZoomLevel] = useState(mode === "busqueda" ? defaultZoom : 13);
  const [cityPosition, setCityPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

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

  useEffect(() => {
    if (mode !== "detalle" || !isLoaded || !city) return;

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
  }, [isLoaded, city, mode]);

  useEffect(() => {
    if (mode === "busqueda" && centerOn) {
      setMapCenter(centerOn);
      setZoomLevel(13);
    }
  }, [centerOn, mode]);

  if (!isLoaded)
    return (
      <div className="h-full flex justify-center items-center">
        Cargando mapa...
      </div>
    );

  const mapOptions = {
    styles: resolvedTheme === "dark" ? googleNightStyle : [],
    disableDefaultUI: false,
  };

  return (
    <GoogleMap
      key={resolvedTheme}
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={zoomLevel}
      options={mapOptions}
    >
      {mode === "detalle" && cityPosition && <Marker position={cityPosition} />}
      {mode === "detalle" && userMarker && userPosition && (
        <Marker position={userPosition} />
      )}
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
