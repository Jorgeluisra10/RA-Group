'use client';
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
    // Detiene la animación luego de 10 repeticiones (~10s si dura 1s por ciclo)
    const timeout = setTimeout(() => setShowPing(false), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Link
      href="/"
      className="flex items-center gap-2 group select-none cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Ícono de casa */}
      <div className="relative w-8 h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-full h-full drop-shadow-[0_0_6px_rgba(253,199,0,0.4)]"
        >
          <path
            d="M32 6L6 26v32h18V42h16v16h18V26L32 6z"
            fill={isDark ? "#2d6bff" : "#0F1C46"} // Azul más equilibrado
          />
          <rect x="28" y="38" width="8" height="10" rx="1" fill="#fdc700" />
          <circle cx="32" cy="43" r="1.2" fill="#0F1C46" />
        </svg>

        {/* Glow detrás opcional */}
        <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-20"></div>
      </div>

      {/* Texto IMNOVA + punto */}
      <div className="text-[22px] font-extrabold flex items-center tracking-tight select-none">
        <span className="text-yellow-400 drop-shadow-[0_0_4px_rgba(253,199,0,0.6)]">
          IM
        </span>
        <span className={`${isDark ? "text-[#3d6be3]" : "text-[#0f1c46]"} ml-[1px]`}>
          NOVA
        </span>

        <span className="relative ml-1">
          <span className="text-yellow-400 text-xl leading-none">•</span>
          {showPing && (
            <span className="absolute top-0 left-0 w-full h-full rounded-full blur-md bg-yellow-400 opacity-60 animate-ping"></span>
          )}
        </span>
      </div>
    </Link>
  );
}
