"use client";

import Sidebar from "./(components)/Sidebar/sidebar";
import Navbar from "./(components)/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, userInfo, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">
          Cargando sesión...
        </p>
      </div>
    );
  }

  // // Solo cuando loading termina:
  // if (!user || !userInfo) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p className="text-lg font-semibold text-red-600">
  //         No tienes acceso a esta sección
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-default)] font-sans transition-colors duration-300">
        <Sidebar />
        <div className="md:pl-64">
          <main className="p-6">
            <Navbar user={user} userInfo={userInfo} />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "var(--blue-main)",
                  color: "var(--btn-primary)",
                  borderRadius: "10px",
                  fontFamily: "Poppins, sans-serif",
                },
                success: {
                  iconTheme: {
                    primary: "#fdc700",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
