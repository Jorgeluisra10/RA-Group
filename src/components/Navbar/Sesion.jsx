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
          className="px-4 py-2 border border-yellow-400 text-[#0F1C46] font-semibold rounded-md hover:bg-yellow-100 transition"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-yellow-400 text-[#0F1C46] font-semibold rounded-md hover:bg-yellow-500 transition"
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
  return (
    <div className="flex flex-col gap-2 mt-4 text-[#0F1C46] text-sm animate-fade-in-up">
      <hr />
      {isUsuario ? (
        <>
          <Link href="/perfil" onClick={() => setShowMenu(false)}>
            Mi cuenta
          </Link>
          <Link href="/me-gusta/propiedades" onClick={() => setShowMenu(false)}>
            Mis propiedades
          </Link>
          <Link href="/me-gusta/vehiculos" onClick={() => setShowMenu(false)}>
            Mis vehículos
          </Link>
        </>
      ) : (
        panelLink && <Link href={panelLink}>Volver a mi panel</Link>
      )}
      <button
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
