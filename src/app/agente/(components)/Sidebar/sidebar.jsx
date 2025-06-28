"use client";

import {
  Home,
  Car,
  Building,
  Users,
  Calendar,
  Settings,
  LogOut,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  {
    label: "Dashboard / Inicio",
    icon: Home,
    href: "/agente",
  },
  {
    label: "Mis Vehículos",
    icon: Car,
    href: "/agente/vehiculos",
  },
  {
    label: "Mis Propiedades",
    icon: Building,
    href: "/agente/propiedades",
  },
  {
    label: "Clientes derivados",
    icon: Users,
    href: "/agente/clientes",
  },
  {
    label: "Calendario",
    icon: Calendar,
    href: "/agente/calendario",
  },
  {
    label: "Configuración de perfil",
    icon: Settings,
    href: "/agente/perfil",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-[var(--blue-main)] p-2 rounded-md shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-full w-64 bg-[var(--sidebackground)] text-white p-5 flex flex-col justify-between overflow-y-auto transition-transform duration-300",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div>
          {/* Logo */}
          <div className="mb-8 flex items-center space-x-2 text-white text-xl font-bold">
            <span className="bg-[var(--btn-primary)] rounded-full p-1">
              <Home className="w-5 h-5 text-[var(--blue-main)]" />
            </span>
            <span className="text-white">IMNOBA</span>
          </div>

          {/* Navegación */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <item.icon className="w-5 h-5 text-[var(--btn-primary)]" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Botón especial */}
            <Link
              href="/admin/propiedades/nueva"
              className="mt-4 block text-center bg-[var(--btn-primary)] text-[var(--blue-main)] font-semibold py-2 rounded-md hover:bg-yellow-300 transition"
            >
              <div className="flex justify-center items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Subir Propiedad
              </div>
            </Link>
          </nav>
        </div>

        {/* Cerrar sesión */}
        <Link
          href="/admin/logout"
          onClick={() => setIsOpen(false)}
          className="mt-10 flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5 text-[var(--btn-primary)]" />
          <span>Cerrar sesión</span>
        </Link>
      </aside>
    </>
  );
}
