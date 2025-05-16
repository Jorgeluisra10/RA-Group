'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (typeof window !== 'undefined') {
  // Solo crea el cliente si está en cliente
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Advertencia: faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
}

export { supabase };
