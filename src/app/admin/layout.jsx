// app/admin/layout.jsx
"use client";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Navbar />

        {children}
      </main>
    </div>
  );
}
