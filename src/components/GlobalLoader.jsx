"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A2045]/90 backdrop-blur-sm text-white"
        >
          {/* Spinner refinado */}
          <div className="w-12 h-12 mb-4 relative">
            <div className="absolute inset-0 rounded-full border-2 border-[#FFCC00] border-t-transparent animate-spin" />
          </div>

          {/* Texto refinado */}
          <div className="text-lg md:text-xl font-medium text-[#E2E8F0]">Cargando...</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
