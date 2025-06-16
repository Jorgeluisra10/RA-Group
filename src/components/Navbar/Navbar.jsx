// components/Navbar/Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import UserMenu from "./Sesion";
import Logo from "./Logo";
import { DesktopLinks } from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggleButton from "../Navbar/Darkmode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
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
        if (!currentUser) return;

        setUser(currentUser);

        const { data, error } = await supabase
          .from("usuarios")
          .select("nombre, rol")
          .eq("id", currentUser.id)
          .single();

        if (error || !data) {
          await supabase.auth.signOut();
          setUser(null);
          setUserInfo(null);
          return;
        }

        setUserInfo(data);
      } catch (err) {}
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
          setUserInfo(null);
        } else {
          fetchUser(session.user);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 lg:px-10 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Links - solo en desktop */}
        {isDesktop && (
          <div className="flex-1 mx-10 flex justify-center">
            <DesktopLinks />
          </div>
        )}

        {/* Acciones a la derecha */}
        {isDesktop ? (
          <div className="flex-shrink-0 flex items-center gap-3">
            <ThemeToggleButton />
            <UserMenu user={user} userInfo={userInfo} isDesktop={true} />
          </div>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            type="button"
            className="ml-auto text-[#0F1C46]"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Menú móvil */}
      {!isDesktop && (
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          user={user}
          userInfo={userInfo}
        />
      )}
    </nav>
  );
}
