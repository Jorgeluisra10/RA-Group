"use client";

import Image from "next/image";
import perfilImg from "../../images/Perfil-Luis-Rodriguez.jpg";

export default function Navbar() {
  return (
    <header className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tus propiedades y clientes</p>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={perfilImg}
          alt="admin"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">Luis Rodríguez</p>
          <p className="text-sm text-gray-500">Administrador</p>
        </div>
      </div>
    </header>
  );
}
