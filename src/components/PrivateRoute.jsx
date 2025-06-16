"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function PrivateRoute({ children, requiredRole }) {
  const [status, setStatus] = useState("loading"); // 'loading' | 'unauthorized' | 'authorized'
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.replace("/login");
        return;
      }

      const { id: userId } = session.user;

      const { data: userInfo, error: userError } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("id", userId)
        .single();

      if (userError || !userInfo) {
        router.replace("/login");
        return;
      }

      const userRole = userInfo.rol;

      if (!requiredRole || userRole === requiredRole) {
        setStatus("authorized");
      } else {
        router.replace("/");
      }
    };

    checkAccess();
  }, [requiredRole, router]);

  if (status === "loading") {
    return <p className="p-4 text-center">Cargando...</p>;
  }

  if (status === "unauthorized") {
    return null;
  }

  return children;
}
