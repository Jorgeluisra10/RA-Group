"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import perfilImg from "../../images/Perfil-Luis-Rodriguez.jpg";

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }

    handleResize(); // Detecta tamaño al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="relative flex justify-center md:justify-between items-start mb-6 min-h-[56px] flex-wrap md:flex-nowrap">
      {/* Texto centrado en móvil, alineado a la izquierda en desktop */}
      <div className="w-full text-center md:text-left md:w-auto mb-4 md:mb-0">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tus propiedades y clientes</p>
      </div>

      {/* Imagen y texto admin */}
      <div className="absolute top-0 right-0 mt-1 mr-1 md:static md:ml-4 md:mt-0 flex items-center space-x-2">
        <Image
          src={perfilImg}
          alt="admin"
          width={40}
          height={40}
          className="rounded-full"
        />
        {isDesktop && (
          <div className="flex flex-col">
            <p className="font-semibold">Luis Rodríguez</p>
            <p className="text-sm text-gray-500">Administrador</p>
          </div>
        )}
      </div>
    </header>
  );
}
