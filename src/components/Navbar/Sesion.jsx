"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Star, Car } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserMenu({ isDesktop }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const { user, userInfo, loading, signOut } = useAuth();

  const handleLogout = async () => {
    if (loadingLogout) return;
    try {
      setLoadingLogout(true);
      await signOut();
      window.location.href = "/"; // Para refrescar completamente el estado
      setShowMenu(false);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setLoadingLogout(false);
    }
  };

  const getInitials = () => {
    const nombre = userInfo?.nombre || "";
    const apellido = userInfo?.apellido || "";
    return `${nombre[0] || ""}${apellido[0] || ""}`.toUpperCase();
  };

  const isUsuario = userInfo?.rol === "usuario";
  const panelLink =
    userInfo?.rol === "admin"
      ? "/admin"
      : userInfo?.rol === "agente"
      ? "/agente"
      : null;

  if (loading) {
    // NO mostrar nada (o loader) mientras carga el estado de autenticación
    return null;
  }

  if (!user || !userInfo) {
    console.log("No hay usuario o info", { user, userInfo });
    // Usuario no autenticado y carga ya terminó, mostrar opciones login/register
    return (
      <div className="flex gap-2 items-center">
        <Link
          href="/login"
          className="relative group px-5 py-2 rounded-md border-2 text-sm overflow-hidden transition-all duration-300 btn-shine"
          style={{
            borderColor: "var(--btn-primary)",
            color: "var(--btn-secondary)",
            backgroundColor: "transparent",
          }}
        >
          <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            Iniciar Sesión
          </span>
          <div
            className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"
            style={{ backgroundColor: "rgba(253, 199, 0, 0.15)" }}
          ></div>
          <div className="absolute inset-0 rounded-md group-hover:shadow-[0_0_12px_3px_rgba(253,199,0,0.4)] transition-all duration-500"></div>
        </Link>
        <Link
          href="/login?view=register"
          className="relative group px-5 py-2 rounded-md text-sm font-semibold overflow-hidden transition-all duration-300 btn-shine"
          style={{
            backgroundColor: "var(--btn-primary)",
            color: "#000000",
          }}
        >
          <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            Registrarse
          </span>
          <div
            className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
            style={{ backgroundColor: "rgba(253, 199, 0, 0.3)" }}
          ></div>
          <div className="absolute inset-0 rounded-md group-hover:shadow-[0_0_16px_5px_rgba(253,199,0,0.4)] transition-all duration-500"></div>
        </Link>
      </div>
    );
  }

  // Usuario autenticado - muestra menú

  if (isDesktop) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full bg-yellow-400 text-[#0F1C46] font-bold flex items-center justify-center uppercase shadow-md transition-transform hover:scale-105"
          aria-label="Abrir menú de usuario"
        >
          {getInitials()}
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 z-50 animate-fade-in-up">
            <div className="mb-3">
              <p className="font-semibold text-gray-800">
                {userInfo.nombre} {userInfo.apellido}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
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
              disabled={loadingLogout}
              className={`flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium mt-2 transition ${
                loadingLogout ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <LogOut size={16} />
              {loadingLogout ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Vista mobile o tablet

  return (
    <div className="mt-6 space-y-4 text-[#0F1C46] text-[15px] animate-fade-in-up">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-yellow-400 text-[#0F1C46] font-bold flex items-center justify-center uppercase shadow-md">
          {getInitials()}
        </div>
        <div className="text-left">
          <p className="font-semibold leading-4">
            {userInfo.nombre} {userInfo.apellido}
          </p>
          <p className="text-[13px] text-gray-500 leading-4">{user.email}</p>
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
          disabled={loadingLogout}
          className={`flex items-center gap-2 text-red-600 hover:text-red-800 transition ${
            loadingLogout ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <LogOut size={18} className="text-red-500" />
          {loadingLogout ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}
