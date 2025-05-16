"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-yellow-600">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Iniciar sesión
          <div className="w-16 h-1 mx-auto mt-2 bg-yellow-400 rounded-full" />
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-6"
        >
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
            />
          </div>

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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
