"use client";

import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const [doorClosed, setDoorClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDoorClosed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)] text-[var(--text-default)] relative overflow-hidden"
      aria-label="Acceso denegado"
    >
      {/* Contenedor principal */}
      <section
        className="text-center max-w-md bg-[var(--white)] dark:bg-[var(--sidebackground)] text-[var(--text-default)] p-10 rounded-3xl shadow-xl border border-[var(--btn-primary)] animate-fade-in-up space-y-6 relative z-10 select-none"
        role="alert"
      >
        <h1 className="text-5xl font-extrabold text-red-600 drop-shadow-lg">
          🚫 ¡Alto ahí, intrépido aventurero!
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          Parece que intentaste entrar a la zona secreta... <br />
          Pero el sistema dice: <strong>"Ni lo sueñes, crack".</strong>
        </p>
        <p className="font-semibold text-[var(--text-default)] text-lg">
          Si deberías estar aquí, pídele permiso al jefe, al sistema, <br /> o
          mejor envía un meme épico y a ver si te dejan pasar.
        </p>
        <p className="font-semibold text-[var(--text-default)] text-lg">
          Mientras tanto, puedes volver a tu cómodo y seguro panel de USUARIO.
          😘
        </p>

        <a
          href="/"
          aria-label="Volver al inicio"
          className="relative inline-block mt-6 px-8 py-3 rounded-xl font-bold bg-[var(--btn-primary)] text-black shadow-lg hover:scale-110 transition-transform duration-300 btn-shine overflow-hidden group"
          title="Click aquí para salvar tu pellejo"
        >
          Volver al inicio 🏡
          {/* Brillo animado extra */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-400 to-yellow-200 opacity-30 rounded-full blur-2xl transform translate-x-[-50%] translate-y-[-50%] group-hover:animate-pulse"
          />
        </a>
      </section>

      {/* Puerta 3D animada */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[var(--sidebackground)] border-l-4 border-[var(--btn-primary)] origin-left transform transition-transform duration-[2500ms] ease-in-out ${
          doorClosed ? "rotate-y-90 scale-x-0" : "rotate-y-0 scale-x-100"
        }`}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      />

      {/* Llama bailarina con lentes */}
      <div className="absolute bottom-12 right-12 w-24 h-36 pointer-events-none select-none z-30 drop-shadow-xl">
        <svg
          viewBox="0 0 64 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-flame-bounce"
          style={{ filter: "drop-shadow(0 0 6px #fdc700)" }}
          role="img"
          aria-label="Llama bailarina con lentes"
        >
          {/* Cuerpo llama con degradado de fuego */}
          <path
            d="M32 96C45 70 56 50 56 30C56 10 40 0 32 0C24 0 8 10 8 30C8 50 19 70 32 96Z"
            fill="url(#flameGradient)"
          />
          {/* Lentes con animación de parpadeo */}
          <rect
            x="16"
            y="40"
            width="32"
            height="12"
            rx="6"
            ry="6"
            fill="#0f1c46"
            stroke="#fdc700"
            strokeWidth="3"
            className="animate-flame-glow"
          />
          <line
            x1="16"
            y1="46"
            x2="48"
            y2="46"
            stroke="#fdc700"
            strokeWidth="2"
            className="animate-flame-glow"
          />
          <line
            x1="24"
            y1="40"
            x2="24"
            y2="52"
            stroke="#fdc700"
            strokeWidth="2"
            className="animate-flame-glow"
          />
          <line
            x1="40"
            y1="40"
            x2="40"
            y2="52"
            stroke="#fdc700"
            strokeWidth="2"
            className="animate-flame-glow"
          />
          <defs>
            <linearGradient
              id="flameGradient"
              x1="32"
              y1="0"
              x2="32"
              y2="96"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fdc700" />
              <stop offset="1" stopColor="#ff6600" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        @keyframes flame-flicker {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-6px) scale(1.07);
            opacity: 0.85;
          }
        }
        .animate-flame-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            stroke-opacity: 1;
          }
          50% {
            stroke-opacity: 0.5;
          }
        }
        .animate-flame-bounce {
          animation: flame-flicker 1.6s ease-in-out infinite;
          transform-origin: bottom center;
        }

        @keyframes door-rotate {
          0% {
            transform: rotateY(0deg) scaleX(1);
          }
          100% {
            transform: rotateY(90deg) scaleX(0);
          }
        }
        .rotate-y-90 {
          transform: rotateY(90deg) scaleX(0);
        }

        /* Efecto brillo botón */
        .btn-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: none;
          pointer-events: none;
          z-index: 20;
        }
        .btn-shine:hover::before {
          animation: shine 0.9s forwards;
        }
        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
      `}</style>
    </main>
  );
}
