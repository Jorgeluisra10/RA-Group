'use client';
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
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
          className={`w-full h-full ${
            isDark
              ? "drop-shadow-[0_0_6px_rgba(253,199,0,0.6)]"
              : "drop-shadow-none"
          }`}
        >
          <path
            d="M32 6L6 26v32h18V42h16v16h18V26L32 6z"
            fill="#0F1C46"
          />
          <rect x="28" y="38" width="8" height="10" rx="1" fill="#fdc700" />
          <circle cx="32" cy="43" r="1.2" fill="#0F1C46" />
        </svg>

        {/* Glow amarillo detrás de la casa SOLO en modo dark */}
        {isDark && (
          <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-30 pointer-events-none"></div>
        )}
      </div>

      {/* Texto IMNOVA + punto */}
      <div
        className={`relative text-[26px] font-extrabold flex items-center tracking-tight select-none ${
          isDark ? "drop-shadow-[0_0_5px_rgba(253,199,0,0.5)]" : ""
        }`}
      >
        <span className="text-yellow-400">IM</span>

        <span className="relative ml-[1px] text-[#0f1c46]">
          {/* Resplandor detrás de "NOVA" SOLO en modo dark */}
          {isDark && (
            <span className="absolute inset-0 -z-10 bg-yellow-400 blur-md opacity-14 rounded-md pointer-events-none"></span>
          )}
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
