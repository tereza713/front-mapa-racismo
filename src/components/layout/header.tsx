import React from "react";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-zinc-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <ul className="flex flex-wrap items-center justify-between gap-6">
            {/* Logo/Brand pode vir aqui ou como children */}
            {children && (
               <li className="mr-auto">
                  {children}
               </li>
            )}
            
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
                     Login
                  </Link>
               </li>
            </div>
         </ul>
      </nav>
    </header>
  );
}