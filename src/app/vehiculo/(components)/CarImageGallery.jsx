"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarImageGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const visibleThumbs = 4;

  const handleThumbNav = (direction) => {
    if (direction === "prev" && thumbStart > 0) {
      setThumbStart(thumbStart - 1);
    } else if (
      direction === "next" &&
      thumbStart + visibleThumbs < images.length
    ) {
      setThumbStart(thumbStart + 1);
    }
  };

  return (
    <>
      <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[400px] mb-4 animate-fade-in-up">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={title}
            width={800}
            height={600}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${
              idx === activeImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => handleThumbNav("prev")}
          className="p-2 rounded-full hover:bg-[var(--gray-hover)] transition"
        >
          <ChevronLeft className="w-5 h-5 icon-color" />
        </button>

        <div className="flex gap-3 overflow-hidden">
          {images
            .slice(thumbStart, thumbStart + visibleThumbs)
            .map((img, idx) => {
              const actualIdx = thumbStart + idx;
              return (
                <button
                  key={actualIdx}
                  onClick={() => setActiveImage(actualIdx)}
                  className={`rounded-xl overflow-hidden transition-all ring-offset-2 ${
                    actualIdx === activeImage
                      ? "ring-2 ring-[var(--blue-main)]"
                      : "hover:ring-1 hover:ring-[var(--gray-border)]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Vista ${actualIdx + 1}`}
                    width={120}
                    height={90}
                    className="object-cover w-28 h-20"
                  />
                </button>
              );
            })}
        </div>

        <button
          onClick={() => handleThumbNav("next")}
          className="p-2 rounded-full hover:bg-[var(--gray-hover)] transition"
        >
          <ChevronRight className="w-5 h-5 icon-color" />
        </button>
      </div>
    </>
  );
}
