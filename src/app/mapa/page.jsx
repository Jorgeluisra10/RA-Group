'use client'

import { useEffect, useState, useRef } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { motion } from 'framer-motion'

const containerStyle = {
  width: '100%',
  height: '80vh',
}

const defaultCenter = {
  lat: -34.6037, // Buenos Aires
  lng: -58.3816,
}

const propiedadesMock = [
  {
    id: 1,
    titulo: 'Casa en Palermo',
    ciudad: 'Buenos Aires',
    lat: -34.5837,
    lng: -58.4269,
  },
  {
    id: 2,
    titulo: 'Depto en Rosario',
    ciudad: 'Rosario',
    lat: -32.9442,
    lng: -60.6505,
  },
  {
    id: 3,
    titulo: 'Casa en Córdoba',
    ciudad: 'Córdoba',
    lat: -31.4201,
    lng: -64.1888,
  },
]

export default function MapaPage() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [filteredCities, setFilteredCities] = useState([])
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const inputRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const cities = [...new Set(propiedadesMock.map((p) => p.ciudad))]

  useEffect(() => {
    if (search.length === 0) {
      setFilteredCities([])
      return
    }

    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCities(filtered)
  }, [search])

  useEffect(() => {
    if (selectedCity) {
      const prop = propiedadesMock.find(
        (p) => p.ciudad.toLowerCase() === selectedCity.toLowerCase()
      )
      if (prop) {
        setMapCenter({ lat: prop.lat, lng: prop.lng })
      }
    }
  }, [selectedCity])

  const propiedadesFiltradas = selectedCity
    ? propiedadesMock.filter((p) => p.ciudad === selectedCity)
    : propiedadesMock

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="relative w-full max-w-xl mx-auto">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar ciudad..."
          className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredCities.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow"
          >
            {filteredCities.map((city, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setSelectedCity(city)
                  setSearch(city)
                  setFilteredCities([])
                }}
              >
                {city}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {propiedadesFiltradas.map((p) => (
            <Marker
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              title={p.titulo}
            />
          ))}
        </GoogleMap>
      ) : (
        <p className="text-center text-gray-500">Cargando mapa...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {propiedadesFiltradas.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.titulo}</h2>
            <p className="text-sm text-gray-600">{p.ciudad}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
