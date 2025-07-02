"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Ajusta el path si es necesario

export default function AuthGate({ children, redirectIfNotAuthenticated = false, redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && redirectIfNotAuthenticated && !user) {
      router.push(redirectTo);
    }
  }, [loading, user, redirectIfNotAuthenticated, redirectTo, router]);

  if (loading) {
    return (
      <div className="w-full py-10 text-center text-sm text-gray-500 animate-pulse">
        Cargando sesión...
      </div>
    );
  }

  if (!user && redirectIfNotAuthenticated) {
    return null; // Redirigiendo
  }

  return children;
}
