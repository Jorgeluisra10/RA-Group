"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import RegisterForm from "./(components)/register";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LfzQXQrAAAAAH6qRSK9dSKSakGXNeQJ8cDclyOy";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const captchaRef = useRef(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const { data: userInfo } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("id", session.user.id)
        .single();

      if (userInfo) redirectByRole(userInfo.rol);
    };

    checkSessionAndRedirect();
  }, []);

  const redirectByRole = (rol) => {
    if (rol === "admin") router.replace("/admin");
    else if (rol === "agente") router.replace("/agente");
    else router.replace("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!captchaValue) {
      toast.error("Por favor completa el CAPTCHA");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Credenciales incorrectas");
      setLoading(false);
      captchaRef.current?.reset();
      setCaptchaValue(null);
      return;
    }

    const userId = data.user.id;

    const { data: userInfo, error: infoError } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", userId)
      .single();

    if (infoError || !userInfo) {
      toast.error("No se encontró el rol del usuario.");
      setLoading(false);
      return;
    }

    redirectByRole(userInfo.rol);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) toast.error("Error al iniciar con Google");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Columna con imagen y texto (responsive: banner en mobile, columna en desktop) */}
      <div className="w-full md:w-1/2 h-56 md:h-auto relative flex items-center justify-center overflow-hidden">
        <img
          src="/images/colombia.png"
          alt="Colombia Imnoba"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--background-overlay)] backdrop-brightness-[0.5]" />
        <div className="relative z-10 text-center max-w-md px-6 py-6 md:px-8 md:py-0">
          <h1
            className="text-xl md:text-3xl font-bold mb-2 md:mb-4 leading-snug"
            style={{ color: "var(--text-hero, #ffffff)" }}
          >
            Descubrí tu próximo <br className="hidden md:block" /> hogar o
            vehículo
          </h1>
          <p
            className="text-sm md:text-base font-light"
            style={{ color: "var(--text-hero-secondary, #e5e7eb)" }}
          >
            Las mejores oportunidades <br className="block md:hidden" />
            inmobiliarias y automotrices te esperan
          </p>
        </div>
      </div>

      {/* Columna derecha con formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-[var(--white)] p-8 sm:p-10 rounded-2xl shadow-2xl animate-fade-in-up">
          <h2
            className="text-2xl font-bold text-center mb-1"
            style={{ color: "var(--text-default)" }}
          >
            Bienvenido a Imnoba
          </h2>
          <p
            className="text-sm text-center mb-6"
            style={{ color: "var(--gray-text)" }}
          >
            Tu lugar para encontrar lo que buscas
          </p>
{/* 
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-sm font-medium mb-6 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            Continuar con Google
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span>•</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div> */}

          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-6 text-sm font-medium border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-2 ${
                isLogin
                  ? "text-[var(--text-default)] border-b-2 border-[var(--btn-primary)]"
                  : "text-gray-400"
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-2 ${
                !isLogin
                  ? "text-[var(--text-default)] border-b-2 border-[var(--btn-primary)]"
                  : "text-gray-400"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formularios */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-default)" }}
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    background: "var(--white)",
                    color: "var(--text-default)",
                    borderColor: "var(--gray-border)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-default)" }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    background: "var(--white)",
                    color: "var(--text-default)",
                    borderColor: "var(--gray-border)",
                  }}
                />
              </div>

              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={(val) => setCaptchaValue(val)}
                ref={captchaRef}
              />

              <button
                type="submit"
                disabled={loading || !captchaValue}
                className="w-full text-sm font-semibold py-3 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2"
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
    </div>
  );
}
