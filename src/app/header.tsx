"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/trayectoria/agregarEstudio");
    router.prefetch("/trayectoria/agregarExperiencia");
    router.prefetch("/trayectoria/agregarIdioma");
    router.prefetch("/trayectoria/agregarProduccion");
  }, [router]);

  return (
    <header className="bg-white flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Uni-doc</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/trayectoria/agregarEstudio">Agregar Estudio</Link>
          </li>
          <li>
            <Link href="/trayectoria/agregarExperiencia">Agregar Experiencia</Link>
          </li>
          <li>
            <Link href="/trayectoria/agregarIdioma">Agregar Idioma</Link>
          </li>
          <li>
            <Link href="/trayectoria/agregarProduccion">Agregar Producción</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
