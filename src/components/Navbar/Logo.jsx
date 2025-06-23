"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      className="flex items-end gap-3 group select-none cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Imagen del logo */}
      <div className="relative w-12 h-12 top-[-2px]">
        <Image
          src="/images/logo.png"
          alt="Logo IMNOVA"
          fill
          className={`object-contain ${
            isDark ? "drop-shadow-[0_0_6px_rgba(253,199,0,0.6)]" : ""
          }`}
          priority
        />
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
          {isDark && (
            <span className="absolute inset-0 -z-10 bg-yellow-400 blur-md opacity-14 rounded-md pointer-events-none"></span>
          )}
          NOBA
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
