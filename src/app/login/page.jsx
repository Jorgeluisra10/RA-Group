"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import RegisterForm from "./(components)/register";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) return;

      const userId = session.user.id;
      const { data: userInfo } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("id", userId)
        .single();

      if (userInfo) redirectByRole(userInfo.rol);
    };

    checkSessionAndRedirect();
  }, [router]);

  const redirectByRole = (rol) => {
    if (rol === "admin") router.replace("/admin");
    else if (rol === "agente") router.replace("/agente");
    else router.replace("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        if (loginError.message.includes("Email not confirmed")) {
          toast.error("Debes confirmar tu correo electrónico antes de iniciar sesión.", {
            icon: "📧",
            duration: 5000,
          });
        } else {
          toast.error("Credenciales incorrectas");
        }
        return;
      }

      const userId = loginData?.user?.id;
      if (!userId) {
        toast.error("No se pudo obtener el ID del usuario.");
        return;
      }

      const { data: userInfo } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("id", userId)
        .single();

      if (!userInfo) {
        toast.error("No se pudo obtener la información del usuario.");
        return;
      }

      redirectByRole(userInfo.rol);
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="bg-[var(--white)]/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "var(--text-default)" }}
        >
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <div className="w-16 h-1 mx-auto mb-6 bg-[var(--btn-primary)] rounded-full" />

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--text-default)" }}
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario@correo.com"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  background: "var(--white)",
                  color: "var(--text-default)",
                  borderColor: "var(--gray-border)",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--text-default)" }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  background: "var(--white)",
                  color: "var(--text-default)",
                  borderColor: "var(--gray-border)",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2`}
              style={{
                backgroundColor: "var(--btn-primary)",
                color: "var(--btn-secondary)",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Procesando..." : "Ingresar"}
            </button>
          </form>
        ) : (
          <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />
        )}

        <p
          className="text-sm text-center mt-6"
          style={{ color: "var(--gray-text)" }}
        >
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
            className="font-semibold underline transition-opacity duration-200"
            style={{
              color: "var(--btn-primary)",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
