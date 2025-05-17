"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient"; // asegúrate que este path sea correcto

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    // Verifica si hay una sesión activa
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    };

    getUser();

    // Escucha cambios de sesión (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          router.push("/login");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, [router]);

  if (user === undefined) return <p>Cargando...</p>;
  return children;
}
