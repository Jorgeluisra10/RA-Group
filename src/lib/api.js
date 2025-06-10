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
export async function getProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        url
      )
    `);

  if (error) {
    throw new Error(`Error al obtener propiedades: ${error.message}`);
  }

  return data.map(property => ({
    ...property,
    images: property.property_images?.map(img => img.url) || []
  }));
}


// Editar un carro por ID
export async function updateCar(id, updatedData) {
  const { data, error } = await supabase
    .from('cars')
    .update(updatedData)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error al actualizar el carro: ${error.message}`);
  }

  return data;
}

// Eliminar un carro por ID
export async function deleteCar(id) {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error al eliminar el carro: ${error.message}`);
  }
}

// Editar una propiedad por ID
export async function updateProperty(id, updatedData) {
  const { data, error } = await supabase
    .from('properties')
    .update(updatedData)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error al actualizar la propiedad: ${error.message}`);
  }

  return data;
}

// Eliminar una propiedad por ID
export async function deleteProperty(id) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error al eliminar la propiedad: ${error.message}`);
  }
}

// Obtener solicitudes de clientes para publicación
export async function getSolicitudes() {
  const { data, error } = await supabase
    .from("publicaciones_propiedades")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener solicitudes: ${error.message}`);
  }

  return data;
}