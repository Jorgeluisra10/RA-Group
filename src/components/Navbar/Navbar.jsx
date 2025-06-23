"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ThemeToggleButton from "../Darkmode";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { DesktopLinks } from "./NavLinks";
import UserMenu from "./Sesion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

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
      const { data: sessionData } = await supabase.auth.getSession();
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
              <UserMenu user={user} userInfo={userInfo} isDesktop={true} />
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
