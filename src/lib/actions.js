import { supabase } from './supabaseClient';

// Validar tipo y tamaño de archivo (máx 5MB, solo imágenes jpg/png/jpeg/gif)
function validarArchivo(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const maxSizeMB = 5;
  if (!validTypes.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido: ${file.type}`);
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`Archivo demasiado grande, máximo ${maxSizeMB}MB`);
  }
}

// Subir imágenes a un bucket dado
async function subirImagenes(files, bucket) {
  const uploadedNames = [];

  for (const file of files) {
    validarArchivo(file);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(`Error subiendo imagen: ${uploadError.message}`);
    }

    uploadedNames.push(fileName);
  }

  return uploadedNames;
}

// Insertar propiedad con imágenes (bucket: "properties")
export async function insertarPropiedad(propiedad, files) {
  try {
    let imagenes = [];

    if (files && files.length > 0) {
      imagenes = await subirImagenes(files, 'properties');
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([{ ...propiedad, images: imagenes }]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(`Error al insertar propiedad: ${error.message}`);
  }
}

// Insertar carro con imágenes (bucket: "cars")
export async function insertarCarro(carro, files) {
  try {
    let imagenes = [];

    if (files && files.length > 0) {
      imagenes = await subirImagenes(files, 'cars');
    }

    const { data, error } = await supabase
      .from('cars')
      .insert([{ ...carro, images: imagenes }]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(`Error al insertar carro: ${error.message}`);
  }
}
