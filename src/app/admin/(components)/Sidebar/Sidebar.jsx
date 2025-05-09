// components/Sidebar.jsx
"use client";

import {
  Home,
  Building,
  Users,
  Calendar,
  ClipboardList,
  DollarSign,
  BarChart2,
  Megaphone,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    title: "PRINCIPAL",
    links: [
      { label: "Panel Principal", icon: Home, href: "/admin" },
      { label: "Propiedades", icon: Building, href: "admin/propiedades" },
      { label: "Clientes", icon: Users, href: "admin/clientes" },
      { label: "Calendario", icon: Calendar, href: "admin/calendario" },
      { label: "Tareas", icon: ClipboardList, href: "admin/tareas" },
    ],
  },
  {
    title: "GESTIÓN",
    links: [
      { label: "Finanzas", icon: DollarSign, href: "admin/finanzas" },
      { label: "Reportes", icon: BarChart2, href: "admin/reportes" },
      { label: "Marketing", icon: Megaphone, href: "admin/marketing" },
    ],
  },
  {
    title: "CONFIGURACIÓN",
    links: [
      { label: "Ajustes", icon: Settings, href: "admin/ajustes" },
      { label: "Perfil", icon: User, href: "admin/perfil" },
      { label: "Cerrar sesión", icon: LogOut, href: "admin/logout" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="bg-[#0B1D3B] text-white h-screen w-64 p-5 flex flex-col space-y-8 overflow-y-auto">
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
  );
}
