"use client";

import Sidebar from "./(components)/Sidebar/Sidebar";
import Navbar from "./(components)/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:pl-64">
          <main className="p-6">
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
                    primary: "#3b82f6",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </main>
        </div>
      </div>
  );
}
