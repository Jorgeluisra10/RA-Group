"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import toast from "react-hot-toast";

export default function RegisterForm({ onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizePhone = (number) => number.replace(/\D/g, "");
  const isColombianPhone = (number) => /^3\d{9}$/.test(normalizePhone(number));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const telefonoLimpio = normalizePhone(telefono);

    if (
      !email.includes("@") ||
      password.length < 6 ||
      nombre.length < 2 ||
      !isColombianPhone(telefono)
    ) {
      toast.error("Verifica los campos. El teléfono debe ser colombiano (10 dígitos, empieza por 3).");
      setLoading(false);
      return;
    }

    try {
      const { data: registerData, error: registerError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nombre,
              telefono: telefonoLimpio,
            },
          },
        });

      if (registerError) {
        if (registerError.message.includes("User already registered")) {
          toast.error("Este correo ya está registrado. Inicia sesión.");
        } else {
          toast.error("Error al registrar usuario.");
        }
        return;
      }

      const userId = registerData.user?.id;
      if (!userId) {
        toast.error("No se pudo obtener el ID del nuevo usuario.");
        return;
      }

      let userConfirmed = false;
      for (let i = 0; i < 5; i++) {
        const { data: usuario } = await supabase
          .from("usuarios")
          .select("id")
          .eq("id", userId)
          .maybeSingle();

        if (usuario) {
          userConfirmed = true;
          break;
        }

        await new Promise((res) => setTimeout(res, 400));
      }

      if (!userConfirmed) {
        toast.error("El usuario aún no está confirmado. Intenta más tarde.");
        return;
      }

      toast.success("Registro exitoso. Confirma tu correo electrónico.");
      onRegisterSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6 px-4 sm:px-6 md:px-8 py-8 max-w-md mx-auto bg-[var(--background)] rounded-xl shadow-lg animate-fade-in-up">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-default)' }}>
          Nombre completo
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Juan Pérez"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            background: 'var(--white)',
            color: 'var(--text-default)',
            borderColor: 'var(--gray-border)',
            boxShadow: '0 0 0 0 transparent',
          }}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-default)' }}>
          Teléfono (Colombia)
        </label>
        <input
          id="telefono"
          type="tel"
          placeholder="3XXXXXXXXX"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            background: 'var(--white)',
            color: 'var(--text-default)',
            borderColor: 'var(--gray-border)',
          }}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-default)' }}>
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="usuario@correo.com"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            background: 'var(--white)',
            color: 'var(--text-default)',
            borderColor: 'var(--gray-border)',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-default)' }}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            background: 'var(--white)',
            color: 'var(--text-default)',
            borderColor: 'var(--gray-border)',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className={`relative overflow-hidden btn-shine w-full text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2`}
        style={{
          backgroundColor: 'var(--btn-primary)',
          color: 'var(--btn-secondary)',
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? "Procesando..." : "Registrarse"}
      </button>
    </form>
  );
}
