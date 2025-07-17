import Link from "next/link";
import React from "react";
import Image from "next/image";

interface FooterProps {
  children?: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-white w-full shadow-2xl">

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 py-4 text-center">
        <p>&copy; Mapa do Racismo. Todos os direitos reservados.</p>
      </div>

      <nav className="w-full px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Menu de navegação */}
        <ul className="flex flex-col md:flex-row items-center gap-4">
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
            <Link href="/ocorrences" className="transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
              Ocorrência
            </Link>
          </li>
          <li>
            <Link href="/Auth" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors">
              Cadastre-se
            </Link>
          </li>
        </ul>
      </nav>

      {/* Links do GitHub */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 py-4 text-center">
        <Link
          href="https://github.com/rogersoubr/mapa-do-racismo"
          className="flex flex-col items-center transition-colors hover:text-amber-400 font-medium"
        >
          <h2 className="mb-1">Back End</h2>
          <Image src="/github.svg" width={40} height={40} alt="GitHub Back-End" />
        </Link>

        <Link
          href="https://github.com/tereza713/front-mapa-racismo"
          className="flex flex-col items-center transition-colors hover:text-amber-400 font-medium"
        >
          <h2 className="mb-1">Front End</h2>
          <Image src="/github.svg" width={40} height={40} alt="GitHub Front-End" />
        </Link>
      </div>

      {children}
    </footer>
  );
}
