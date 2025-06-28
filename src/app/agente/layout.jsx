"use client";

import Sidebar from "./(components)/Sidebar/sidebar";
import Navbar from "./(components)/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../../components/PrivateRoute";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserAndInfo = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) return;

      const userId = session.user.id;
      setUser(session.user); // <- Guardamos el usuario

      // Usamos el ID del usuario para buscar en la tabla agentes
      const { data: agenteData, error: agenteError } = await supabase
        .from("agentes")
        .select("*")
        .eq("id", userId)
        .single();

      if (agenteError) {
        console.error("Error al obtener agente:", agenteError);
        setUserInfo(null);
      } else {
        setUserInfo(agenteData);
      }
    };

    fetchUserAndInfo();
  }, []);

  return (
    <PrivateRoute requiredRole="agente">
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
    </PrivateRoute>
  );
}
