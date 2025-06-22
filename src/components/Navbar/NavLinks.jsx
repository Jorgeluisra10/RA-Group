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
  { label: "Mapa", path: "/mapa" },
];

export function DesktopLinks() {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex justify-center items-center space-x-6">
      {navItems.map(({ label, path }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={label}
            href={path}
            className={`relative cursor-pointer font-medium transition-all duration-200
              ${
                isActive
                  ? "text-[var(--btn-primary)]"
                  : "text-[var(--foreground)] dark:text-[var(--btn-secondary)]"
              }
              hover:text-[var(--btn-primary)]
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full
              after:transition-all after:duration-300 after:bg-[var(--btn-primary)]
              ${
                isActive
                  ? "after:w-full after:shadow-[0_0_6px_var(--btn-primary)]"
                  : "after:w-0 hover:after:w-full"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileLinks({ onClick }) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map(({ label, path }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={label}
            href={path}
            onClick={onClick}
            className={`relative cursor-pointer text-lg font-medium transition-all duration-200
              ${
                isActive
                  ? "text-[var(--btn-primary)]"
                  : "text-[var(--foreground)] dark:text-[var(--foreground)]"
              }
              hover:text-[var(--btn-primary)]
              after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:rounded-full
              after:transition-all after:duration-300 after:bg-[var(--btn-primary)]
              ${
                isActive
                  ? "after:w-full after:shadow-[0_0_6px_var(--btn-primary)]"
                  : "after:w-0 hover:after:w-full"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
