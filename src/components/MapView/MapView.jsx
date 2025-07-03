"use client";
import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useTheme } from "next-themes";
import { googleNightStyle } from "./(components)/GoogleDarkMode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LIBRARIES = ["places"];

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 4.570868, lng: -74.297333 };
const defaultZoom = 6;

export default function MapView({
  mode = "detalle",
  city = "",
  userMarker = true,
  data = [],
  onMarkerClick = null,
  centerOn = null,
  selectedProperty = null,
  selectedDestination = null,
  onDestinationSelect = null,
  routeKey = 0,
}) {
  const { resolvedTheme } = useTheme();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);
  const [userPosition, setUserPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [transportMode, setTransportMode] = useState("DRIVING");

  const [placePhotos, setPlacePhotos] = useState([]);
  const [placeAddress, setPlaceAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [travelTime, setTravelTime] = useState("");

  const mapRef = useRef();

  useEffect(() => {
    if (!navigator.geolocation || !userMarker) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const obj = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPosition(obj);
        if (mode === "detalle") {
          setMapCenter(obj);
          setZoomLevel(13);
        }
      },
      () => console.warn("Ubicación denegada")
    );
  }, [userMarker, mode]);

  useEffect(() => {
    if (mode !== "detalle" || !isLoaded || !city) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: city }, (res, status) => {
      if (status === "OK" && res[0]) {
        const loc = res[0].geometry.location;
        setMapCenter({ lat: loc.lat(), lng: loc.lng() });
        setZoomLevel(13);
      }
    });
  }, [isLoaded, city, mode]);

  useEffect(() => {
    if (mode === "busqueda" && centerOn) {
      setMapCenter(centerOn);
      setZoomLevel(16);
    }
  }, [centerOn, mode]);

  useEffect(() => {
    if (!selectedProperty || !selectedDestination || !mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: selectedProperty,
        destination: selectedDestination,
        travelMode: transportMode,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setTravelTime(leg.duration.text);
        }
      }
    );
  }, [selectedDestination, selectedProperty, transportMode]);

  const handleMapClick = (e) => {
    const latLng = e.latLng;
    const location = { lat: latLng.lat(), lng: latLng.lng() };

    if (!mapRef.current) return;
    const places = new window.google.maps.places.PlacesService(mapRef.current);

    places.nearbySearch(
      {
        location,
        radius: 70,
      },
      (results, status) => {
        if (status === "OK" && results.length > 0) {
          const p = results.find(
            (pl) =>
              pl.name &&
              pl.photos &&
              pl.photos.length > 0 &&
              pl.types &&
              !pl.types.some((t) =>
                [
                  "route",
                  "street_address",
                  "postal_code",
                  "sublocality",
                  "neighborhood",
                  "political",
                ].includes(t)
              )
          );

          if (p) {
            const urls = p.photos
              .slice(0, 5)
              .map((ph) => ph.getUrl({ maxWidth: 800, maxHeight: 800 }));
            setPlaceName(p.name);
            setPlaceAddress(p.vicinity || "");
            setPlacePhotos(urls);
            onDestinationSelect?.(location);
          } else {
            setPlacePhotos([]);
            setPlaceName("");
            setPlaceAddress("");
          }
        }
      }
    );
  };

  const mapOptions = isLoaded
    ? {
        styles: resolvedTheme === "dark" ? googleNightStyle : [],
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.TOP_LEFT,
        },
        gestureHandling: "greedy",
        draggableCursor: "grab",
        draggingCursor: "grabbing",
      }
    : {};

  if (!isLoaded)
    return (
      <div className="h-full flex justify-center items-center">
        Cargando mapa...
      </div>
    );

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        key={routeKey}
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoomLevel}
        options={mapOptions}
        onLoad={(map) => (mapRef.current = map)}
        onClick={handleMapClick}
      >
        {mode === "busqueda" &&
          data.map((i) => (
            <Marker
              key={i.id}
              position={{ lat: i.lat, lng: i.lng }}
              title={i.titulo}
              icon={{
                url: "/images/logo/marcador.png",
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              onClick={() => {
                setMapCenter({ lat: i.lat, lng: i.lng });
                setZoomLevel(16);
                onMarkerClick?.(i);
              }}
            />
          ))}

        {selectedDestination && (
          <Marker
            position={selectedDestination}
            icon={{
              url: "https://api.iconify.design/noto:round-pushpin.svg?color=%23fdc700",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#0f1c46",
                strokeWeight: 5,
              },
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>

      {placePhotos.length > 0 && (
        <div
          className="absolute bottom-4 left-4 z-50 w-[90vw] max-w-sm rounded-xl border p-4 shadow-xl animate-fade-in-up"
          style={{
            background: "var(--navbackground)",
            color: "var(--text-default)",
            borderColor: "var(--blue-main)",
          }}
        >
          <div className="relative mb-3">
            {/* Botón X fijo arriba a la derecha */}
            <button
              className="absolute top-2 right-2 z-20 bg-[var(--blue-main)] text-white px-2 py-1 text-sm rounded-full hover:bg-[var(--blue-hover)] transition"
              onClick={() => {
                setPlacePhotos([]);
                setPlaceName("");
                setPlaceAddress("");
                setTravelTime("");
                setDirections(null); // ❗ Elimina la línea de ruta
                onDestinationSelect?.(null); // ❗ Elimina el marcador del destino
              }}
            >
              ✕
            </button>

            {/* Imagen con Swiper */}
            <div className="rounded-lg overflow-hidden aspect-video">
              <Swiper
                spaceBetween={8}
                slidesPerView={1}
                className="h-full w-full"
              >
                {placePhotos.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={src}
                      alt={`Foto ${i}`}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3
                className="font-bold text-base"
                style={{ color: "var(--text-active)" }}
              >
                {placeName}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {placeAddress}
              </p>
              {travelTime && (
                <p className="text-xs mt-1">Tiempo estimado: {travelTime}</p>
              )}
            </div>
            <select
              className="bg-[var(--blue-main)] text-white border border-[var(--gray-border)] p-1 rounded text-sm"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
            >
              <option value="DRIVING">🚗 Auto</option>
              <option value="WALKING">🚶 Caminar</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
