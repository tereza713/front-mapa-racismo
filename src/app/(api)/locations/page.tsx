'use client'
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import SectionLinCol from "@/components/layout/section-Lin-Col";
import SectionCol from "@/components/layout/section-Col";
//import Image from 'next/image'
//import Link from "next/link";

import LocalizacaoForm from "./_components/localizacaoForm";
import LocalizacaoLista from "./_components/localizacaoLista";


export default function TypeRacismPage() {
  return (
    <>
    <Header></Header>
    <Main>

      <SectionCol>
          <h1>Cadastre locais onde ocorreram episódios de racismo. Sua colaboração fortalece a luta contra a discriminação.</h1>
      </SectionCol>
      
      <SectionLinCol>
        <LocalizacaoLista/>

        
        <LocalizacaoForm />
      </SectionLinCol>


    </Main>

    <Footer></Footer>
    </>
  );
}
