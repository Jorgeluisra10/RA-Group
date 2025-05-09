// app/admin/layout.jsx
"use client";
import Sidebar from "./(components)/Sidebar/Sidebar";
import Navbar from "./(components)/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
            },
            success: {
              iconTheme: {
                primary: "#3b82f6", // azul
                secondary: "#ffffff",
              },
            },
          }}
        />
      </main>
    </div>
  );
}
