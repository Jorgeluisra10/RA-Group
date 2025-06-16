"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Star, Car } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function UserMenu({ user, userInfo, isDesktop }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    console.log("🔒 Cerrar sesión iniciado");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Error al cerrar sesión:", error.message);
    } else {
      console.log("✅ Sesión cerrada con éxito");
      setShowMenu(false);
      router.refresh(); // Si usás App Router
      router.push("/");
    }
  };

  const getInitials = () => {
    const nombre = userInfo?.nombre || "U";
    const apellido = userInfo?.apellido || "";
    return `${nombre[0] || ""}${apellido[0] || ""}`.toUpperCase();
  };

  const isUsuario = userInfo?.rol === "usuario";
  const panelLink =
    userInfo?.rol === "admin"
      ? "/admin"
      : userInfo?.rol === "agente"
      ? "/dashboard-agente"
      : null;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link
          href="/login"
          className="px-4 py-1.5 border-2 border-yellow-500 text-[#0F1C46] font-medium rounded-md hover:bg-yellow-50 transition"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/login"
          className="px-4 py-1.5 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  // Desktop Dropdown
  if (isDesktop) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full bg-yellow-400 text-[#0F1C46] font-bold flex items-center justify-center uppercase shadow-md transition-transform hover:scale-105"
        >
          {getInitials()}
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 z-50 animate-fade-in-up">
            <div className="mb-3">
              <p className="font-semibold text-gray-800">
                {userInfo?.nombre} {userInfo?.apellido}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <hr className="my-2" />

            <ul className="space-y-2 text-sm text-gray-700">
              {isUsuario ? (
                <>
                  <li className="flex items-center gap-2 hover:text-[#0F1C46] transition">
                    <Star size={16} />
                    <Link
                      href="/me-gusta/propiedades"
                      onClick={() => setShowMenu(false)}
                    >
                      Mis propiedades
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#0F1C46] transition">
                    <Car size={16} />
                    <Link
                      href="/me-gusta/vehiculos"
                      onClick={() => setShowMenu(false)}
                    >
                      Mis vehículos
                    </Link>
                  </li>
                  <li className="flex items-center gap-2 hover:text-[#0F1C46] transition">
                    <User size={16} />
                    <Link href="/perfil" onClick={() => setShowMenu(false)}>
                      Mi cuenta
                    </Link>
                  </li>
                </>
              ) : (
                panelLink && (
                  <li className="flex items-center gap-2 hover:text-[#0F1C46] transition">
                    <User size={16} />
                    <Link href={panelLink} onClick={() => setShowMenu(false)}>
                      Volver a mi panel
                    </Link>
                  </li>
                )
              )}
            </ul>

            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium mt-2 transition"
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  // Mobile Menu
  // Mobile Menu
  return (
    <div className="mt-6 space-y-4 text-[#0F1C46] text-[15px] animate-fade-in-up">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-yellow-400 text-[#0F1C46] font-bold flex items-center justify-center uppercase shadow-md">
          {getInitials()}
        </div>
        <div className="text-left">
          <p className="font-semibold leading-4">
            {userInfo?.nombre} {userInfo?.apellido}
          </p>
          <p className="text-[13px] text-gray-500 leading-4">{user?.email}</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-3 px-4">
        {isUsuario ? (
          <>
            <Link
              href="/me-gusta/propiedades"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-3 hover:text-[#0F1C46]"
            >
              <Star size={18} className="text-yellow-500" />
              Mis propiedades con Me Gusta
            </Link>
            <Link
              href="/me-gusta/vehiculos"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-3 hover:text-[#0F1C46]"
            >
              <Car size={18} className="text-blue-500" />
              Mis vehículos con Me Gusta
            </Link>
            <Link
              href="/perfil"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-3 hover:text-[#0F1C46]"
            >
              <User size={18} className="text-gray-500" />
              Mi cuenta
            </Link>
          </>
        ) : (
          panelLink && (
            <Link
              href={panelLink}
              className="flex items-center gap-3 hover:text-[#0F1C46]"
            >
              <User size={18} className="text-gray-500" />
              Volver a mi panel
            </Link>
          )
        )}
      </div>

      <hr className="border-gray-200" />

      <div className="px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
        >
          <LogOut size={18} className="text-red-500" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
