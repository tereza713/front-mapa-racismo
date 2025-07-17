'use client'
import Header from "@/components/layout/header";
import Link from "next/link";

export default function OccurrencesPage() {
  return (
    <>
    <Header> {/*cria os elementos para a header desta página*/}
        <ul className="flex flex-col items-center gap-2 text-lg text-neutral-100 sm:text-sm sm:p-4 sm:flex-row">
          <li>
            <Link href="/" className="transition hover:text-neutral-400 duration-300 ease-in-out">Início</Link>
          </li>
          <li>
            <Link href="/typeRacism" className="transition hover:text-neutral-400 duration-300 ease-in-out">Tipos de Racismo</Link>
          </li>
          <li>
            <Link href="/locations" className="transition hover:text-neutral-400 duration-300 ease-in-out">Localizações</Link>
          </li>
          <li>
            <a href="#login" className="text-neutral-900 transition hover:text-zinc-500 duration-300 ease-in-out bg-amber-200">Login</a>
          </li>
          </ul>
      </Header>
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Tipos de Racismo</h1>
      <p className="mt-4">Conteúdo da página aqui.</p>
    </div>
    </>
  );
}
