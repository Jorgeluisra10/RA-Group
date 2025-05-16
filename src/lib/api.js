// src/lib/api.js
import { supabase } from './supabaseClient';

export async function getCars() {
  const { data, error } = await supabase.from('cars').select('*');
  if (error) throw error;
  return data;
}

export async function getProperties() {
  const { data, error } = await supabase.from('properties').select('*');
  if (error) throw error;
  return data;
}
