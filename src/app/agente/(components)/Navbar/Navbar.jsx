"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Home } from "lucide-react";
import ThemeToggleButton from "../../../../components/Darkmode";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar({ user, userInfo }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cierre al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nombreCompleto = userInfo?.nombre && userInfo?.apellido
    ? `${userInfo.nombre} ${userInfo.apellido}`
    : "Usuario";

  const nombreCorto = (() => {
    if (!userInfo?.nombre) return "Usuario";
    const nombre = userInfo.nombre.split(" ")[0];
    const apellidoInicial = userInfo.apellido ? userInfo.apellido[0] + "." : "";
    return `${nombre} ${apellidoInicial}`;
  })();

  const getIniciales = (nombre) =>
    nombre
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push("/");
  };

  return (
    <header className="navbar-bg w-full px-4 py-3 rounded-xl shadow-sm flex items-center justify-between mb-6 flex-wrap md:flex-nowrap transition-colors duration-300 relative">
      <div className="mb-3 md:mb-0">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--text-default)]">
          Panel de Control
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Bienvenido de nuevo, {isDesktop ? nombreCorto : getIniciales(nombreCompleto)}
        </p>
      </div>

      <div className="flex items-center space-x-4" ref={dropdownRef}>
        <ThemeToggleButton />

        <div className="relative">
          <Bell className="w-5 h-5 text-[var(--blue-main)] dark:text-[var(--btn-primary)]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
            3
          </span>
        </div>

        {/* Avatar + menú */}
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center space-x-2 bg-[var(--white)] dark:bg-[var(--blue-main)] px-3 py-1.5 rounded-lg shadow cursor-pointer transition-colors duration-300"
        >
          {userInfo?.foto_url ? (
            <img
              src={userInfo.foto_url}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--blue-main)] text-white flex items-center justify-center text-sm font-bold">
              {getIniciales(nombreCompleto)}
            </div>
          )}
          {isDesktop && (
            <span className="text-sm font-medium text-[var(--blue-main)] dark:text-white">
              {nombreCorto}
            </span>
          )}
          <ChevronDown className="w-4 h-4 text-[var(--blue-main)] dark:text-[var(--btn-primary)]" />
        </div>

        {menuOpen && (
          <div className="absolute right-0 top-16 w-48 rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
               style={{ backgroundColor: 'var(--white)', color: 'var(--text-default)' }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/");
              }}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-[var(--gray-hover)] dark:hover:bg-[var(--gray-hover)]"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir a Innova
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
