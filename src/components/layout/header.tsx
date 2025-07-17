"use client"
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";

export default function Header() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { usuario, isLoading } = auth;

  return (
    <header className="bg-zinc-900 text-white shadow-2xl w-full ">
      <nav className="w-full px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Usuário ou Carregando */}
        <div className="text-amber-400 font-medium">
          {isLoading ? "Carregando..." : usuario?.email ?? "Faça login"}
        </div>

        {/* Menu responsivo */}
        <ul className="flex flex-col md:flex-row items-center gap-4 ">
          <li>
            <Link href="/" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Início
            </Link>
          </li>
          <li>
            <Link href="/typeRacism" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Tipos de Racismo
            </Link>
          </li>
          <li>
            <Link href="/locations" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Localização
            </Link>
          </li>
          <li>
            <Link href="/denounce" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Ocorrência
            </Link>
          </li>
          <li>
            <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors">
              Login
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
