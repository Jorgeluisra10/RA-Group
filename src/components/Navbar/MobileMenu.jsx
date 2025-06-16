// components/Navbar/MobileMenu.jsx
import { X } from "lucide-react";
import { MobileLinks } from "./NavLinks";
import UserMenu from "./Sesion";
import ThemeToggleButton from "../Navbar/Darkmode";

export default function MobileMenu({ open, onClose, user, userInfo }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed right-0 top-0 z-50 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 border-b text-center">
          <span className="text-xl font-semibold text-[#0F1C46] w-full block">
            Menú
          </span>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center px-6 py-6 space-y-6">
          <MobileLinks onClick={onClose} />
          <div className="w-full border-t border-gray-200 my-4"></div>
          <UserMenu user={user} userInfo={userInfo} isDesktop={false} />
          <ThemeToggleButton />
        </div>
      </div>
    </>
  );
}
