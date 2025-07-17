'use client'
import Header from "@/components/layout/header";
import Link from "next/link";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";

export default function Home() {
  return(
    <>
      <Header> {/*cria os elementos para a header desta página*/}
      </Header>
    <main className="bg-amber-50 flex flex-col items-center gap-2 text-lg text-neutral-100 sm:text-sm">

      <section className="flex flex-row items-center justify-center gap-16 p-8 flex-wrap text-neutral-100 m-4">
        <div className="max-w-md text-left">
          <h1 className="text-7xl font-bold mb-4 text-amber-950">Mapa do Racismo no Brasil</h1>
          <p className="text-lime-700 font-bold">Mapeamento e documentação de casos de racismo no Brasil.</p>
        </div>

        <Image
          src="/image/mainPage.jpg"
          alt="Mulher negra, com um pente garfo no cabelo, de frente à bandeira do Brasil"
          width={500}
          height={500}
          className="rounded-full"
        />
      </section>

      <section className="bg-orange-950 flex flex-col items-center text-center justify-center gap-6 p-18 text-neutral-100 w-full">
        <h2 className="text-3xl font-bold" >A importância</h2>
        <p className="text-base ml-48 mr-48">O racismo ainda marca profundamente a sociedade brasileira.
          Entender seus diferentes tipos é essencial para reconhecer
          e combater essa violência. Esta página foi criada para registrar
          e mapear denúncias de racismo, dando visibilidade às vítimas e
          fortalecendo a luta por justiça e igualdade.</p>
        <Button>Navegue</Button>
      </section>
    </main>

    <Footer> {}
    </Footer>
    </>


  );
}