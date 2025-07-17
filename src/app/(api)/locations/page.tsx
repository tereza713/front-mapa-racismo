'use client'
import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";

export default function TypeRacismPage() {
  return (
    <>
    <Header>
    <ul className="flex flex-col items-center gap-2 text-lg text-neutral-100 sm:text-sm sm:p-4 sm:flex-row">
          <li>
            <Link href="/" className="transition hover:text-neutral-400 duration-300 ease-in-out">Início</Link>
          </li>
          <li>
            <Link href="/api/typeRacism" className="transition hover:text-neutral-400 duration-300 ease-in-out">Tipos de Racismo</Link>
          </li>
          <li>
            <a href="#denutions" className="transition hover:text-neutral-400 duration-300 ease-in-out">Denúncias</a>
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

    <Footer>
      <p>&copy; Mapa do Racismo. Todos os direitos reservados.</p>
      <ul className="flex gap-4">
        <li className="transition hover:text-neutral-400 duration-300 ease-in-out">Teste 1</li>
        <li className="transition hover:text-neutral-400 duration-300 ease-in-out">Teste 2</li>
        <li className="transition hover:text-neutral-400 duration-300 ease-in-out">Teste 3</li>
      </ul>
    </Footer>
    </>
  );
}
