import { supabase } from './supabaseClient';

// Opcional: parámetros para paginación
export async function getCars({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .range(from, to);

  if (error) {
    throw new Error(`Error al obtener carros: ${error.message}`);
  }

  return data;
}

export async function getProperties({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .range(from, to);

  if (error) {
    throw new Error(`Error al obtener propiedades: ${error.message}`);
  }

  return data;
}
