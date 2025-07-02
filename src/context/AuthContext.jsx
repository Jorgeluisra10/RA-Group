"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const AuthContext = createContext({
  user: null,
  userInfo: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async (userId) => {
    try {
      const { data: usuarioData } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", userId)
        .single();

      if (usuarioData) {
        setUserInfo(usuarioData);
        return;
      }

      const { data: agenteData } = await supabase
        .from("agentes")
        .select("*")
        .eq("id", userId)
        .single();

      if (agenteData) {
        setUserInfo(agenteData);
      } else {
        setUserInfo(null);
      }
    } catch (err) {
      console.error("❌ Error al obtener info del usuario:", err);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      let sessionUser = sessionData?.session?.user;

      // fallback por si getSession aún no devuelve el usuario tras recarga
      if (!sessionUser) {
        const { data: userData } = await supabase.auth.getUser();
        sessionUser = userData?.user;
      }

      if (sessionUser) {
        console.log("✅ Sesión activa al iniciar:", sessionUser.email);
        setUser(sessionUser);
        await fetchUserInfo(sessionUser.id);
      } else {
        console.log("⚠️ No hay sesión activa al iniciar");
        setUser(null);
        setUserInfo(null);
      }

      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔁 onAuthStateChange:", event, session);
        setLoading(true);

        if (session?.user) {
          setUser(session.user);
          await fetchUserInfo(session.user.id);
        } else {
          setUser(null);
          setUserInfo(null);
        }

        setLoading(false);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserInfo(null);
    } catch (err) {
      console.error("❌ Error cerrando sesión:", err);
    }
  };

  const refreshUser = async () => {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    let sessionUser = sessionData?.session?.user;

    if (!sessionUser) {
      const { data: userData } = await supabase.auth.getUser();
      sessionUser = userData?.user;
    }

    if (sessionUser) {
      setUser(sessionUser);
      await fetchUserInfo(sessionUser.id);
    } else {
      setUser(null);
      setUserInfo(null); // importante para evitar estados fantasmas
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
