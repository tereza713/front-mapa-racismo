"use client"
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "@/context/authContext";

export default function Header() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { usuario, isLoading } = auth;

  return (
    <header className="bg-zinc-900 text-white shadow-2xl w-full flex flex-row justify-around items-center ">
      <Image src="/BLM.svg" width={40} height={40} alt="GitHub Back-End"></Image>
      <nav className="w-full px-4 py-3 flex flex-col md:flex-row items-center justify-end gap-4">
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
            <Link href="/occurrences" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Ocorrência
            </Link>
          </li>
          <li>
            <Link href="/Auth/login" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors">
              {isLoading ? "Carregando..." : usuario?.email ?? "Login"}
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
