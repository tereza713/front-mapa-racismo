"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TypeRacismList from "./components/typeList";
import { useContext } from "react";
import { TypeRacismContext } from "@/context/typeRacismContext";
import Link from "next/link";
import TypeRacismForm from "./components/typePostForm";


export default function TypeRacismPage() {
  return (
    <>
<Header>
    <ul className="flex flex-col items-center gap-2 text-lg text-neutral-100 sm:text-sm sm:p-4 sm:flex-row">
      <li>
        <Link href="/" className="transition hover:text-neutral-400 duration-300 ease-in-out">Início</Link>
      </li>
      <li>
        <Link href="/locations" className="transition hover:text-neutral-400 duration-300 ease-in-out">Localizações</Link>
      </li>
      <li>
        <Link href="/ocorrencias" className="transition hover:text-neutral-400 duration-300 ease-in-out">Ocorrências</Link>
      </li>
    </ul>
    </Header>
    
    <section>
      <TypeRacismList></TypeRacismList>
    </section>


    <section>
    <TypeRacismForm></TypeRacismForm>
    </section>

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
