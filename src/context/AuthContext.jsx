"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const AuthContext = createContext({
  user: null,
  userInfo: null,
  loadingSession: true,
  userInfoLoading: false,
  signOut: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(false);

  const fetchUserInfo = useCallback(
    async (userId) => {
      setUserInfoLoading(true);
      try {
        const { data: userData, error: userError } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", userId)
          .single();

        if (userData && !userError) {
          setUserInfo(userData);
          return;
        }

        const { data: agenteData, error: agenteError } = await supabase
          .from("agentes")
          .select("*")
          .eq("id", userId)
          .single();

        if (agenteData && !agenteError) {
          setUserInfo(agenteData);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("❌ Error al obtener info del usuario:", error);
        setUserInfo(null);
      } finally {
        setUserInfoLoading(false);
      }
    },
    [supabase]
  );

  const loadSession = useCallback(async () => {
    setLoadingSession(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      let sessionUser = sessionData?.session?.user;

      if (!sessionUser) {
        const { data: userData } = await supabase.auth.getUser();
        sessionUser = userData?.user;
      }

      if (sessionUser) {
        console.log("✅ Sesión activa:", sessionUser.email);
        setUser(sessionUser);
        fetchUserInfo(sessionUser.id); // no se espera, permite render no bloqueante
      } else {
        setUser(null);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("❌ Error al cargar sesión:", error);
      setUser(null);
      setUserInfo(null);
    } finally {
      setLoadingSession(false);
    }
  }, [supabase, fetchUserInfo]);

  useEffect(() => {
    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("🔁 Cambio de sesión:", _event);
        setLoadingSession(true);

        if (session?.user) {
          setUser(session.user);
          fetchUserInfo(session.user.id); // sin bloqueo
        } else {
          setUser(null);
          setUserInfo(null);
        }

        setLoadingSession(false);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, [loadSession, supabase, fetchUserInfo]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserInfo(null);
    } catch (error) {
      console.error("❌ Error cerrando sesión:", error);
    }
  };

  const refreshUser = async () => {
    await loadSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loadingSession,
        userInfoLoading,
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