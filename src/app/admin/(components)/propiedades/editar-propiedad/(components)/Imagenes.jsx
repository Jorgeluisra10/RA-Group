"use client";

import Image from "next/image";
import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function PropertyImageGallery({ imagenes, setImagenes }) {
  const imagenesOrdenadas = useMemo(() => {
    return [...imagenes].sort((a, b) => a.order - b.order);
  }, [imagenes]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = imagenesOrdenadas.findIndex((img) => img.id === active.id);
      const newIndex = imagenesOrdenadas.findIndex((img) => img.id === over.id);
      const newOrden = arrayMove(imagenesOrdenadas, oldIndex, newIndex);

      // Recalcular los "order"
      const reordered = newOrden.map((img, index) => ({
        ...img,
        order: index,
      }));

      setImagenes(reordered);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-2 border-b-2 border-[#FDC500] w-fit">
        Galería de Imágenes
      </h2>

      {/* Imagen principal */}
      <div className="relative w-full h-72 rounded-lg overflow-hidden mb-4">
        <Image
          src={imagenesOrdenadas[0].url}
          alt="imagen principal"
          fill
          className="object-cover"
        />
      </div>

      {/* Miniaturas arrastrables */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={imagenesOrdenadas.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex gap-4 overflow-x-auto pb-2">
            {imagenesOrdenadas.map((img) => (
              <SortableImage key={img.id} img={img} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}

function SortableImage({ img }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-28 h-28 border rounded-lg overflow-hidden flex-shrink-0 bg-white shadow"
    >
      <Image
        src={img.url}
        alt="img"
        fill
        className="object-cover pointer-events-none"
      />
      <div className="absolute top-1 left-1 text-white bg-black/50 p-1 rounded">
        <GripVertical size={16} />
      </div>
    </div>
  );
}
