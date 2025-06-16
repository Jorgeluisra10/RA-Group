// components/Navbar/NavLinks.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Propiedades", path: "/propiedades" },
  { label: "Vehículos", path: "/vehiculos" },
  { label: "Quiero Vender", path: "/vender" },
  { label: "Sobre nosotros", path: "/sobre-nosotros" },
  { label: "Blog", path: "/Blog" },
];

export function DesktopLinks() {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex justify-center items-center space-x-6">
      {navItems.map(({ label, path }) => (
        <Link
          key={label}
          href={path}
          className={`relative cursor-pointer font-medium transition-all duration-200
            text-gray-700 hover:text-indigo-900
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
    </div>
  );
}

export function MobileLinks({ onClick }) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map(({ label, path }) => (
        <Link
          key={label}
          href={path}
          onClick={onClick}
          className={`relative cursor-pointer text-lg font-medium transition-all duration-200
            text-gray-700 hover:text-indigo-900
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
    </>
  );
}
