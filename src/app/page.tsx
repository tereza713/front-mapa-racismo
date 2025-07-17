'use client'
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import SectionLinCol from "@/components/layout/section-Lin-Col";
import SectionCol from "@/components/layout/section-Col";
import Image from 'next/image'




export default function Home() {
  return(
    <>
      <Header>
      </Header>
      <Main >

        <SectionLinCol>
          <div className="max-w-md text-left">
            <h1 className="text-7xl font-bold mb-4 text-amber-950">Mapa do Racismo no Brasil</h1>
            <p className="text-lime-700 font-bold">Mapeamento e documentação de casos de racismo no Brasil.</p>
          </div>

          <Image
            src="/image/mainPage.jpg"
            alt="Mulher negra, com um pente garfo no cabelo, de frente à bandeira do Brasil"
            width={250}
            height={250}
            className="rounded-full"
          />
        </SectionLinCol>

        <SectionCol>
          <h2 className="text-3xl font-bold" >A importância</h2>
          <p className="text-base ml-48 mr-48">O racismo ainda marca profundamente a sociedade brasileira.
            Entender seus diferentes tipos é essencial para reconhecer
            e combater essa violência. Esta página foi criada para registrar
            e mapear denúncias de racismo, dando visibilidade às vítimas e
            fortalecendo a luta por justiça e igualdade.</p>
        </SectionCol>
      </Main>


      <Footer>
      </Footer>

    </>


  );
}