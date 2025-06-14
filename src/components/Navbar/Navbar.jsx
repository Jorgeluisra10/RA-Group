// components/Navbar/Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import UserMenu from "../Navbar/Sesion";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async (sessionUser = null) => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const currentUser = sessionUser || sessionData?.session?.user;
        if (!currentUser) {
          setUser(null);
          setUserInfo(null);
          return;
        }

        setUser(currentUser);

        const { data, error } = await supabase
          .from("usuarios")
          .select("nombre, rol")
          .eq("id", currentUser.id)
          .single();

        if (error || !data) {
          console.warn("⚠️ Usuario inválido o no encontrado.");
          await supabase.auth.signOut();
          setUser(null);
          setUserInfo(null);
          return;
        }

        setUserInfo(data);
        console.log("✅ Usuario autenticado:", data);
      } catch (err) {
        console.error("❌ Error en fetchUser:", err.message);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          // Logout
          setUser(null);
          setUserInfo(null);
        } else {
          // Login o cambio de sesión
          fetchUser(session.user);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Propiedades", path: "/propiedades" },
    { label: "Vehículos", path: "/vehiculos" },
    { label: "Quiero Vender", path: "/vender" },
    { label: "Sobre nosotros", path: "/sobre-nosotros" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-[#0F1C46]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2L2 7v11h6v-5h4v5h6V7l-8-5z" />
          </svg>
          <div className="text-2xl font-bold text-yellow-400">
            IM<span className="text-[#0F1C46]">NOVA</span> •
          </div>
        </div>

        {isDesktop ? (
          <div className="flex items-center space-x-6">
            {navItems.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className={`relative cursor-pointer text-gray-700 font-medium transition-all duration-200 hover:text-indigo-900
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400
                  after:transition-all after:duration-300
                  ${
                    pathname === path
                      ? "text-indigo-900 after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }`}
              >
                {label}
              </Link>
            ))}
            <UserMenu user={user} userInfo={userInfo} isDesktop={true} />
          </div>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            type="button"
            className="text-[#0F1C46]"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {!isDesktop && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className={`fixed right-0 top-0 z-50 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 border-b text-center">
              <span className="text-xl font-semibold text-[#0F1C46] w-full block">
                Menú
              </span>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center px-6 py-6 space-y-6">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                  className={`relative cursor-pointer text-lg text-gray-700 font-medium transition-all duration-200 hover:text-indigo-900
                    after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:bg-yellow-400
                    after:transition-all after:duration-300
                    ${
                      pathname === path
                        ? "text-indigo-900 after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }`}
                >
                  {label}
                </Link>
              ))}
              <UserMenu user={user} userInfo={userInfo} isDesktop={false} />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
