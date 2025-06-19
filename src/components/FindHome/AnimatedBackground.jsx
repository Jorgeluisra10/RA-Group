"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const bgImage = isDark ? "Fondo-FindHome2.png" : "Fondo-FindHome.png";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Fondo base dinámico basado en CSS custom property */}
      <div className="absolute inset-0 bg-[var(--background)] transition-colors duration-300" />

      {/* Imagen de fondo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_top_20%]"
          style={{
            backgroundImage: `url(/images/${bgImage})`,
          }}
        />
      </AnimatePresence>

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
};

export default AnimatedBackground;
