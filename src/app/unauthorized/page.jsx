"use client";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)] text-[var(--text-default)]">
      <div className="text-center max-w-md bg-[var(--white)] dark:bg-[var(--sidebackground)] text-[var(--text-default)] p-8 rounded-2xl shadow-xl border border-[var(--btn-primary)] animate-fade-in-up space-y-5">
        <h1 className="text-4xl font-bold text-red-600">🚫 ¡Alto ahí!</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Parece que intentaste entrar a la zona secreta...
        </p>
        <p className="font-semibold text-[var(--text-default)]">
          Si deberías estar aquí, pídele permiso al jefe... o al sistema.
        </p>
        <p className="font-semibold text-[var(--text-default)]">
          Puedes volver al tu panel de USUARIO aqui abajo 😘
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 rounded-md font-semibold bg-[var(--btn-primary)] text-black shadow hover:scale-105 transition btn-shine relative overflow-hidden"
        >
          Volver al inicio 🏡
        </a>
      </div>
    </div>
  );
}
