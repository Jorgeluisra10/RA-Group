'use client';

export default function Navbar() {
  return (
    <header className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tus propiedades y clientes</p>
      </div>
      <div className="flex items-center space-x-2">
        <img src="/avatar.png" alt="admin" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">Alejandro Méndez</p>
          <p className="text-sm text-gray-500">Administrador</p>
        </div>
      </div>
    </header>
  );
}
