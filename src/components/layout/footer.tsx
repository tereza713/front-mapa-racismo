
import Link from "next/link";
import React from "react";
import github from "../../../public/github.svg"


interface FooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <footer>
      <nav className="bg-zinc-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <ul className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo/Brand pode vir aqui ou como children */}
            {children && (
              <li className="mr-auto">
                {children}
              </li>
            )}

            <ul className="flex gap-4">
              <p>&copy; Mapa do Racismo. Todos os direitos reservados.</p>
            </ul>

            <div className="flex flex-1 items-center justify-end gap-8">
              <li>
                <Link href="/" className="nav-link transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
                  Início
                </Link>
              </li>

              <li>
                <Link href="/typeRacism" className="nav-link transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
                  Tipos de Racismo
                </Link>
              </li>

              <li>
                <Link href="/locations" className="nav-link transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
                  Localização
                </Link>
              </li>

              <li>
                <Link href="/denounce" className="nav-link transition-colors hover:text-amber-400 px-3 py-2 rounded-lg font-medium">
                  Ocorrência
                </Link>
              </li>

              <li>
                <Link href="/login" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors">
                  Cadastre 
                </Link>
              </li>
            </div>
            </ul>
        </div>
            </nav>
            <div className="bg-zinc-950 text-white shadow-lg container mx-auto px-4 py-3">
              <li>
                <Link href="https://github.com/rogersoubr/mapa-do-racismo" className="text-align: center  content-center nav-link transition-colors hover:text-amber-400 rounded-lg font-medium">
                  Back-End
                </Link>
              </li>

              <li>
                <Link href="https://github.com/tereza713/front-mapa-racismo" className=" nav-link transition-colors hover:text-amber-400 rounded-lg font-medium">
                  Front-End
                </Link>
              </li>
              </div>
    </footer>
  );
}
