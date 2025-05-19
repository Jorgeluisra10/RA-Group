"use client";

import {
  Home,
  Building,
  Car,
  Users,
  Calendar,
  ClipboardList,
  DollarSign,
  BarChart2,
  Megaphone,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  {
    title: "PRINCIPAL",
    links: [
      { label: "Panel Principal", icon: Home, href: "/admin" },
      { label: "Propiedades", icon: Building, href: "/admin/propiedades" },
      { label: "Carros", icon: Car, href: "/admin/carros" },
      { label: "Clientes", icon: Users, href: "/admin/clientes" },
      { label: "Calendario", icon: Calendar, href: "/admin/calendario" },
      { label: "Tareas", icon: ClipboardList, href: "/admin/tareas" },
    ],
  },
  {
    title: "GESTIÓN",
    links: [
      { label: "Finanzas", icon: DollarSign, href: "/admin/finanzas" },
      { label: "Reportes", icon: BarChart2, href: "/admin/reportes" },
      { label: "Marketing", icon: Megaphone, href: "/admin/marketing" },
    ],
  },
  {
    title: "CONFIGURACIÓN",
    links: [
      { label: "Ajustes", icon: Settings, href: "/admin/ajustes" },
      { label: "Perfil", icon: User, href: "/admin/perfil" },
      { label: "Cerrar sesión", icon: LogOut, href: "/admin/logout" },
    ],
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
          className="text-white bg-[#0B1D3B] p-2 rounded-md shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-full w-64 bg-[#0B1D3B] text-white p-5 flex flex-col space-y-8 overflow-y-auto transition-transform duration-300",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="text-2xl font-bold text-yellow-400">
          RA<span className="text-white">Group</span> •
        </div>

        <nav className="flex flex-col space-y-6 text-sm">
          {navItems.map((section) => (
            <div key={section.title}>
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-white/10 transition"
                      onClick={() => setIsOpen(false)} // Cierra menú al hacer clic
                    >
                      <link.icon className="w-4 h-4 mr-2" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
