"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggleButton from "../Darkmode";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { DesktopLinks } from "./NavLinks";
import UserMenu from "./Sesion";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { user, userInfo } = useAuth(); // ✅ Contexto ya proporciona todo

  // Bloquea scroll al abrir menú móvil
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  // Detecta si está en vista escritorio
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 shadow-md backdrop-blur-xl navbar-bg">
        <div className="max-w-7xl mx-auto px-10 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {isDesktop && (
            <div className="flex-1 mx-10 flex justify-center">
              <DesktopLinks />
            </div>
          )}

          {isDesktop ? (
            <div className="flex-shrink-0 flex items-center gap-3">
              <ThemeToggleButton />
              <UserMenu isDesktop={true} />
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              type="button"
              className="ml-auto icon-color transition-colors"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </nav>

      {!isDesktop && (
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          user={user}
          userInfo={userInfo}
        />
      )}
    </>
  );
}
