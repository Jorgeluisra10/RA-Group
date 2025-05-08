// components/NuevaPropiedadForm.jsx
'use client';

export default function NuevaPropiedadForm() {
  return (
    <form className="bg-white p-6 rounded shadow space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Input label="Título de la propiedad" placeholder="Ej: Villa Exclusiva en La Moraleja" />
        <Select label="Tipo de propiedad" />
        <Input label="Precio (€)" placeholder="Ej: 2850000" />
        <Select label="Estado" />
        <Select label="Agente asignado" />
        <Input label="Habitaciones" placeholder="Ej: 6" />
        <Input label="Baños" placeholder="Ej: 5" />
        <Input label="Área (m²)" placeholder="Ej: 650" />
        <Input label="Garaje (plazas)" placeholder="Ej: 4" />
        <Input label="Dirección" className="col-span-3" placeholder="Ej: Paseo de los Lagos 25, La Moraleja" />
        <Input label="Ciudad" />
        <Input label="Provincia" />
        <Input label="Código Postal" />
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea className="w-full p-2 border rounded" rows={4} placeholder="Describe la propiedad en detalle..." />
      </div>

      <div>
        <label className="block font-medium mb-1">Certificación energética</label>
        <div className="flex gap-2">
          {['A','B','C','D','E','F'].map(label => (
            <button key={label} className="w-8 h-8 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">{label}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Características y comodidades</label>
        <div className="flex flex-wrap gap-2">
          {['Aire acondicionado', 'Calefacción', 'Piscina', 'Jardín', 'Terraza', '+ Añadir', 'WiFi', 'Gimnasio', 'Seguridad 24h', 'Parking', 'Amueblado', 'Admite mascotas'].map(item => (
            <label key={item} className="flex items-center space-x-1">
              <input type="checkbox" className="accent-blue-600" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Imágenes de la propiedad</label>
        <div className="border-2 border-dashed rounded p-6 text-center text-sm text-gray-500">
          Arrastra y suelta imágenes aquí o haz clic para seleccionar
          <br />
          <span className="text-xs">.jpg, .png, .webp hasta 10MB</span>
        </div>
      </div>
    </form>
  );
}
