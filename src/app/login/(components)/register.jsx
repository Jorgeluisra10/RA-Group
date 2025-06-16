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

  const isColombianPhone = (number) => /^3\d{9}$/.test(number);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

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
              telefono,
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

      // Esperar a que el trigger procese la creación en "usuarios"
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
    <form onSubmit={handleRegister} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
          Nombre completo
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Juan Pérez"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className="block text-gray-700 font-medium mb-1">
          Teléfono (Colombia)
        </label>
        <input
          id="telefono"
          type="tel"
          placeholder="3XXXXXXXXX"
          pattern="^3\d{9}$"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="usuario@correo.com"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-500"
        }`}
      >
        {loading ? "Procesando..." : "Registrarse"}
      </button>
    </form>
  );
}
