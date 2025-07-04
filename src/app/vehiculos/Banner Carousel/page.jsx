// components/BannerCarousel.jsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const banners = [
  { id: 1, src: "/images/banners/banner3.png", alt: "Banner 1" },
];

export default function BannerCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider rounded-xl overflow-hidden mb-8"
    >
      {banners.map((banner) => (
        <div key={banner.id} className="keen-slider__slide">
          <img
            src={banner.src}
            alt={banner.alt}
            className="w-full h-auto max-h-[400px] object-contain sm:object-cover"
          />
        </div>
      ))}
    </div>
  );
}
