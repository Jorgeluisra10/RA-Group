// components/DevNotice.jsx
"use client";

import { motion } from "framer-motion";

export default function DevNotice() {
  return (
    <motion.div
      className="top-0 z-[60] bg-[var(--btn-secondary)] text-[var(--white)] text-sm text-center py-2 px-4 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      🚧 Este sitio está en desarrollo. Algunas funciones pueden no estar disponibles todavía.
    </motion.div>
  );
}
