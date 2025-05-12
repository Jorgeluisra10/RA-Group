'use client';
import { createContext, useContext, useState } from 'react';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const agregarPropiedad = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  const editarPropiedad = (id, updatedProperty) => {
  setProperties((prev) =>
    prev.map((prop) => (prop.id === id ? { ...prop, ...updatedProperty } : prop))
  );
};

  const eliminarPropiedad = (id) => {
  setProperties((prev) => prev.filter((prop) => prop.id !== id));
};

  return (
    <PropertyContext.Provider value={{ properties, agregarPropiedad, editarPropiedad, eliminarPropiedad }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);
