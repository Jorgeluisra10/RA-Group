'use client';
import { createContext, useContext, useState } from 'react';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const agregarPropiedad = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  return (
    <PropertyContext.Provider value={{ properties, agregarPropiedad }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);
