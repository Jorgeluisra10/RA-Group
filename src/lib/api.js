// lib/api.js
import { supabase } from './supabaseClient';

// Obtener carros con imágenes
export async function getCars({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('cars')
    .select(`
      *,
      car_images (
        url
      )
    `)
    .range(from, to);

  if (error) {
    throw new Error(`Error al obtener carros: ${error.message}`);
  }

  return data.map(car => ({
    ...car,
    images: car.car_images?.map(img => img.url) || []
  }));
}

// Obtener propiedades con imágenes
export async function getProperties({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        url
      )
    `)
    .range(from, to);

  if (error) {
    throw new Error(`Error al obtener propiedades: ${error.message}`);
  }

  return data.map(property => ({
    ...property,
    images: property.property_images?.map(img => img.url) || []
  }));
}
